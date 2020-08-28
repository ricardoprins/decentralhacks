import React from "react";
import app from "./base";

const User = () => {
  return (
    <>
      <h1>User</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <button onClick={() => alert("Voted!")}>Vote</button>
    </>
  );
};

export default User;
