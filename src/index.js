var w = 600;
var h = 300;
var padding = 40;

var dataset = [
  ["Sodium", 2],
  ["Cholesterol", 1]
];

var xScale = d3.scaleBand()
  .domain(["Sodium", "Cholesterol"])
  .range([padding, w - padding])
  .paddingInner(0.1);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  .range([h-padding, 0])

var xAxis = d3.axisBottom().scale(xScale);
var yAxis = d3.axisLeft().scale(yScale);

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return xScale(d[0]);
  })
  .attr("y", function(d) {
    return yScale(d[1]);
  })
  .attr("height", function(d) {
    return (yScale(0) - yScale(d[1]));
  })
  .attr("width", 50)
  .attr("fill", "blue");

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);
