import React from "react";
import app from "./base";

const Auditor = () => {
  return (
    <>
      <h1>Auditor</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      {/* Authorize ballots component */}
    </>
  );
};

export default Auditor;
