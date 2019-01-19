import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import BrowseContainer from "./components/BrowseContainer";
import MoviePageContainer from "./components/MoviePageContainer";
// import QuickSearch from "./components/QuickSearch";

const header = (
  <header>
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
    <div>
      TODO QuickSearch
      <Link to="/">Browse Movies</Link>
    </div>
  </header>
);

const App = props => (
  <div>
    <BrowseContainer />
  </div>
);

export default App;
