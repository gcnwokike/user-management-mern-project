import React, { Fragment, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import UserManagement from "./components/dashboard/UserManagement";
import PrivateRoute from "./components/routing/PrivateRoute";
import UploadCsv from "./components/dashboard/UploadCsv";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const resetUser = () => <Redirect to="/login" />;

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            {/*<Route exact path="/" component={UserManagement} />
             */}
            <Route exact path="/register" component={SignUp} />
            {/*<Route exact path="/c" component={CreateUser} />*/}
            <Route exact path="/login" component={SignIn} />
            {/*<PrivateRoute exact path="/dashboard" component={Dashboard} />*/}
            {/*<Route exact path="/" component={Dashboard} />*/}
            {/*<Route exact path="/dashboard/users" component={UserManagement} />*/}
            <Route exact path="/" component={SignUp} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/dashboard/users"
              component={UserManagement}
            />
            <PrivateRoute
              exact
              path="/dashboard/upload"
              component={UploadCsv}
            />

            <Route exact path="/*" component={resetUser} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
