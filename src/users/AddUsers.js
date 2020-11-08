import React from "react";
import { TextField, Button } from "@material-ui/core";
class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        lastName: "",
      },
    };
  }

  // primer kako komponenta hendluje promenu propertija ukoliko se u parentu desi promena
  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      this.setState({
        user: user,
      });
    }
  }

  handleChange = (name, value) => {
    let { user } = this.state;
    user[name] = value;
    this.setState({
      user: user,
    });
  };

  handleAddUser = () => {
    const { user } = this.state;
    const { onAddUser } = this.props;
    //kada dodajemo novog usera on nema ID polje i proveravamo da li ono postoji
    // if (user.id) {
    //   onUpdateUser(user)
    // } else {
    onAddUser(user);
    // }
    this.setState({
      user: {
        name: "",
        lastName: "",
      },
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        <TextField
          placeholder="Type your first name"
          label="First name"
          autoFocus
          value={user.name}
          onChange={(e) => this.handleChange("name", e.target.value)}
          //e.target.value je izvlacenje vrednosti text fielda
          //target je ono sto izvlacis, u ovom slucaju text field
        />
        <TextField
          label="Last name"
          value={user.lastName}
          onChange={(e) => this.handleChange("lastName", e.target.value)}
        />
        <Button onClick={() => this.handleAddUser()}>
          {user.id ? "Edit" : "Add"}
        </Button>
      </div>
    );
  }
}

export default AddUsers;
