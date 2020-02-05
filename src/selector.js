import {
  getDrinkSizes,
  getMilkTypes,
  getShotRange,
  getNutritionData
} from "./data.js";
window.onload = e => {
  handleOnLoad();
};

var selectors = []; // Register all selectors here on init.

/*
 *  Selector initialization
 */

function handleOnLoad() {
  initSelectors();
  for (let i = 0; i < selectors.length; i++) {
    selectors[i].addEventListener("change", handleUpdate);
  }
}

// TODO: Fully construct the selectors in js so we don't
// have to copy paste the selector html?
function initSelectors() {
  initSizeSelectors();
  initShotSelectors();
  initMilkSelectors();
  initWhippedCreamSelector();
}

function initSizeSelectors() {
  assignOptions("drink-size-selector", getDrinkSizes());
  registerSelectors(document.getElementsByClassName("drink-size-selector"));
}

function initShotSelectors() {
  assignOptions("shots-selector", getShotRange());
  registerSelectors(document.getElementsByClassName("shots-selector"));
}

function initMilkSelectors() {
  assignOptions("milk-type-selector", getMilkTypes());
  registerSelectors(document.getElementsByClassName("milk-type-selector"));
}

function initWhippedCreamSelector() {
  registerSelectors(document.getElementsByClassName("whipped-cream-input"));
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
      option.value = val;
      option.innerHTML = options[val];
      s.appendChild(option);
    }
  }
}

function registerSelectors(collection) {
  for (let i = 0; i < collection.length; i++) {
    selectors.push(collection[i]);
  }
}
