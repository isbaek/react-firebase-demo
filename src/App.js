import React, { Component } from "react";
import "./App.css";
// Firebase
import firebase from "firebase";
import firebaseApp from "./firebase";

import { Header, RestaurantCard, UserReview, WriteReview } from "./Components";

class App extends Component {
  constructor(props) {
    super(props);

    // Authentication
    this.auth = firebaseApp.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    // Listen for auth state changes !
    this.auth.onAuthStateChanged(user => this.setState({ user }));
  }

  state = {
    user: null
  };

  /* AUTHENTICATION */
  logIn = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  logOut = () => {
    return this.auth.signOut();
  };

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.user}
          onSignIn={this.logIn}
          onSignOut={this.logOut}
        />
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
