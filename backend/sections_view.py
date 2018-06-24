import itertools
from more_itertools import peekable
import json
import ucmscraper

def course_id(section):
    # different activity types (lecture, discussion, labs) have the same ID
    return section['departmentCode'] + ' ' + section['courseNumber']

def is_sample(section):
    return (
        course_id(section) == 'CSE 005' or
        course_id(section) == 'BIO 001' or
        course_id(section) == 'SOC 001' or
        course_id(section) == 'WRI 010'
    )

def select_fields(dictionary, *args):
    selection = {}
    for arg in args:
        if isinstance(arg, str):
            selection[arg] = dictionary[arg]
        elif isinstance(arg, tuple) and len(arg) == 2:
            # use key/value pair provided in 2-tuple
            selection[arg[0]] = arg[1]
    return selection

def main():
    schedule = ucmscraper.Schedule.fetch_latest()
    sample_sections = filter(is_sample, schedule.sections)

    sections_by_course = {
        'courses': [
            # course_sections is an itertools group which is a generator (of section elements)
            select_fields(course_sections.peek(),
                'departmentCode',
                'courseNumber',
                'title',
                'notes',
                'units',
                ('sections', [
                    select_fields(section,
                        'CRN',
                        'section',
                        'days',
                        'startTime',
                        'endTime',
                        'instructor',
                        'maxSeats',
                        'takenSeats',
                        'freeSeats',
                    )
                    for section in course_sections
                ])
            )
            for cid, course_sections
            in peekable(itertools.groupby(sample_sections, key=course_id))
        ]
    }

    with open('sample_schedule_courses.json', 'w') as f:
        json.dump(sections_by_course, f)

if __name__ == '__main__':
    main()