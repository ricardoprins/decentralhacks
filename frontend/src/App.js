import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Navigation,
  TheFooter,
  User,
  Home,
  Login,
  Register,
} from "./components";
import { AuthProvider } from "./components/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/register" exact component={() => <Register />} />
            <PrivateRoute path="/user" exact component={() => <User />} />
          </Switch>
          <TheFooter />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
