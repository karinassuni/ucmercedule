import itertools
import json
import ucmscraper

schedule = ucmscraper.Schedule.fetch_latest()

# sample
def is_selected(section):
    return section['departmentCode'] == 'CSE' or section['departmentCode'] == 'ENG' or section['departmentCode'] == 'MATH' or section['departmentCode'] == 'WRI'

sample_sections = [section for section in schedule.sections if is_selected(section)]

# Creating a class only so that we have a hashable (and sortable) "dict"
# Not a full Course, just a struct of Course values needed by mustache template
class CourseView:
    def __init__(self, section):
        self.title = section['title']
        self.department_code = section['departmentCode']
        self.course_number = section['courseNumber']

    @property
    def id(self):
        return self.department_code + '-' + self.course_number

    def __eq__(self, other):
        return self.__class__ == other.__class__ and self.id == other.id

    def __hash__(self):
        return hash(self.id)

    def __lt__(self, other):
        if self.department_code < other.department_code:
            return True
        elif self.department_code == other.department_code:
            return self.course_number < other.course_number
        else:
            return False

# Selecting only relevant keys to make a course; putting in a Set prevents duplicates!
course_views = {
    CourseView(section)
    for section in sample_sections
}

selected_departments = {
    'selectedDepartments': [
        {
            'code': department_code,
            'name': schedule.departments[department_code],
            'courses': [
                {'title': course_view.title, 'id': course_view.id}
                for course_view in cv_group
            ]
        }
        for department_code, cv_group
        in itertools.groupby(sorted(course_views), key=lambda c: c.department_code)
    ]
}

with open('sample_selected_departments.json', 'w') as f:
    json.dump(selected_departments, f, sort_keys=True, indent=4)