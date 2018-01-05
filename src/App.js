import React, { Component } from "react";
import "./App.css";

import firebase from "./firebase";
import { Header, RestaurantCard, UserReview, WriteReview } from "./Components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="body">
          <RestaurantCard category={"sample"} price={"price"} />
          <UserReview />
          <WriteReview />
        </div>
      </div>
    );
  }
}

export default App;
