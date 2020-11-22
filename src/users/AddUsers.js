import React from "react";
import { TextField, Button } from "@material-ui/core";
import history from "../utils/history";
import { LIST_OF_USERS } from "../routes";

class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
      },
    };
  }

  //edit slucaj, kada hocemo da editujemo usera, na mount komponente ce se ucitati user u state-u
  componentDidMount() {
    console.log("Ja sam mauntovan AddUsers");
    const { user } = this.props;
    this.setState({
      user: user,
    });
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
    history.replace(LIST_OF_USERS);
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
          value={user.email}
          onChange={(e) => this.handleChange("email", e.target.value)}
        />
        <Button onClick={() => this.handleAddUser()}>
          {user.id ? "Edit" : "Add"}
        </Button>
      </div>
    );
  }
}

export default AddUsers;
