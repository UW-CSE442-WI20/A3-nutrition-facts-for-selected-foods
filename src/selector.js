import {
  getDrinkCategoryOptions,
  getDrinkOptions,
  getDrinkSizeOptions,
  getMilkTypeOptions,
  getNumShotsOptions,
  getWhippedCreamOptions,
  getNutritionData
} from "./data.js";

import { update } from "./viz.js";

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
  d3.selectAll(".selector").on("change", function(d, i, nodes) {
    handleOnChange(nodes, i);
    sendUpdate();
  });
  setSelection(init_params);
  handleOnChange(
    d3
      .selectAll(".selector")
      .filter(".A")
      .nodes(),
    0,
    true
  );
  handleOnChange(
    d3
      .selectAll(".selector")
      .filter(".B")
      .nodes(),
    0,
    true
  );
  sendUpdate();
}

function handleOnChange(nodes, i, updateFirst = false) {
  let drinkLetter = getDrinkLetter(nodes[i]);
  if (!updateFirst) {
    i++;
  }
  while (i < nodes.length && getDrinkLetter(nodes[i]) === drinkLetter) {
    setSelectionOptions(nodes[i], getParameters()[drinkLetter]);
    i++;
  }
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
  }
}

function setSelectionOptions(element, parameters) {
  if (element.id.startsWith("drink-category-selector-")) {
    assignOptions(element, getDrinkCategoryOptions(parameters));
  } else if (element.id.startsWith("drink-selector-")) {
    assignOptions(element, getDrinkOptions(parameters));
  } else if (element.id.startsWith("drink-size-selector-")) {
    assignOptions(element, getDrinkSizeOptions(parameters));
  } else if (element.id.startsWith("milk-type-selector-")) {
    assignOptions(element, getMilkTypeOptions(parameters));
  } else if (element.id.startsWith("whipped-cream-selector-")) {
    assignOptions(element, getWhippedCreamOptions(parameters));
  } else {
    console.log("setSelectionOptions - no match");
  }
}

/*
 *  Update logic
 */

// Called whenever there is an update to the selectors
function sendUpdate(parameters) {
  if (parameters === null || parameters === undefined) {
    parameters = getParameters();
  }
  update(getNutritionData(parameters["A"]), getNutritionData(parameters["B"])); // Send data to the graphs
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

function getDrinkLetter(node) {
  return node.id.substring(node.id.lastIndexOf("-") + 1);
}
