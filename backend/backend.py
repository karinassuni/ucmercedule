import json
import pystache
import ucmscraper

def createJSConstants(schedule):
    def writeJSConstantFile(obj, constantName):
        contents = 'var {} = {}'.format(constantName, json.dumps(obj))
        with open('{}.js'.format(constantName), 'w') as f:
            f.write(contents)
    
    departmentMenu = {
        code: {
            "name": name,
            # We iterate through sections but we extract course-level info
            "courses": {
                # Because we're using a map, and because all of a course's
                # sections have the same courseNumber, there are no duplicates
                section['courseNumber']: section['title']
                for section in schedule.sections
            }
        }
        for code, name in schedule.departments.items()
    }
    writeJSConstantFile(departmentMenu, 'departmentMenu')

    def getID(course):
        return '{}-{}-{}'.format(course["departmentCode"], course["courseNumber"], course["section"])

    sectionIndex = {
        getID(section): section
        for section in schedule.sections
    }
    writeJSConstantFile(sectionIndex, 'sectionIndex')

validterms = ucmscraper.fetchValidterms()
schedule = ucmscraper.Schedule(validterms[-1]) # latest term
createJSConstants(schedule)