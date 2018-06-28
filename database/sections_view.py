import itertools
import json
import ucmscraper

def course_id(section):
    # NOTE that labs that are their own courses (with units, lecture, and lab
    # section) are totally a thing;
    # e.g. BIO-001L with -01, -02, etc. lab sections, separate from BIO-001

    # IF CERTAIN SECTION TYPES ARE *REQUIRED* TO BE TAKEN TOGETHER, ALL THOSE
    # SECTIONS/TYPES WILL HAVE THE SAME COURSE ID
    # e.g. CHEM-002 requires lab and discussion; lect, lab, and discussion
    # sections are all CHEM-002 but with -02D, -02DL, -03D, -03DL sections
    #                                    ^^^^^^^^^^^ lab & disc. must match here
    # that are unitless, and lecture -01, -20 lecture sections that have units
    return section['departmentCode'] + ' ' + section['courseNumber']

def is_sample(section):
    return (
        course_id(section) == 'CHEM 002' or
        course_id(section) == 'BIO 001' or
        course_id(section) == 'BIO 001L' or
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

    courses = []
    for _, course_sections in itertools.groupby(sample_sections, key=course_id):
        sections = list(course_sections)
        course = select_fields(sections[0],
            'departmentCode',
            'courseNumber',
            'title',
            'notes',
            'units',
        )
        course['sections'] = []

        def filter_fields(section):
            return select_fields(section,
                'CRN',
                'section',
                'activity',
                'days',
                'startTime',
                'endTime',
                'instructor',
                'maxSeats',
                'takenSeats',
                'freeSeats',
            )

        def create_main(section):
            main = filter_fields(section)
            main['supplementary'] = []
            return main

        main = create_main(sections[0])
        for section in sections[1:]:
            if section['units'] != 0:
                course['sections'].append(main)
                main = create_main(section)
                continue
            main['supplementary'].append(filter_fields(section))
        course['sections'].append(main)
        courses.append(course)

    with open('sample_schedule_courses.json', 'w') as f:
        json.dump(courses, f)

if __name__ == '__main__':
    main()