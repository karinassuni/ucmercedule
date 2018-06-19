function DepartmentAccordion(departmentItem, group) {
  this.group = group;
  this.departmentItem = departmentItem;
  this.heading = departmentItem.firstElementChild;
  this.toggleButton = this.heading.firstElementChild;
  this.courseList = this.heading.nextElementSibling; // .department-courses

  this.checkboxes = [];
  var checkboxes = this.courseList.getElementsByTagName("input");
  for (var i = 0; i < checkboxes.length; ++i) {
    this.checkboxes.push(new Checkbox(checkboxes[i], this));
  }
  this.currentCheckbox = -1;

  this.visible = false;

  /* 
   * Event handlers have their `this` set to the targeted element by default;
   * .bind returns a new function with a new `this`
   */
  this.heading.onclick = this.toggleHandler.bind(this);
  this.departmentItem.onkeydown = this.onKeydown.bind(this);
}

function Checkbox(checkboxElement, accordion) {
  this.element = checkboxElement;
  this.accordion = accordion;
  this.course = checkboxElement.parentElement;
  this.checked = false;

  this.element.onfocus = this.onFocus.bind(this);
  this.element.onblur = this.onBlur.bind(this);
  this.element.onchange = this.onChange.bind(this);
}

Checkbox.prototype.focus = function() {
  this.element.focus();
};

Checkbox.prototype.onFocus = function() {
  if (this.checked) {
    this.course.classList.add("course-selected-focus");
  }
  this.course.classList.add("course-focus");
  this.accordion.setCurrentCheckbox(this);
};

Checkbox.prototype.onBlur = function() {
  if (this.checked) {
    this.course.classList.remove("course-selected-focus");
  }
  this.course.classList.remove("course-focus");
};

Checkbox.prototype.onChange = function() {
  this.checked = !this.checked;
  if (!this.checked) {
    this.course.classList.remove("course-selected-focus");
  }
  this.course.classList.toggle("course-selected");
};

DepartmentAccordion.prototype.setCurrentCheckbox = function(checkbox) {
  this.currentCheckbox = this.checkboxes.indexOf(checkbox);
};

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
      if (event.target.hasAttribute("aria-controls")) {
        this.toggleHandler.call(this);
        event.preventDefault();
      }
      break;
    case 32: // Space
      if (event.target.tagName !== "INPUT") {
        this.toggleHandler.call(this);
        event.preventDefault();
      }
      // else checkboxes are selected with Space, as noraml
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

    case 39: // Right
      this.group.focusNext(this);
      break;
    case 37: // Left
      if (event.target.hasAttribute("aria-controls")) {
        this.group.focusPrevious(this);
      } else if (event.target.tagName === "INPUT") {
        this.toggleButton.focus();
      }
      break;
  }
};

function DepartmentGroup() {
  this.accordions = [];
  var departments = document.getElementsByClassName("department");
  for (var i = 0; i < departments.length; ++i) {
    var accordion = new DepartmentAccordion(departments[i], this);

    accordion.toggleButton.onfocus = this.onFocusAccordionHeading.bind(this);

    this.accordions.push(accordion);
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

DepartmentGroup.prototype.onFocusAccordionHeading = function(event) {
  for (var i = 0; i < this.accordions.length; ++i) {
    if (this.accordions[i].toggleButton == event.target) {
      this.current = i;
      this.accordions[i].currentCheckbox = -1; // reset checkbox focus index
      return;
    }
  }
};

new DepartmentGroup();
