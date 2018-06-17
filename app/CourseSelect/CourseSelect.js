function DepartmentAccordion(departmentItem, group) {
  this.group = group;
  this.departmentItem = departmentItem;
  this.heading = departmentItem.firstElementChild;
  this.toggleButton = this.heading.firstElementChild;
  this.courseList = this.heading.nextElementSibling; // .department-courses
  this.visible = false;

  /* 
   * Event handlers have their `this` set to the targeted element by default;
   * .bind returns a new function with a new `this`
   */
  this.heading.onclick = this.toggleHandler.bind(this);
  this.heading.onkeydown = this.onKeydown.bind(this);
}

DepartmentAccordion.prototype.focus = function() {
  this.toggleButton.focus();
};

DepartmentAccordion.prototype.toggleHandler = function() {
  if (!this.visible) {
    this.courseList.removeAttribute("hidden");
    this.toggleButton.setAttribute("aria-expanded", "true");
  } else {
    this.courseList.setAttribute("hidden", "");
    this.toggleButton.setAttribute("aria-expanded", "false");
  }

  this.heading.classList.toggle("department-heading--selected");

  this.visible = !this.visible;
};

DepartmentAccordion.prototype.onKeydown = function(event) {
  switch (event.keyCode) {
    case 13: // Enter
    case 32: // Space
      this.toggleHandler.call(this);
      event.preventDefault();
      break;

    case 40: // Down
      this.group.focusNext(this);
      event.preventDefault();
      break;
    case 38: // Up
      this.group.focusPrevious(this);
      event.preventDefault();
      break;
  }
};

function DepartmentGroup() {
  this.accordions = [];
  var departments = document.getElementsByClassName("department");
  for (var i = 0; i < departments.length; ++i) {
    this.accordions.push(new DepartmentAccordion(departments[i], this));
  }

  this.findCurrent = function(current) {
    for (var i = 0; i < this.accordions.length; ++i) {
      if (this.accordions[i] == current) {
        return i;
      }
    }
  };

  this.focusNext = function(current) {
    var currentIndex = this.findCurrent(current);
    this.accordions[currentIndex + 1].focus();
  };

  this.focusPrevious = function(current) {
    var currentIndex = this.findCurrent(current);
    this.accordions[currentIndex - 1].focus();
  };
}

new DepartmentGroup();
