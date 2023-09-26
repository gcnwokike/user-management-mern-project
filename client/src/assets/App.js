import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
//Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
