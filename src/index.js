document.getElementById("calories").style.width = "30%";
document.getElementById("calories").style.height = "20rem";
var w = window.getComputedStyle(document.getElementById("calories")).width;
var h = window.getComputedStyle(document.getElementById("calories")).height;

w = w.substring(0, w.length - 2);
h = h.substring(0, h.length - 2);
var padding = w * 0.1;

var drinkOne = { drink: "Coffee", calories: 30 };
var drinkTwo = { drink: "Latte", calories: 90 };

var xScaleCalories = d3.scaleBand()
  .domain([drinkOne.drink, drinkTwo.drink])
  .range([padding, w - padding])
  .paddingInner(0.2)
  .paddingOuter(0.2);

var yScaleCalories = d3.scaleLinear()
  .domain([0, Math.max(drinkOne.calories, drinkTwo.calories)])
  .range([h-padding, padding]);

var xAxisCalories = d3.axisBottom().scale(xScaleCalories);
var yAxisCalories = d3.axisLeft().scale(yScaleCalories);

var svgCalories = d3.select("#calories")
  .append("svg")
  .attr("width", w)
  .attr("height", h);


svgCalories.selectAll("rect")
  .data([drinkOne, drinkTwo])
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return xScaleCalories(d.drink) + (xScaleCalories.bandwidth() / 4);
  })
  .attr("y", function(d) {
    return yScaleCalories(d.calories);
  })
  .attr("height", function(d) {
    return (yScaleCalories(0) - yScaleCalories(d.calories));
  })
  .attr("width", xScaleCalories.bandwidth() / 2)
  .attr("fill", "blue");

svgCalories.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxisCalories);

svgCalories.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxisCalories);

svgCalories.append("text")
  .attr("x", (w / 2))
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("text-decoration", "underline")
  .text("Calories");