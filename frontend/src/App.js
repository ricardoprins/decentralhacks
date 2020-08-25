import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navigation, TheFooter, Home, Vote, Register} from './components';

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/vote" exact component={() => <Vote />} />
            <Route path="/register" exact component={() => <Register />} />
          </Switch>
          <TheFooter />
        </Router>
    </div>
  );
}

export default App;