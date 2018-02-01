import React, { Component } from "react";
import { Button, Card } from "react-mdl";
import ReactStars from "react-stars";
import "./App.css";

export function Header({ user, onSignIn, onSignOut }) {
  return (
    <div className="header">
      <h2>KG Lunch Review</h2>
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

export function RestaurantCard({ data, onReviewClick }) {
  return (
    <div className="restaurant-card mdl-card-square mdl-card mdl-shadow--2dp">
      <div
        className="mdl-card__title mdl-card--expand"
        style={{
          backgroundImage: `url(${data.photo})`,
          backgroundSize: "cover",
          overflow: "hidden"
        }}
      />
      <div className="mdl-card__supporting-text">
        {data.name}
        <span> ● </span>
        {data.category}
        <span className="price">
          {data.price === 1 && "$"}
          {data.price === 2 && "$$"}
          {data.price === 3 && "$$$"}
          {data.price === 4 && "$$$$"}
        </span>
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <div className="star-input">
          <ReactStars
            count={5}
            value={data.avgRating}
            size={24}
            color2={"#ffd700"}
            color1={"#ccc"}
            edit={false}
            half={false}
          />
          {data.numRatings === 0 ? null : data.numRatings}
        </div>
        <a
          className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          onClick={() => onReviewClick(data.key)}
        >
          Review
        </a>
      </div>
    </div>
  );
}

export function UserReview({
  users,
  text,
  rating,
  selectedData,
  onSave,
  onClose,
  onRate,
  onTextChange
}) {
  return (
    <div className="review-card">
      <div className="review-card__inner">
        <span className="light">{selectedData.name}</span>

        <div>
          {users.map((u, idx) => {
            <div key={idx}>
              <p>{u.userName} </p>
            </div>;
          })}
        </div>
        <div className="review-textarea">
          <section className="review-textarea__body">
            <div className="star-input">
              <ReactStars
                count={5}
                value={rating}
                size={24}
                color2={"#ffd700"}
                color1={"#ccc"}
                half={false}
                onChange={newRate => onRate(newRate)}
              />
            </div>
            <textarea id="text" value={text} onChange={e => onTextChange(e)} />
          </section>
          <footer className="review-textarea__footer">
            <Button
              type="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={() => onClose(selectedData.key)}
            >
              Close
            </Button>
            <Button
              type="button"
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              onClick={() => onSave(selectedData.key)}
            >
              Save
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
