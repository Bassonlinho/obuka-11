import React from "react";
import "./App.css";
import users from "./users/users.json";
import AddUsers from "./users/AddUsers";
import ViewUser from "./users/ViewUser";
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
    users = [user, ...users];
    // users.push(user)
    // users.unshift(user)
    // const newUsers = [user, ...users];
    this.setState({
      users,
    });
  };

  onViewUser = (user) => {
    this.setState({
      user,
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
          {(users.length &&
            users.map((item) => {
              const { name, lastName } = item;
              return (
                <div className="user">
                  <div className="username">{name + " " + lastName}</div>
                  <button onClick={() => this.onViewUser(item)}>View</button>
                </div>
              );
            })) ||
            null}
          {/* kako se prosledjuje children komponenti */}
          {user === null ? (
            <AddUsers onAddUser={this.onAddUserFunction}>hehehehehehe</AddUsers>
          ) : (
            <ViewUser user={user} />
          )}
          {/* clear stanje usera */}
          <button onClick={() => this.setState({ user: null })}>
            Clear user Value
          </button>
        </div>
      );
    }
    return content;
  }
}
