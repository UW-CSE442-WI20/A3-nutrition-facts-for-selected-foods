import csv_data from "../data/drinks.csv";
import json_data from "../data/drinks.json";
import { handleOnLoad } from "./selector.js";

const drinkSizes = {
  8: "Short (8 fl. oz.)",
  12: "Tall (12 fl. oz.)",
  16: "Grande (16 fl. oz.)",
  20: "Venti (20 fl. oz.)",
  30: "Trenta (30 fl. oz.)"
};

const milkTypes = [
  "Nonfat Milk",
  "1% Milk",
  "2% Milk",
  "Whole Milk",
  "Half & Half",
  "Heavy Cream",
  "Almond Milk",
  "Soy Milk"
];

const shotRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const whippedCreamOptions = ["No Whipped Cream", "Unsweetened", "Sweetened"];

var drinkCategoryOptions = [];

var drinkOptions = {}; // Mapping Category -> list of options

var index = {};

var data;
document.addEventListener(
  "DOMContentLoaded",
  function() {
    d3.csv(csv_data).then(function(d) {
      data = d;
      parseData();
      handleOnLoad();
    });
    index = json_data;
  },
  false
);

function parseData() {
  // Dedupe categories and drinks with sets
  let drinkCategorySet = new Set();
  let drinkOptionsSets = {};
  for (let i in data) {
    let row = data[i];
    drinkCategorySet.add(row["Category"]);
    if (!(row["Category"] in drinkOptionsSets)) {
      drinkOptionsSets[row["Category"]] = new Set();
    }
    drinkOptionsSets[row["Category"]].add(row["Name"]);
  }

  // Save to globals
  for (let c in drinkOptionsSets) {
    drinkOptions[c] = [...drinkOptionsSets[c]];
  }
  drinkCategoryOptions = [...drinkCategorySet];
}

/*
 * Selector Options
 */
export function getDrinkCategoryOptions(selection) {
  return Object.keys(index);
}

export function getDrinkOptions(selection) {
  return Object.keys(index[selection["Category"]]);
}

export function getDrinkSizeOptions(selection) {
  console.log(selection);
  console.log(index[selection["Category"]][selection["Name"]]);
  return Object.keys(index[selection["Category"]][selection["Name"]]);
}

export function getMilkTypeOptions(selection) {
  return Object.keys(
    index[selection["Category"]][selection["Name"]][selection["Size"]]
  );
}

export function getWhippedCreamOptions(selection) {
  return Object.keys(
    index[selection["Category"]][selection["Name"]][selection["Size"]][
      selection["Milk Type"]
    ]
  );
}

export function getNumShotsOptions(selection) {
  return shotRange;
}

// Given a set of drink selection parameters, returns a JSON
// object containing the nutrition information for the selection
export function getNutritionData(selection) {
  return index[selection["Category"]][selection["Name"]][selection["Size"]][
    selection["Milk Type"]
  ][selection["Whipped Cream"]];
}
