import React, { Component } from "react";
import "./App.css";
import { Button } from "react-mdl";
// Firebase
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseApp from "./firebase";

import { Header, RestaurantCard, UserReview } from "./Components";
import restaurantModel from "./Data";

class App extends Component {
  constructor(props) {
    super(props);

    // Authentication
    this.auth = firebaseApp.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    // Listen for auth state changes !
    this.auth.onAuthStateChanged(user => this.setState({ user }));

    // Database
    this.database = firebase.firestore().collection("kg-lunch");
  }

  state = {
    user: null,
    showData: false,
    data: null,
    showReview: [],
    rating: 0,
    text: "",
    userReviews: null
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

  getUserRatings = restaurantId => {
    const query = this.database.doc(restaurantId).collection("ratings");
    const users = [];
    query.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { rating, text, userName } = doc.data();
        users.push({
          key: doc.id,
          rating,
          text,
          userName
        });
      });
      this.setState({ userReviews: users });
    });
  };

  // Review click handlers
  onReviewClick = id => {
    const { showReview } = this.state;
    showReview[id] = true;
    this.getUserRatings(id);
    this.setState({ showReview });
  };

  onReviewClose = id => {
    const { showReview } = this.state;
    showReview[id] = false;
    this.setState({ showReview, rating: 0, text: "" });
  };

  /* RATING */
  onReviewSave = id => {
    const { rating, text } = this.state;
    const document = this.database.doc(id); // Sub collection, associated with the restaurant ID

    this.setState({ rating: 0, text: "" });
    this.getUserRatings(id);

    return document
      .collection("ratings")
      .add({
        rating,
        text,
        userName: this.state.user.displayName,
        timestamp: new Date(),
        userId: this.state.user.uid
      })
      .then(() => {
        return firebase.firestore().runTransaction(transaction => {
          //  a transaction is a set of read and write operations on one or more documents.
          return transaction.get(document).then(doc => {
            const data = doc.data();

            let newAverage =
              (data.numRatings * data.avgRating + rating) /
              (data.numRatings + 1);

            // Just updating the num ratings and avg ratings
            return transaction.update(document, {
              numRatings: data.numRatings + 1,
              avgRating: newAverage
            });
          });
        });
      });
  };

  render() {
    const { data, showReview, text, rating, user, userReviews } = this.state;

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
            data.map((v, idx) => {
              return (
                <div>
                  <RestaurantCard
                    key={idx}
                    data={v}
                    onReviewClick={id => this.onReviewClick(id)}
                  />
                  {showReview[v.key] && userReviews ? (
                    <UserReview
                      key={v.key}
                      selectedData={v}
                      users={userReviews}
                      text={text}
                      rating={rating}
                      onTextChange={e =>
                        this.setState({ text: e.target.value })
                      }
                      onClose={id => this.onReviewClose(id)}
                      onSave={id => this.onReviewSave(id)}
                      onRate={rating => this.setState({ rating })}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default App;
