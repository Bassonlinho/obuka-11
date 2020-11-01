import React from "react";
import { TextField } from "@material-ui/core";
export default class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <TextField disabled value={user.name} />
        <TextField disabled value={user.lastName} />
      </div>
    );
  }
}
