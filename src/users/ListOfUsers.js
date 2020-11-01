import React from "react";
import PropType from "prop-types";

class ListOfUsers extends React.Component {
  render() {
    const { users, onClickUser } = this.props;
    return (
      <>
        {(users.length &&
          users.map((item) => {
            const { name, lastName } = item;
            return (
              <div className="user">
                <div className="username">{name + " " + lastName}</div>
                <button onClick={() => onClickUser(item)}>View</button>
              </div>
            );
          })) ||
          null}
      </>
    );
  }
}

ListOfUsers.defaultProps = {
  users: [],
};

ListOfUsers.propTypes = {
  users: PropType.array.isRequired,
  onClickUser: PropType.func.isRequired,
};

export default ListOfUsers;
