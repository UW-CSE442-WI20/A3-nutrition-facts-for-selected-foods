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

function getSizeKeyFromSize(size) {
  if (size === "Short (8 fl. oz.)") {
    return "01_Short (8 fl. oz.)";
  }
  if (size === "Tall (12 fl. oz.)") {
    return "02_Tall (12 fl. oz.)";
  }
  if (size === "Grande (16 fl. oz.)") {
    return "03_Grande (16 fl. oz.)";
  }
  if (size === "Venti (20 fl. oz.)") {
    return "04_Venti (20 fl. oz.)";
  }
  if (size === "Venti Iced (24 fl. oz.)") {
    return "05_Venti Iced (24 fl. oz.)";
  }
  if (size === "Trenta (30 fl. oz.)") {
    return "06_Trenta (30 fl. oz.)";
  }
  return "07_" + size;
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
  let options = Object.keys(index[selection["Category"]][selection["Name"]]);
  let res = [];

  for (let o of options) {
    res.push(o.substring(3));
  }

  return res;
}

export function getMilkTypeOptions(selection) {
  return Object.keys(
    index[selection["Category"]][selection["Name"]][getSizeKeyFromSize(selection["Size"])]
  );
}

export function getWhippedCreamOptions(selection) {
  return Object.keys(
    index[selection["Category"]][selection["Name"]][getSizeKeyFromSize(selection["Size"])][
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
  return transformNutritionData(
    index[selection["Category"]][selection["Name"]][getSizeKeyFromSize(selection["Size"])][
      selection["Milk Type"]
    ][selection["Whipped Cream"]]
  );
}

/*

INPUT:
{
    Calories: "5"
    Whipped Cream: ""
    Protein(g): "0"
    Cholesterol(mg): "0"
    Sugars(g): "0"
    Category: "brewed-coffee"
    Portion(fl oz): "8.0"
    Total Fat(g): "0.0"
    Calories from fat: "0"
    Size: "Short"
    Milk: ""
    Dietary Fiber(g): "0"
    Total Carbohydrate(g): "0"
    Trans fat(g): "0.0"
    Caffeine(mg): "130"
    Saturated fat(g): "0.0"
    Name: "Featured Dark Roast"
    Sodium(mg): "5"
}

OUTPUT:

 drink: "brewed-coffee",
  nutritions: [
    { calories: 30 },
    { fat: 30 },
    { cholesterol: 30 },
    { sodium: 30 },
    { carbs: 30 },
    { fiber: 15 },
    { sugar: 30 },
    { protein: 30 },
    { caffeine: 30 }
  ]

*/
function transformNutritionData(d) {
  return {
    drink: d["Name"],
    nutritions: [
      { calories: parseFloat(d["Calories"]) },
      { fat: parseFloat(d["Total Fat(g)"]) },
      { cholesterol: parseFloat(d["Cholesterol(mg)"]) },
      { sodium: parseFloat(d["Sodium(mg)"]) },
      { carbs: parseFloat(d["Total Carbohydrate(g)"]) },
      { fiber: parseFloat(d["Dietary Fiber(g)"]) },
      { sugar: parseFloat(d["Sugars(g)"]) },
      { protein: parseFloat(d["Protein(g)"]) },
      { caffeine: parseFloat(d["Caffeine(mg)"]) },
      { fatCalories: parseFloat(d["Calories from fat"]) },
      { transFat: parseFloat(d["Trans fat(g)"]) },
      { satFat: parseFloat(d["Saturated fat(g)"]) }
    ]
  };
}
