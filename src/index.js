var w = 600;
var h = 300;
var padding = 40;

var xScale = d3.scaleBand()
  .domain(["Sodium", "Cholesterol"])
  .range([padding, w - padding])
  .paddingInner(0.1);

var yScale = d3.scaleLinear();

const csvFile = require('./data.csv');

d3.csv(csvFile).then(function(data) {

  var nutritionValues = data.columns.slice(1);

  yScale.domain([0, d3.max(data, function(d) {
      return d3.max(nutritionValues, function(val) { return d[val]; });
  })])
    .range([h-padding, 0]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  for (var i = 0; i < nutritionValues.length; i++) {
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return xScale(nutritionValues[i]);
      })
      .attr("y", function(d) {
        if (nutritionValues[i] == "Sodium") {
          return yScale(d.Sodium);
        } else {
          return yScale(d.Cholesterol);
        }
      })
    .attr("height", function(d) {
      if (nutritionValues[i] == "Sodium") {
        return (yScale(0) - yScale(d.Sodium));
      } else {
        return (yScale(0) - yScale(d.Cholesterol));
      }
    })
    .attr("width", 50)
    .attr("fill", "blue");
  }

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

});
