import {
  getDrinkCategoryOptions,
  getDrinkOptions,
  getDrinkSizeOptions,
  getMilkTypeOptions,
  getNumShotsOptions,
  getNutritionData,
  getWhippedCreamOptions
} from "./data.js";

var selectors = new Set(); // Register all selectors here on init.

/*
 *  Selector initialization
 */

export function handleOnLoad() {
  initSelectors();
  for (let i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener("change", handleUpdate);
  }
  return;
}

// TODO: Fully construct the selectors in js so we don't
// have to copy paste the selector html?
function initSelectors() {
  initDrinkCategorySelectors();
  initDrinkOptions();
  initSizeSelectors();
  initShotSelectors();
  initMilkSelectors();
  initWhippedCreamSelectors();
}

function initDrinkCategorySelectors() {
  assignOptions("drink-category-selector", getDrinkCategoryOptions());
  registerSelectors(document.getElementsByClassName("drink-category-selector"));
}

function initDrinkOptions() {
  assignOptions(
    "drink-selector",
    getDrinkOptions(document.getElementById("drink-category-selector-A").value)
  );
  registerSelectors(document.getElementsByClassName("drink-selector"));
}

function initSizeSelectors() {
  assignOptions("drink-size-selector", getDrinkSizeOptions());
  registerSelectors(document.getElementsByClassName("drink-size-selector"));
}

function initShotSelectors() {
  assignOptions("shots-selector", getNumShotsOptions());
  registerSelectors(document.getElementsByClassName("shots-selector"));
}

function initMilkSelectors() {
  assignOptions("milk-type-selector", getMilkTypeOptions());
  registerSelectors(document.getElementsByClassName("milk-type-selector"));
}

function initWhippedCreamSelectors() {
  assignOptions("whipped-cream-selector", getWhippedCreamOptions());
  registerSelectors(document.getElementsByClassName("whipped-cream-selector"));
}

/*
 *  Update logic
 */

// Called whenever there is an update to the selectors
function handleUpdate() {
  let parameters = getParameters();
  let data = getNutritionData(parameters); // Query the dataset (data.js);
  // update(parameters);  // Send data to the graphs
}

// Returns an object containing the parameters for the current selection
/*
   [
        { first drink's parameters }
        { second drink's parameters }
        ...
   ]
*/
function getParameters() {
  let res = {};

  // TODO: implement this
  for (let i = 0; i < selectors.length; i++) {}
}

/*
 *  Utils
 */

function assignOptions(selectorClass, options) {
  let selectors_ = document.getElementsByClassName(selectorClass);
  for (let i = 0; i < selectors_.length; i++) {
    let s = selectors_[i];
    for (let val in options) {
      let option = document.createElement("option");
      option.innerHTML = options[val];
      s.appendChild(option);
    }
  }
}

function registerSelectors(collection) {
  for (let i = 0; i < collection.length; i++) {
    selectors.add(collection[i]);
  }
}
