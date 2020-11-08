import React from "react";
import "./App.css";
import users from "./users/users.json";
import AddUsers from "./users/AddUsers";
import ListOfUsers from "./users/ListOfUsers";
//bila je function,menjali smo u klasu zbog lifecycles
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      user: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        users: users,
        loading: false,
      });
    }, 2000);
  }

  // koristicemo kasnije za nesto drugo
  // componentDidUpdate(prevProps, prevState) {
  //   const { loading } = this.state;
  //   let { users } = this.state;
  //   if (prevState.loading === true && prevState.loading !== loading) {
  //     users.push({ id: 10, name: "Petar", lastName: "petrovic" });
  //     this.setState({
  //       users: users,
  //     });
  //   }
  // }

  // // brani pozivanja novog rendera
  // shouldComponentUpdate(prevState, prevProps) {
  //   const { loading } = this.state;
  //   if (prevState.loading !== loading) {
  //     return true; //dont call render
  //   }
  //   return false;
  // }

  onAddUserFunction = (user) => {
    let { users } = this.state;
    // spread operator, za kopiranje niza i dodavanje novog elementa, zamena za array.push
    //array.shift, array.unshift
    // mozes se koristiti i za nizove i za objekte, u slucaju objekata mozes koristiti i Object.assign
    // newUser = {...user, id: 10}
    let userData;
    //da li user objekat ima ID property, moze se pisati i if(Object(user).hasOwnProperty(id)),
    // if(user.id !== undefined)
    if (!user.id) {
      // userData = Object.assign({id: Math.random() + 15}, user)
      userData = {
        id: Math.random() + 15,
        ...user,
      };
      users = [...users, userData];
    } else {
      userData = user;
      users = users.map((item) => {
        if (item.id === userData.id) {
          item = userData;
          return item;
        }
        return item;
      });
      // moze i na ovaj nacin, ili da se izvlaci index iz array.map-a
      // const indexOfUser = users.findIndex(userData);
      // users[indexOfUser] = userData;
    }
    // users.push(user)
    // users.unshift(user)
    // const newUsers = [user, ...users];
    this.setState({
      users,
    });
  };

  onClickUser = (user) => {
    this.setState({
      user,
    });
  };

  onDeleteUser = (user) => {
    let { users } = this.state;
    this.setState({
      users: users.filter((item) => item.id !== user.id),
    });
  };

  render() {
    const { users, loading, user } = this.state;
    let content;
    if (loading) {
      content = <h1>Loading...</h1>;
    } else {
      content = (
        <div className="App">
          <ListOfUsers
            users={users}
            onClickUser={this.onClickUser}
            onDeleteUser={this.onDeleteUser}
          />
          <AddUsers user={user} onAddUser={this.onAddUserFunction} />
        </div>
      );
    }
    return content;
  }
}
