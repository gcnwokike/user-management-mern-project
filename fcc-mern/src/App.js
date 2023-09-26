import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./List";
//import Checkout from "./checkout/Checkout";
import CreateUser from "./CreateUser";
const App = () => {
  return (
    <Router>
      <Route path="/" exact component={List} />
      <Route path="/c" exact component={CreateUser} />
    </Router>
  );
};

export default App;
