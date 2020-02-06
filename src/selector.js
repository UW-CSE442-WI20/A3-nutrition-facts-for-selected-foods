import {
  getDrinkCategoryOptions,
  getDrinkOptions,
  getDrinkSizeOptions,
  getMilkTypeOptions,
  getNumShotsOptions,
  getNutritionData,
  getWhippedCreamOptions
} from "./data.js";

/*
 *  Selector initialization
 */
export function handleOnLoad() {
  initSelectors();
  d3.selectAll(".selector").on("change", () => handleUpdate());
  d3.select("#drink-category-selector-A").on("change.category", function(e, i) {
    assignOptions(
      document.getElementById("drink-selector-A"),
      getDrinkOptions(
        document.getElementById("drink-category-selector-A").value
      )
    );
  });
  d3.select("#drink-category-selector-B").on("change.category", function(e, i) {
    assignOptions(
      document.getElementById("drink-selector-B"),
      getDrinkOptions(
        document.getElementById("drink-category-selector-B").value
      )
    );
  });
}

// TODO: Fully construct the selectors in js so we don't
// have to copy paste the selector html?
function initSelectors() {
  assignOptionsByClass("drink-category-selector", getDrinkCategoryOptions());
  assignOptionsByClass(
    "drink-selector",
    getDrinkOptions(document.getElementById("drink-category-selector-A").value)
  );
  assignOptionsByClass("drink-size-selector", getDrinkSizeOptions());
  assignOptionsByClass("shots-selector", getNumShotsOptions());
  assignOptionsByClass("milk-type-selector", getMilkTypeOptions());
  assignOptionsByClass("whipped-cream-selector", getWhippedCreamOptions());
}

/*
 *  Update logic
 */

var prevParams = null;

// Called whenever there is an update to the selectors
function handleUpdate() {
  let parameters = getParameters();
  let data = getNutritionData(parameters); // Query the dataset (data.js);
  // update(parameters);  // Send data to the graphs
}

// Returns an object containing the parameters for the current selection
/*
   {
        A: { first drink's parameters }
        B: { second drink's parameters }
        ...
   }
*/
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

function assignOptionsByClass(selectorClass, options) {
  let selectors = document.getElementsByClassName(selectorClass);
  for (let i = 0; i < selectors.length; i++) {
    let s = selectors[i];
    assignOptions(s, options);
  }
}

function assignOptions(s, options) {
  clearOptions(s);
  for (let val in options) {
    let option = document.createElement("option");
    option.innerHTML = options[val];
    s.appendChild(option);
  }
}

function clearOptions(s) {
  while (s.firstChild) {
    s.removeChild(s.firstChild);
  }
}
