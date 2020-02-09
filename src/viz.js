import _ from "lodash";

Object.byString = function (o, s) {
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

const units = [
  "calories",
  "g",
  "mg",
  "mg",
  "g",
  "g",
  "g",
  "g",
  "mg"
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

export function update(drinkOne, drinkTwo) {
  drawCharts(drinkOne, drinkTwo);
}

function drawCharts(drinkOne, drinkTwo) {

  for (let i = 0; i < ELEMENTS.length; i++) {
    const content = ELEMENTS[i];
    document.getElementById(content).style.width = "30%";
    document.getElementById(content).style.height = "15rem";
    document.getElementById(content).innerHTML = "";
    var w = window.getComputedStyle(document.getElementById(content)).width;
    var h = window.getComputedStyle(document.getElementById(content)).height;

    w = w.substring(0, w.length - 2);
    h = h.substring(0, h.length - 2);
    const padding = w * 0.11;

    const xScale = d3
      .scaleBand()
      .domain(["Drink 1", "Drink 2"])
      .range([padding, w - padding])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const yScale = d3
      .scaleLinear()
      .domain(
      [
        0, Math.max(
        Math.max(
          Object.byString(drinkOne.nutritions[i], content),
          Object.byString(drinkTwo.nutritions[i], content)
        ) +
        Math.max(
          Object.byString(drinkOne.nutritions[i], content),
          Object.byString(drinkTwo.nutritions[i], content)
        ) *
        0.2,
        1)
      ])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom().scale(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft().scale(yScale).tickSizeOuter(0).ticks(6);

    const svg = d3
      .select("#" + content)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("background-color", "white")
      .style("padding", "6px 10px")
      .style( "border-radius", "6px")
      .style("visibility", "hidden");

    if (content == "calories") {
      svg
        .selectAll("rect")
        .data([drinkOne, drinkTwo, drinkOne, drinkTwo])
        .enter()
        .append("rect")
        .attr("x", function (d, j) {
          if (j == 0 || j == 2) {
            return xScale("Drink 1") + xScale.bandwidth() / 4;
          } else {
            return xScale("Drink 2") + xScale.bandwidth() / 4;
          }
        })
        .attr("y", function (d, j) {
          if (j < 2) {
            return yScale(Object.byString(d.nutritions[i], content));
          } else {
            return yScale(Object.byString(d.nutritions[9], "fatCalories"));
          }
        })
        .attr("height", function (d, j) {
          if (j < 2) {
            return yScale(0) - yScale(Object.byString(d.nutritions[i], content));
          } else {
            return yScale(0) - yScale(Object.byString(d.nutritions[9], "fatCalories"));
          }
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("fill", function (d, j) {
          if (j == 0) {
            return "#1a75ff";
          } else if (j == 1) {
            return "#00cc44";
          } else if (j == 2) {
            return "#003380";
          } else {
            return "#006622";
          }
        })
        .on("mouseover", function (d, j) {
          let text = ""
          if (j < 2) {
            text = Object.byString(d.nutritions[i], content) + " " + units[i] + " total";
          } else {
            text = Object.byString(d.nutritions[9], "fatCalories") + " " + units[i] + " from fat";
          }
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
          return tooltip.style("visibility", "visible").text(text)
        })
        .on("mousemove", function () {
          return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');

          return tooltip.style("visibility", "hidden");
        });
    } else if (content == "fat") {
      svg
        .selectAll("rect")
        .data([drinkOne, drinkTwo, drinkOne, drinkTwo, drinkOne, drinkTwo])
        .enter()
        .append("rect")
        .attr("x", function (d, j) {
          if (j == 0 || j == 2 || j == 4) {
            return xScale("Drink 1") + xScale.bandwidth() / 4;
          } else {
            return xScale("Drink 2") + xScale.bandwidth() / 4;
          }
        })
        .attr("y", function (d, j) {
          if (j < 2) {
            return yScale(Object.byString(d.nutritions[i], content));
          } else if (j < 4) {
            return yScale(Object.byString(d.nutritions[10], "transFat"));
          } else {
            return yScale(Object.byString(d.nutritions[11], "satFat"));
          }
        })
        .attr("height", function (d, j) {
          if (j < 2) {
            return yScale(0) - yScale(Object.byString(d.nutritions[i], content));
          } else if (j < 4) {
            return yScale(0) - yScale(Object.byString(d.nutritions[10], "transFat"));
          } else {
            return yScale(Object.byString(d.nutritions[10], "transFat")) - yScale(Object.byString(d.nutritions[11], "satFat"));
          }
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("fill", function (d, j) {
          if (j == 0) {
            return "#1a75ff";
          } else if (j == 1) {
            return "#00cc44";
          } else if (j == 2) {
            return "#001433";
          } else if (j == 3) {
            return "#003311";
          } else if (j == 4) {
            return "#003380";
          } else {
            return "#006622";
          }
        })
        .on("mouseover", function (d, j) {
          let text = ""
          if (j < 2) {
            text = Object.byString(d.nutritions[i], content) + " " + units[i] + " of fat total";
          } else if (j < 4) {
            text = Object.byString(d.nutritions[10], "transFat") + " " + units[i] + " of trans fat";
          } else {
            text = Object.byString(d.nutritions[11], "satFat") + " " + units[i] + " of saturated fat";
          }
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
          return tooltip.style("visibility", "visible").text(text)
        })
        .on("mousemove", function () {
          return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');

          return tooltip.style("visibility", "hidden");
        });
    } else {
      svg
        .selectAll("rect")
        .data([drinkOne, drinkTwo])
        .enter()
        .append("rect")
        .attr("x", function (d, j) {
          if (j == 0) {
            return xScale("Drink 1") + xScale.bandwidth() / 4;
          } else {
            return xScale("Drink 2") + xScale.bandwidth() / 4;
          }
        })
        .attr("y", function (d) {
          return yScale(Object.byString(d.nutritions[i], content));
        })
        .attr("height", function (d) {
          return yScale(0) - yScale(Object.byString(d.nutritions[i], content));
        })
        .attr("width", xScale.bandwidth() / 2)
        .attr("fill", function (d, j) {
          if (j == 0) {
            return "#1a75ff";
          } else {
            return "#00cc44";
          }
        })
        .on("mouseover", function (d) {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
          const text = Object.byString(d.nutritions[i], content) + " " + units[i] + " of " + ELEMENTS[i];
          return tooltip.style("visibility", "visible").text(text)
        })
        .on("mousemove", function () {
          return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
          d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');

          return tooltip.style("visibility", "hidden");
        });
    }

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("id", "y-axis")
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
    };
}
