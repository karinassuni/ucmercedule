import { h } from "preact";
import { hot } from "react-hot-loader";
import SectionTable from "./SectionTable/SectionTable";
import sampleCourses from "./sample_schedule_courses.json";

const App = () => <SectionTable courses={sampleCourses} />;

export default hot(module)(App);
