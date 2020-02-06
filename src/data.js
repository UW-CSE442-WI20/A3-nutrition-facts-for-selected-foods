import json_data from "../data/drinks.json";
import { handleOnLoad } from "./selector.js";

var index = {};

document.addEventListener(
  "DOMContentLoaded",
  function() {
    index = json_data;
    handleOnLoad();
  },
  false
);

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
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // TODO: Put this in index somehow (with defaults?)
}

// Given a set of drink selection parameters, returns a JSON
// object containing the nutrition information for the selection
export function getNutritionData(selection) {
  return index[selection["Category"]][selection["Name"]][selection["Size"]][
    selection["Milk Type"]
  ][selection["Whipped Cream"]];
}
