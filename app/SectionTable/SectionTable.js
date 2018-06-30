import { Component, h } from "preact";
import "./SectionTable.css";

export default class SectionTable extends Component {
  render(props) {
    return (
      <div>
        {props.courses.map(course => {
          const cid = course.departmentCode + " " + course.courseNumber;
          return (
            <table class="course-table" key={cid}>
              <caption>
                <div class="course-caption">
                  <span class="course-caption__units">
                    {course.units} {course.units > 1 ? "units" : "unit"}
                  </span>
                  <span class="course-caption__cid">{cid}</span>
                  <span class="course-caption__title">{course.title}</span>
                </div>
              </caption>
              <thead>
                <th scope="col">Section</th>
                <th scope="col">Days</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">Instructor</th>
                <th scope="col">Max</th>
                <th scope="col">Free</th>
              </thead>
              <tbody>
                {course.sections.map(section => {
                  return (
                    <tr key={section.CRN}>
                      <td>{section.section}</td>
                      <td>{section.days}</td>
                      <td>{section.startTime}</td>
                      <td>{section.endTime}</td>
                      <td>{section.instructor}</td>
                      <td>{section.maxSeats}</td>
                      <td>{section.freeSeats}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }
}