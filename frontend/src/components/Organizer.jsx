import React from "react";
import app from "./base";

const Organizer = () => {
  return (
    <>
      <h1>Organizer</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      <button onClick={() => alert("Election created")}>Create Election</button>
      {/* Organizer workpanel components */}
    </>
  );
};

export default Organizer;
