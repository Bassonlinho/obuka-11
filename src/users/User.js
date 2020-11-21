import React from "react";

const User = ({ name, username, email, website }) => {
  return (
    <>
      <div className="username">{name + " " + username}</div>
      <div>Email: {email}</div>
      <div>Website: {website}</div>
    </>
  );
};

export default User;
