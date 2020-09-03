import React from "react";
import "./CPUser.css";

function CPUser({ handleLogout }) {
  return (
    <section className="user">
      <nav>
        <h2>User Control Panel</h2>
        <button>Vote</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </section>
  );
}

export default CPUser;
