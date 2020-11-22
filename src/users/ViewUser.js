import React from "react";
import User from "./User";
import history from "../utils/history";
import { EDIT_USER } from "../routes";
export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Ja sam mauntovan ViewUser");
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <User {...user} />
        <button onClick={() => history.push(EDIT_USER)}>Edit user</button>
      </div>
    );
  }
}
