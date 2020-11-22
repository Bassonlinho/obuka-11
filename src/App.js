import React from "react";
import "./App.css";
import AddUsers from "./users/AddUsers";
import ListOfUsers from "./users/ListOfUsers";
import ViewUser from "./users/ViewUser";
import { Route, Redirect } from "react-router-dom";
import axios from "./utils/AxiosWrapper";
import { ADD_USER, VIEW_USER, EDIT_USER, LIST_OF_USERS } from "./routes";
import history from "./utils/history";
//bila je function,menjali smo u klasu zbog lifecycles
export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      users: [],
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    //alternativa za fetch i kako kontrolisati greske sa servera preko
    //Axioswrappera i interceptora
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      this.setState({
        users: response.data,
        loading: false,
      });
    });
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //data je rezultat promisa nad Response-om od fetcha i pozivom json() nad njim
    //     //https://developer.mozilla.org/en-US/docs/Web/API/Response
    //     this.setState({
    //       loading: false,
    //       users: data,
    //     });
    //   })
    //   .catch((error) => {
    //     throw error;
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
    // var nextState = {}
    // const companies = await getCompanies();
    // nextState = { companies: companies.data;}
    // dobar nacin da se zaobidje vise setState u componentDidMount u koriscenju asinhronih poziva ka serveru
    // ili unutar neke funkcije u kojoj je potrebno pozvati setState vise puta
  }

  // koristicemo kasnije za nesto drugo
  componentDidUpdate(prevProps, prevState) {
    // const { loading } = this.state;
    // const { hasNameChange } = this.props;
    // let { users } = this.state;
    // if (prevState.loading === true) {
    //   users.push({ id: 10, name: "Petar", lastName: "petrovic" });
    //   this.setState({
    //     users: users,
    //   });
    // }
  }

  // brani pozivanja novog rendera
  // shouldComponentUpdate(prevProps, prevState) {
  //   const { loading } = this.state;
  //   console.log("prevstate", prevState);
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
    this.setState(
      {
        user,
      },
      () => {
        // history.push(VIEW_USER);
      }
    );
  };

  onDeleteUser = (user) => {
    let { users } = this.state;
    this.setState({
      users: users.filter((item) => item.id !== user.id),
    });
  };

  render() {
    const { users, loading, user } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <Route
          path={LIST_OF_USERS}
          exact
          component={() => (
            <ListOfUsers
              users={users}
              onClickUser={this.onClickUser}
              onDeleteUser={this.onDeleteUser}
            />
          )}
        />
        <Route
          path={VIEW_USER}
          exact
          component={() => <ViewUser user={user} />}
        />
        <Route
          path={ADD_USER}
          exact
          component={() => (
            <AddUsers user={user} onAddUser={this.onAddUserFunction} />
          )}
        />
        <Route
          path={EDIT_USER}
          exact
          component={() => (
            <AddUsers user={user} onAddUser={this.onAddUserFunction} />
          )}
        />
      </>
    );
  }
}
