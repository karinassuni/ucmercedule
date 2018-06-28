import "./index.css";
import "./CourseSelect/CourseSelect";

import "./hotLoaderSetup";
import { render, h } from "preact";
import App from "./App";

render(<App />, document.getElementById("app"));
