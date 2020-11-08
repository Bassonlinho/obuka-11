import React from "react";

const User = ({ name, lastName, ocupation, city }) => {
  return (
    <>
      <div className="username">{name + " " + lastName}</div>
      <div>Ocupation: {ocupation}</div>
      <div>City: {city}</div>
    </>
  );
};

export default User;
