import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddUsers from "./users/AddUsers";
import ListOfUsers from "./users/ListOfUsers";
import ViewUser from "./users/ViewUser";
import { Route, Redirect } from "react-router-dom";
import axios from "./utils/AxiosWrapper";
import { ADD_USER, VIEW_USER, EDIT_USER, LIST_OF_USERS } from "./routes";
import history from "./utils/history";
import { getUsers, addUser } from "./reducers/usersReducer/actions";
//bila je function,menjali smo u klasu zbog lifecycles
export class App extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
    //alternativa za fetch i kako kontrolisati greske sa servera preko
    //Axioswrappera i interceptora
    //prebaceno u usersReducer
    // axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    //   this.setState({
    //     users: response.data,
    //     loading: false,
    //   });
    // });
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
    const { addUser } = this.props;
    addUser(user);
    // let { users } = this.state;
    // // spread operator, za kopiranje niza i dodavanje novog elementa, zamena za array.push
    // //array.shift, array.unshift
    // // mozes se koristiti i za nizove i za objekte, u slucaju objekata mozes koristiti i Object.assign
    // // newUser = {...user, id: 10}
    // let userData;
    // //da li user objekat ima ID property, moze se pisati i if(Object(user).hasOwnProperty(id)),
    // // if(user.id !== undefined)
    // if (!user.id) {
    //   // userData = Object.assign({id: Math.random() + 15}, user)
    //   userData = {
    //     id: Math.random() + 15,
    //     ...user,
    //   };
    //   users = [...users, userData];
    // } else {
    //   userData = user;
    //   users = users.map((item) => {
    //     if (item.id === userData.id) {
    //       item = userData;
    //       return item;
    //     }
    //     return item;
    //   });
    //   // moze i na ovaj nacin, ili da se izvlaci index iz array.map-a
    //   // const indexOfUser = users.findIndex(userData);
    //   // users[indexOfUser] = userData;
    // }
    // // users.push(user)
    // // users.unshift(user)
    // // const newUsers = [user, ...users];
    // this.setState({
    //   users,
    // });
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
    // const { users, user } = this.state;
    const { loading, users, user } = this.props;
    console.log("this.props", this.props);
    if (loading) {
      return <h1>Loading...</h1>;
    }

    // child komponente koje su unutar komponente koja je nakacena na redux ne znaju za propertije
    // koje parent komponenta dobija od reduxa (funkcije, props).
    // ali moze da im pristupi ukoliko ih dobije od parenta (mada bi to trebalo da se koristi sa oprezom)
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

// mapStateToProps je veza izmedju komponente i reducera i podataka koji
// su skladisteni u reduceru
// kao parametar ima state kojem mozemo da pristupimo i cuvamo celo stanje applikacije u njemu

//kada se promeni bilo koja od promenljivih koje "slusamo" iz reduxa, this.props ce registrovati
// promenu i desice se rerender unutar te komponente
const mapStateToProps = (stanje) => {
  console.log("stanje", stanje);
  return {
    users: stanje.users.users,
    user: stanje.users.user,
    loading: stanje.users.loading,
  };
};

// da bi funkcija mogla da "komunicira" sa reduxom mora da se wrapuje u actionCreator
// i poveze preko connecta kao drugi parametar

const mapDispatchToProps = (dispatch) =>
  // ovo je alternativa za ovo
  // return {
  //   getUsers: () => dispatch(getUsers()),
  // }
  //umesto da svugde koristimo dispatch(naziv_funkcije)
  //bindActionCreators to radi za nas i olaksava nam
  bindActionCreators(
    {
      getUsers,
      addUser,
    },
    dispatch
  );
//connect ce se pozvati pre mauntovanja komponente i povezati komponentu sa funkcijama koje su
//pozvane unutar nje, da bi bile iskoristljive vec u componentDidMount
//connect je zapravo HOC (Higher order component), jer on koristi class App koji je exportovan
//i od nje vraca novu komponentu koja je "viseg reda" jer moze da koristi usluge Reduxa.
export default connect(mapStateToProps, mapDispatchToProps)(App);
