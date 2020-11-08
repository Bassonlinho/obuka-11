import React from "react";
import User from "./User";
export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <User {...user} />
      </div>
    );
  }
}
