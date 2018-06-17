function DepartmentAccordion(heading) {
  this.heading = heading;
  this.courseList = heading.nextElementSibling; // .department-courses
  this.visible = false;

  /* 
   * Event handlers have their `this` set to the targeted element by default;
   * .bind returns a new function with a new `this`
   */
  this.heading.onclick = this.toggleHandler.bind(this);
}

DepartmentAccordion.prototype.toggleHandler = function() {
  if (!this.visible) {
    this.courseList.removeAttribute("hidden");
    this.heading.firstElementChild.setAttribute("aria-expanded", "true");
  } else {
    this.courseList.setAttribute("hidden", "");
    this.heading.firstElementChild.setAttribute("aria-expanded", "false");
  }

  this.heading.classList.toggle("department-heading--selected");

  this.visible = !this.visible;
};

var departmentHeadings = document.getElementsByClassName("department-heading");

for (var i = 0; i < departmentHeadings.length; ++i) {
  new DepartmentAccordion(departmentHeadings[i]);
}
