Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const ELEMENTS = [
  "calories",
  "fat",
  "cholesterol",
  "sodium",
  "carbs",
  "fiber",
  "sugar",
  "protein",
  "caffeine"
];

const yAxisNames = [
  "Calories",
  "Fat (grams)",
  "Cholesterol (milligrams)",
  "Sodium (milligrams)",
  "Carbohydrates (grams)",
  "Fiber (grams)",
  "Sugar (grams)",
  "Protein (grams)",
  "Caffeine (milligrams)"
];

// clear the charts, which are to be replaced by new charts
for (let i = 0; i < ELEMENTS.length; i++) {
  document.getElementById(ELEMENTS[i]).innerHTML = "";
}

for (let i = 0; i < ELEMENTS.length; i++) {
  const content = ELEMENTS[i];
  document.getElementById(content).style.width = "30%";
  document.getElementById(content).style.height = "20rem";
  var w = window.getComputedStyle(document.getElementById(content)).width;
  var h = window.getComputedStyle(document.getElementById(content)).height;

  w = w.substring(0, w.length - 2);
  h = h.substring(0, h.length - 2);
  var padding = w * 0.1;

  var drinkOne = {
    drink: "Coffee",
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
  };
  var drinkTwo = {
    drink: "Latte",
    nutritions: [
      { calories: 90 },
      { fat: 90 },
      { cholesterol: 90 },
      { sodium: 90 },
      { carbs: 90 },
      { fiber: 90 },
      { sugar: 90 },
      { protein: 90 },
      { caffeine: 90 }
    ]
  };

  var xScale = d3
    .scaleBand()
    .domain([drinkOne.drink, drinkTwo.drink])
    .range([padding, w - padding])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  var yScale = d3
    .scaleLinear()
    .domain([
      0,
      Math.max(
        Object.byString(drinkOne.nutritions[i], content),
        Object.byString(drinkTwo.nutritions[i], content)
      )
    ])
    .range([h - padding, padding]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var svg = d3
    .select("#" + content)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data([drinkOne, drinkTwo])
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return xScale(d.drink) + xScale.bandwidth() / 4;
    })
    .attr("y", function(d) {
      return yScale(Object.byString(d.nutritions[i], content));
    })
    .attr("height", function(d) {
      return (
        yScale(0) -
        yScale(Object.byString(d.nutritions[i], content))
      );
    })
    .attr("width", xScale.bandwidth() / 2)
    .attr("fill", function(d, i) {
      if (i == 0) {
        return "#1a75ff";
      } else {
        return "#00cc44";
      }
    });

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

  svg
    .append("text")
    .attr("x", w / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "1.1em")
    .style("text-decoration", "underline")
    .text(yAxisNames[i]);
}
