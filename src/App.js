import React from "react";
import "./App.css";
import users from "./users/users.json";
import AddUsers from "./users/AddUsers";
import ListOfUsers from "./users/ListOfUsers";
import ViewUser from "./users/ViewUser";
import { Route, Redirect } from "react-router-dom";
import { ADD_USER, VIEW_USER, EDIT_USER, LIST_OF_USERS } from "./routes";
import history from "./utils/history";
//bila je function,menjali smo u klasu zbog lifecycles
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        users: users,
      });
    }, 2000);
    // var nextState = {}
    // const companies = await getCompanies();
    // nextState = { companies: companies.data;}
    // dobar nacin da se zaobidje vise setState u componentDidMount u koriscenju asinhronih poziva ka serveru
    // ili unutar neke funkcije u kojoj je potrebno pozvati setState vise puta
  }

  // koristicemo kasnije za nesto drugo
  // componentDidUpdate(prevProps, prevState) {
  //   const { loading } = this.state;
  //   const { hasNameChange } = this.props;
  //   let { users } = this.state;
  //   if (prevState.loading === true && prevState.loading !== loading) {
  //     users.push({ id: 10, name: "Petar", lastName: "petrovic" });
  //     this.setState({
  //       users: users,
  //     });
  //     this.props.get/MoreUsers()
  //     this.recalculatePages();
  //   }
  // }

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
      // posle setState-a moze da prosledi funkcija sta da uradi nakon njegovog izvrsenja
      () => {
        history.push(VIEW_USER);
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
    let content;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <Route
          path={LIST_OF_USERS}
          exact
          component={() => (
            <ListOfUsers users={users} onClickUser={this.onClickUser} />
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
        {/* ako sam na listi usera, prikazi mi dugme za dodavanje novog usera
         */}
        <Redirect from="/" to={LIST_OF_USERS} />
      </>
    );
  }
}
