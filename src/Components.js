import React, { Component } from "react";
import { Button, Card } from "react-mdl";
import "./App.css";

export function Header({ user, onSignIn, onSignOut }) {
  return (
    <div className="header">
      <h2>KG Lunch Review</h2>
      <Button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
        Filter
      </Button>
      <div className="user-container" id="user-container">
        {user ? (
          <div className="user-details">
            <div
              className="user-pic"
              style={{ backgroundImage: "url(" + user.photoURL + ")" }}
            />
            <div className="user-name" id="user-name">
              {user.displayName}
            </div>
          </div>
        ) : null}
        {user ? (
          <Button
            onClick={onSignOut}
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
          >
            Sign-out
          </Button>
        ) : (
          <Button
            onClick={onSignIn}
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
          >
            <i className="material-icons">account_circle</i>Sign-in with Google
          </Button>
        )}
      </div>
    </div>
  );
}

export function RestaurantCard({ category, price }) {
  return (
    <div className="mdl-card-square mdl-card mdl-shadow--2dp">
      <div className="mdl-card__title mdl-card--expand" />
      <div className="mdl-card__supporting-text">
        {category}
        <span> ● </span>
        {price}
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Review
        </a>
      </div>
    </div>
  );
}

export function UserReview() {
  return (
    <div className="review-card">
      <div className="review max_width_600">
        <div className="review-card__header">
          <div className="review-card__author">
            <span className="light" data-fir-content="userName">
              fsadfds
            </span>
          </div>
          <div className="review-card__rating" />
        </div>
        <div data-fir-content="review-card__text">sdfadsf</div>
      </div>
    </div>
  );
}

export function WriteReview() {
  return (
    <div className="review-textarea">
      <header className="review-textarea__header">
        <h2 className="review-textarea__header__title">Add a Review</h2>
      </header>
      <section className="review-textarea__body">
        <div className="star-input">
          <i className="material-icons">star_border</i>
          <i className="material-icons">star_border</i>
          <i className="material-icons">star_border</i>
          <i className="material-icons">star_border</i>
          <i className="material-icons">star_border</i>
        </div>
        <textarea id="text" />
      </section>
      <footer className="review-textarea__footer">
        <Button
          type="button"
          className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        >
          Save
        </Button>
      </footer>
    </div>
  );
}
