function DepartmentAccordion(departmentItem, group) {
  this.group = group;
  this.departmentItem = departmentItem;
  this.heading = departmentItem.firstElementChild;
  this.toggleButton = this.heading.firstElementChild;
  this.courseList = this.heading.nextElementSibling; // .department-courses
  this.checkboxes = this.courseList.getElementsByTagName("input");
  this.currentCheckbox = -1;
  this.visible = false;

  /* 
   * Event handlers have their `this` set to the targeted element by default;
   * .bind returns a new function with a new `this`
   */
  this.heading.onclick = this.toggleHandler.bind(this);
  this.departmentItem.onkeydown = this.onKeydown.bind(this);
}

DepartmentAccordion.prototype.focusNext = function() {
  var nextCheckbox = this.currentCheckbox + 1;
  if (nextCheckbox < this.checkboxes.length) {
    this.checkboxes[nextCheckbox].focus();
    this.currentCheckbox = nextCheckbox;
  } else if (nextCheckbox == this.checkboxes.length) {
    this.group.focusNext(this);
  }
};

DepartmentAccordion.prototype.focusPrevious = function() {
  var prevCheckbox = this.currentCheckbox - 1;
  if (prevCheckbox >= 0) {
    this.checkboxes[prevCheckbox].focus();
    this.currentCheckbox = prevCheckbox;
  } else if (prevCheckbox == -1) {
    this.toggleButton.focus();
    this.currentCheckbox = prevCheckbox;
  } else if (prevCheckbox == -2) {
    this.group.focusPrevious(this);
  }
};

DepartmentAccordion.prototype.focus = function() {
  // Accounts for Up/Down AND Right/Left navigation!
  var isResumingProgress = this.currentCheckbox > -1;
  if (this.visible && isResumingProgress) {
    this.checkboxes[this.currentCheckbox].focus();
  } else {
    this.toggleButton.focus();
  }
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
      if (this.visible) {
        this.focusNext();
      } else {
        this.group.focusNext(this);
      }
      event.preventDefault();
      break;
    case 38: // Up
      if (this.visible) {
        this.focusPrevious();
      } else {
        this.group.focusPrevious(this);
      }
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

  this.current = 0;
}

DepartmentGroup.prototype.focusNext = function() {
  var nextAccordion = this.current + 1;
  if (nextAccordion < this.accordions.length) {
    this.accordions[nextAccordion].focus();
    this.current = nextAccordion;
  } else if (nextAccordion == this.accordions.length) {
    this.accordions[0].focus();
    this.current = 0; // wrap
  }
};

DepartmentGroup.prototype.focusPrevious = function() {
  var prevAccordion = this.current - 1;
  if (prevAccordion >= 0) {
    this.accordions[prevAccordion].focus();
    this.current = prevAccordion;
  } else if (prevAccordion == -1) {
    this.accordions[this.accordions.length - 1].focus();
    this.current = this.accordions.length - 1; // wrap
  }
};

new DepartmentGroup();
