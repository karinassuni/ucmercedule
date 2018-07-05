import { h } from "preact";
import { hot } from "react-hot-loader";
import CourseTable from "./CourseTable/CourseTable";
import sampleCourses from "./sample_schedule_courses.json";

const CourseTables = () => (
  <div>
    {sampleCourses.map(course => {
      const cid = course.departmentCode + " " + course.courseNumber;
      return <CourseTable course={course} key={cid} />;
    })}
  </div>
);

export default hot(module)(CourseTables);
