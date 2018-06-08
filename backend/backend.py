import json
import pystache
import ucmscraper

DEPARTMENTS_VIEW_FILENAME = 'departments_view.json'
try:
    with open(DEPARTMENTS_VIEW_FILENAME, 'r') as f:
        departments_view = json.load(f)
except FileNotFoundError:
    schedule = ucmscraper.Schedule.fetch_latest()
    departments_view = {
        'departments': [
            {'code': code, 'name': name}
            for code, name in schedule.departments.items()
        ]
    }
    with open(DEPARTMENTS_VIEW_FILENAME, 'w') as f:
        json.dump(departments_view, f)

with open('department_fieldset.mustache', 'r') as f:
    department_fieldset_template = f.read()
with open('department_fieldset.html', 'w') as f:
    templated = pystache.render(department_fieldset_template, departments_view)
    f.write(templated)