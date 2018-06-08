import pystache
import ucmscraper

validterms = ucmscraper.fetchValidterms()
schedule = ucmscraper.Schedule(validterms[-1]) # latest term

departments_view = {
    'departments': [
        {'code': code, 'name': name}
        for code, name in schedule.departments.items()
    ]
}
with open('department_fieldset.mustache', 'r') as f:
    department_fieldset_template = f.read()
with open('department_fieldset.html', 'w') as f:
    templated = pystache.render(department_fieldset_template, departments_view)
    f.write(templated)