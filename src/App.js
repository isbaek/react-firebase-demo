import React, { Component } from "react";
import "./App.css";
import { Button } from "react-mdl";
// Firebase
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseApp from "./firebase";

import { Header, RestaurantCard, UserReview, WriteReview } from "./Components";
import restaurantModel from "./Data";

class App extends Component {
  constructor(props) {
    super(props);

    // Authentication
    this.auth = firebaseApp.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    // Listen for auth state changes !
    this.auth.onAuthStateChanged(user => this.setState({ user }));

    this.database = firebase.firestore().collection("kg-lunch");
  }

  state = {
    user: null,
    showData: false,
    data: null
  };

  componentDidMount() {
    this.unsubscribe = this.database.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  /* AUTHENTICATION */
  logIn = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  logOut = () => {
    return this.auth.signOut();
  };

  /* DATABASE */
  // Add restuarants to DB
  addData = data => {
    return firebase
      .firestore()
      .collection("kg-lunch")
      .add(data);
  };

  addAllRestaurants = () => {
    return Promise.all(
      Array.apply(null, Array(20)).map(() => this.addData(restaurantModel()))
    );
  };

  // Capturing realtime updates
  onCollectionUpdate = querySnapshot => {
    const restos = [];
    querySnapshot.forEach(doc => {
      const {
        avgRating,
        category,
        name,
        numRatings,
        photo,
        price
      } = doc.data();
      restos.push({
        key: doc.id,
        avgRating,
        category,
        name,
        numRatings,
        photo,
        price
      });
    });
    this.setState({ data: restos });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className="App">
        <Header
          user={this.state.user}
          onSignIn={this.logIn}
          onSignOut={this.logOut}
        />
        <div className="body">
          {!data ? (
            <Button
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              onClick={this.addAllRestaurants}
            />
          ) : (
            data.map((v, idx) => <RestaurantCard key={idx} data={v} />)
          )}
        </div>
      </div>
    );
  }
}

export default App;
