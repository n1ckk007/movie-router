import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";

function App() {
  return (
    //router goes around everything
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        {/* instead of making an individual route for each one you can
        have a wildcard route by putting :, if the user ends up /movie/id
        its going to create a parameter in that match object called movieId*/}
        <Route exact path="/movie/:movieId" component={Movie} />
      </div>
    </Router>
  );
}

export default App;
