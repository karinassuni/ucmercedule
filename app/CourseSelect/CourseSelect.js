function Accordion(element) {
  this.element = element;
  this.visible = false;

  /* 
   * Event handlers have their `this` set to the targeted element by default;
   * .bind returns a new function with a new `this`
   */
  this.element.onclick = this.toggleHandler.bind(this);
}

Accordion.prototype.toggleHandler = function() {
  var courseList = this.element.nextElementSibling; // .department-courses
  if (!this.visible) {
    courseList.removeAttribute("hidden");
  } else {
    courseList.setAttribute("hidden", "");
  }

  this.element.classList.toggle("department-heading--selected");

  this.visible = !this.visible;
};

var departmentHeadings = document.getElementsByClassName("department-heading");

for (var i = 0; i < departmentHeadings.length; ++i) {
  new Accordion(departmentHeadings[i]);
}
