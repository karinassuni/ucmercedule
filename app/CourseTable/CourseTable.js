import "./CourseTable.css";
import Section from "./Section";
import { h } from "preact";

const CourseTable = props => {
  const course = props.course;
  const cid = course.departmentCode + " " + course.courseNumber;
  return (
    <table class="course-table" key={cid}>
      <caption>
        <div class="course-caption">
          <div class="course-caption__info">
            <div class="course-caption__info__cid">{cid}</div>
            <div class="course-caption__info__title">{course.title}</div>
          </div>
          <div class="course-caption__units">
            {course.units} {course.units > 1 ? "units" : "unit"}
          </div>
          <div class="clearfix" />
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
          return [
            <Section section={section} key={section.CRN} />,
            section.supplementary.map(section => {
              return <Section section={section} key={section.CRN} />;
            })
          ];
        })}
      </tbody>
    </table>
  );
};

export default CourseTable;
