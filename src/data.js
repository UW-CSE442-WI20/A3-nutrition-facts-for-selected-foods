import raw_data from "./drinks.csv";
import { handleOnLoad } from "./selector.js";

const drinkSizes = {
  8: "Short (8 oz.)",
  12: "Tall (12 oz.)",
  16: "Grande (16 oz.)",
  20: "Venti (20 oz.)"
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

var data;
d3.csv(raw_data).then(function(d) {
  data = d;
  parseData();
  handleOnLoad();
});

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
  console.log(drinkOptionsSets);
  // Save to globals
  for (let c in drinkOptionsSets) {
    drinkOptions[c] = [...drinkOptionsSets[c]];
  }
  drinkCategoryOptions = [...drinkCategorySet];
}

/*
 * Selector Options
 */
export function getDrinkOptions(category) {
  return drinkOptions[category];
}

export function getDrinkCategoryOptions() {
  return drinkCategoryOptions;
}

export function getDrinkSizeOptions() {
  return drinkSizes;
}

export function getMilkTypeOptions() {
  return milkTypes;
}

export function getNumShotsOptions() {
  return shotRange;
}

export function getWhippedCreamOptions() {
  return whippedCreamOptions;
}

// Given a set of drink selection parameters, returns a JSON
// object containing the nutrition information for the selection
export function getNutritionData(selection) {
  // TODO - This is where I'm going to actually query our dataset
}
