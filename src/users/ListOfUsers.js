import React from "react";
import PropType from "prop-types";
import User from "./User";
class ListOfUsers extends React.Component {
  render() {
    const { users, onClickUser, onDeleteUser } = this.props;
    return (
      <>
        {(users.length &&
          users.map((item) => {
            return (
              <div className="user">
                {/* to znaci da smo spredovali sve key: value propertije koje objekat item ima,
                umesto toga smo mogli lastName={item.lastName}, name={item.name}  */}
                <User {...item} />
                <button onClick={() => onClickUser(item)}>View</button>
                <button onClick={() => onDeleteUser(item)}>X</button>
              </div>
            );
          })) || <h2>Users list is empty.</h2>}
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
