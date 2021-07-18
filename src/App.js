import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import LeagueQuiz from "./LeagueQuiz";
import PlayerSearch from "./PlayerSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/playersearch" component={PlayerSearch} />
          <Route path="/leaguequiz" component={LeagueQuiz} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
