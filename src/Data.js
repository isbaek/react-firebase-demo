import React, { Component } from "react";

const LUNCH_DATA = {
  words: [
    "Nook",
    "Khao San Road",
    "Parm Cafeteria",
    "Fusaros",
    "Butter Avenue",
    "What a Bagel",
    "Chinese Panda",
    "Craft Kitchen",
    "Kibo Sushi House",
    "Pizza Pizza",
    "Social House",
    "McDonalds"
  ],
  categories: [
    "Brunch",
    "Burgers",
    "Coffee",
    "Deli",
    "Dim Sum",
    "Indian",
    "Italian",
    "Mediterranean",
    "Mexican",
    "Pizza",
    "Ramen",
    "Sushi"
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function restaurantObject() {
  const photoID = Math.floor(Math.random() * 22) + 1;
  return {
    name: getRandomItem(LUNCH_DATA.words),
    category: getRandomItem(LUNCH_DATA.categories),
    price: Math.floor(Math.random() * 4) + 1,
    photo: `https://storage.googleapis.com/firestorequickstarts.appspot.com/food_${photoID}.png`,
    numRatings: 0,
    avgRating: 0
  };
}
