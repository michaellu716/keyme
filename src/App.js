import React from "react";

import "./App.css";
import Register from "./components/Register";

import ProductList from "./components/ProductList";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register}  />

        <Route path="/" component={ProductList} exact/>
      </Switch>
    </div>
  );
}

export default App;
