import { Component, h } from "preact";
import "./SectionTable.css";

export default class SectionTable extends Component {
  render(props) {
    return (
      <div>
        {props.courses.map(course => {
          return (
            <table key={course.departmentCode + course.courseNumber}>
              <caption>
                <span>{course.title}</span>
                <span>({course.units})</span>
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
