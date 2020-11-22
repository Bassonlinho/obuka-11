import React from "react";
import PropType from "prop-types";
import User from "./User";
import history from "../utils/history";
import { ADD_USER } from "../routes";

class ListOfUsers extends React.Component {
  componentDidMount() {
    console.log("Ja sam mauntovan ListOfUsers", this.props);
  }
  render() {
    const { users, onClickUser, onDeleteUser } = this.props;
    return (
      <>
        {(users.length &&
          users.map((item, index) => {
            //each child in a list should  have a unique key property
            return (
              <div className="user" key={item.id.toString()}>
                {/* to znaci da smo spredovali sve key: value propertije koje objekat item ima,
                umesto toga smo mogli lastName={item.lastName}, name={item.name}  */}
                <User {...item} />
                <button onClick={() => onClickUser(item)}>View</button>
                <button onClick={() => onDeleteUser(item)}>X</button>
              </div>
            );
          })) || <h2>Users list is empty.</h2>}
        <button onClick={() => history.push(ADD_USER)}>Create new user</button>
      </>
    );
  }
}

ListOfUsers.defaultProps = {
  users: [],
};

ListOfUsers.propTypes = {
  users: PropType.array,
  onClickUser: PropType.func.isRequired,
};

//export default znaci da se komponenta importuje bez bracketa, a ako se export
//obicno, znaci da ide import { naziv komponente }
//export default ide ili na pocetku ili na kraju, export na pocetku samo
export default ListOfUsers;
