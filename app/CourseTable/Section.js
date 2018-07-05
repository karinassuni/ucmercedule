import { h, Component } from "preact";

class Section extends Component {
  render(props) {
    const section = props.section;
    return (
      <tr>
        <td>{section.section}</td>
        <td>{section.days}</td>
        <td>{section.startTime}</td>
        <td>{section.endTime}</td>
        <td>{section.instructor}</td>
        <td>{section.maxSeats}</td>
        <td>{section.freeSeats}</td>
      </tr>
    );
  }
}
export default Section;
