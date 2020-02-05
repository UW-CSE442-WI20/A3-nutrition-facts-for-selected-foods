const drinkSizes = {
  8: "Short (8 oz.)",
  12: "Tall (12 oz.)",
  16: "Grande (16 oz.)",
  20: "Venti (20 oz.)"
};

const milkTypes = {
  1: "Nonfat Milk",
  2: "1% Milk",
  3: "2% Milk",
  4: "Whole Milk",
  5: "Half & Half",
  6: "Heavy Cream",
  7: "Almond Milk",
  8: "Soy Milk"
};

const shotRange = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 };

/*
 * Selector Options
 */

export function getDrinkSizes() {
  return drinkSizes;
}

export function getMilkTypes() {
  return milkTypes;
}

export function getShotRange() {
  return shotRange;
}

// Given a set of drink selection parameters, returns a JSON
// object containing the nutrition information for the selection
export function getNutritionData(selection) {
  // TODO - This is where I'm going to actually query our dataset
}
