import React from "react";
import User from "./User";
import history from "../utils/history";
export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <button onClick={() => history.goBack()}>Go back</button>
        <User {...user} />
      </div>
    );
  }
}
