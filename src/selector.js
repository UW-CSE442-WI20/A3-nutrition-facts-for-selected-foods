import {
  getDrinkCategoryOptions,
  getDrinkOptions,
  getDrinkSizeOptions,
  getMilkTypeOptions,
  getNumShotsOptions,
  getWhippedCreamOptions,
  getNutritionData
} from "./data.js";

const init_params = {
  A: {
    Category: "espresso",
    Name: "Starbucks\u00ae Blonde Iced Pumpkin Spice Latte",
    Size: "Tall (12 fl. oz.)",
    "Milk Type": "Nonfat milk",
    "Whipped Cream": "Whipped Cream"
  },
  B: {
    Category: "espresso",
    Name: "Starbucks\u00ae Blonde Iced Pumpkin Spice Latte",
    Size: "Tall (12 fl. oz.)",
    "Milk Type": "Nonfat milk",
    "Whipped Cream": "Whipped Cream"
  }
};

/*
 *  Selector initialization
 */
export function handleOnLoad() {
  d3.selectAll(".selector").on("change", () => handleUpdate());
  setSelection(init_params);
  handleUpdate();
}

function setSelection(parameters) {
  for (const i of ["A", "B"]) {
    assignOptions(document.getElementById("drink-category-selector-" + i), [
      parameters[i]["Category"]
    ]);
    assignOptions(document.getElementById("drink-selector-" + i), [
      parameters[i]["Name"]
    ]);
    assignOptions(document.getElementById("drink-size-selector-" + i), [
      parameters[i]["Size"]
    ]);
    assignOptions(document.getElementById("milk-type-selector-" + i), [
      parameters[i]["Milk Type"]
    ]);
    assignOptions(document.getElementById("whipped-cream-selector-" + i), [
      parameters[i]["Whipped Cream"]
    ]);
    assignOptions(document.getElementById("shots-selector-" + i), [0]);
  }
}

// TODO: Fix selection bugs. First element is always selected for some reason. Probably because we are resetting the options on each update.
// Solution: only update the options we need to for each change (ie, if category change, then update all but category, if drinks then update all but category and drink)
// Alternative solution: update all, but check to see if there is a difference in the options before updating
function setSelectionOptions(parameters) {
  for (const i of ["A", "B"]) {
    assignOptions(
      document.getElementById("drink-category-selector-" + i),
      getDrinkCategoryOptions(parameters[i])
    );
    assignOptions(
      document.getElementById("drink-selector-" + i),
      getDrinkOptions(parameters[i])
    );
    assignOptions(
      document.getElementById("drink-size-selector-" + i),
      getDrinkSizeOptions(parameters[i])
    );
    assignOptions(
      document.getElementById("milk-type-selector-" + i),
      getMilkTypeOptions(parameters[i])
    );
    assignOptions(
      document.getElementById("whipped-cream-selector-" + i),
      getWhippedCreamOptions(parameters[i])
    );
    assignOptions(
      document.getElementById("shots-selector-" + i),
      getNumShotsOptions(parameters[i])
    );
  }
}

/*
 *  Update logic
 */

// Called whenever there is an update to the selectors
function handleUpdate(parameters) {
  if (parameters === null || parameters === undefined) {
    parameters = getParameters();
  }
  console.log(parameters);
  setSelectionOptions(parameters);
  let nutritionData1 = getNutritionData(parameters["A"]); // Query the dataset (data.js);
  // update(nutritionData);  // Send data to the graphs
}

// Returns an object containing the parameters for the current selection
function getParameters() {
  let res = {
    A: {},
    B: {}
  };
  let a = d3
    .selectAll(".selector")
    .filter(".A")
    .nodes();
  for (let e in a) {
    res.A[a[e].name] = a[e].value;
  }
  let b = d3
    .selectAll(".selector")
    .filter(".B")
    .nodes();
  for (let e in b) {
    res.B[b[e].name] = b[e].value;
  }
  return res;
}

/*
 *  Utils
 */

function assignOptions(s, options) {
  if (JSON.stringify(options) == JSON.stringify(getOptions(s))) {
    console.log("arrays equal");
    return;
  }
  clearOptions(s);
  for (let val in options) {
    let option = document.createElement("option");
    option.innerHTML = options[val];
    s.appendChild(option);
  }
}

function getOptions(s) {
  let res = [];
  for (let i = 0; i < s.children.length; i++) {
    res.push(s.children[i].value);
  }
  return res;
}

function clearOptions(s) {
  while (s.firstChild) {
    s.removeChild(s.firstChild);
  }
}
