/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

const generateObj = (obj, arr, val) => {
  if (arr.length === 1) {
    if (val.includes(",")) {
      val = val.split(",");
    }
    obj[arr[0]] = val;
    return;
  }
  if (!obj[arr[0]]) {
    obj[arr[0]] = {};
  }
  const restArr = arr.splice(1);
  generateObj(obj[arr[0]], restArr, val);
};

const getData = id => {
  const genForm = document.getElementById("general_params");
  const genInputCollection = genForm.getElementsByTagName("input");
  const genInputArray = [...genInputCollection];

  const form = document.getElementById(id);
  const inputCollection = form.getElementsByTagName("input");
  const inputArray = [...inputCollection].concat(genInputArray);
  const data = {};
  inputArray.map(input => {
    const { name, value } = input;
    const splitName = name.split(".");
    generateObj(data, splitName, value);
  });
  return data;
};

const metricToggle = document.getElementById("metricToggle");
console.log(metricToggle.value);
$(function() {
  $("#metricToggle").change(function() {
    updateGraphBox(globalData);
    updateGraphEVSI(globalData, sliderPrev.value());
    updateGraphSample(globalData);
  });
});

// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 50, left: 90 },
  width = 600 - margin.left - margin.right,
  boxChartWidth = 400 - margin.left - margin.right
  height = 290 - margin.top - margin.bottom;
var barWidth = 40;

var boxPlotColor = "#898989";
var medianLineColor = "#ffffff";
var axisColor = "#898989";

// the x-axis

// Set the ranges
var xBox = d3
  .scalePoint()
  .rangeRound([0, boxChartWidth])
  .padding([0.5]);
var yBox = d3
  .scaleLinear()
  .range([height, 0])
  .nice();
var xEvsi = d3.scaleLinear().range([0, width]);
var yEvsi = d3.scaleLinear().range([height, 0]);
var xSample = d3.scaleLinear().range([0, width]);
var ySample = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxisBox = d3.axisBottom(xBox);
var yAxisBox = d3.axisLeft(yBox).ticks(6);

var xAxisEvsi = d3.axisBottom(xEvsi).ticks(5);
var yAxisEvsi = d3.axisLeft(yEvsi).ticks(5, "s");
var xAxisSample = d3.axisBottom(xSample).ticks(5);
var yAxisSample = d3.axisLeft(ySample).ticks(5);

// Define the line
var valuelineEvsi = d3
  .line()
  .x(function(d) {
    return xEvsi(d[0]);
  })
  .y(function(d) {
    return yEvsi(d[1]);
  });
var valuelineNet = d3
  .line()
  .x(function(d) {
    return xEvsi(d[0]);
  })
  .y(function(d) {
    return yEvsi(d[1]);
  });
var valuelineSample = d3
  .line()
  .x(function(d) {
    return xSample(d[0]);
  })
  .y(function(d) {
    return ySample(d[1]);
  });

var svgBox = d3
  .select("#boxChartHolder")
  .append("svg")
  .attr("width", boxChartWidth + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + (margin.left - barWidth/2) + "," + margin.top + ")"
  );

var boxTip = d3
  .tip()
  .attr("class", "d3-tip")
  .direction("e")
  .offset([0, 5])
  .html(function(d) {
    var content =
      "<span style='margin-left: 2.5px;'><b>" + d.key + "</b></span><br>";
    content +=
      `
                    <table style="margin-top: 2.5px; background:none;">
                            <tr><td>Max: </td><td style="text-align: right">` +
      d3.format(".2f")(d.whiskers[0]) +
      `</td></tr>
                            <tr><td>Q3: </td><td style="text-align: right">` +
      d3.format(".2f")(d.quartile[0]) +
      `</td></tr>
                            <tr><td>Median: </td><td style="text-align: right">` +
      d3.format(".2f")(d.quartile[1]) +
      `</td></tr>
                            <tr><td>Q1: </td><td style="text-align: right">` +
      d3.format(".2f")(d.quartile[2]) +
      `</td></tr>
                            <tr><td>Min: </td><td style="text-align: right">` +
      d3.format(".2f")(d.whiskers[1]) +
      `</td></tr>
                    </table>
                    `;
    return content;
  });
svgBox.call(boxTip);

//align box with axis
var yAxisBoxContainer = svgBox
  .append("g")
  .attr("transform", "translate(" + 20 + ",0)");
var xAxisBoxContainer = svgBox
  .append("g")
  .attr("transform", "translate(" + 20 + ",0)");

// Adds the svg canvas
var svgEVSI = d3
  .select("#evsiChartHolder")
  .append("svg")
  .attr("id", "evsiChart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// CREATE HOVER TOOLTIP WITH VERTICAL LINE //
var tooltipEvsi = d3
  .select("#evsiChartHolder")
  .append("div")
  .attr("id", "tooltipEvsi")
  .attr("class", "tooltip evsi")
  .style("position", "absolute")
  .style("padding", 6)
  .style("display", "none")
  .style("max-width", "100px");

var mouseGEVSI = svgEVSI.append("g").attr("class", "mouse-over-effects");

var svgNet = d3
  .select("#netEvsiChartHolder")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltipNet = d3
  .select("#netEvsiChartHolder")
  .append("div")
  .attr("id", "tooltipNet")
  .attr("class", "tooltip net")
  .style("position", "absolute")
  .style("padding", 6)
  .style("display", "none")
  .style("max-width", "100px");

var mouseGNet = svgNet.append("g").attr("class", "mouse-over-effects");

var svgSample = d3
  .select("#sampleChartHolder")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltipSample = d3
  .select("#sampleChartHolder")
  .append("div")
  .attr("id", "tooltipSample")
  .attr("class", "tooltip sample")
  .style("position", "absolute")
  .style("padding", 6)
  .style("display", "none")
  .style("max-width", "100px");

var mouseGSample = svgSample.append("g").attr("class", "mouse-over-effects");

var sliderPrev = d3
  .sliderBottom()
  .min(0.05)
  .max(1.0)
  .width(300)
  .tickFormat(d3.format(".2"))
  .ticks(5)
  .step(0.05)
  .default(0.5)
  .on("onchange", val => {
    console.log(val);
    updateGraphEVSI(globalData, val);
  });

var gPrev = d3
  .select("#netPrevSliderHolder")
  .append("svg")
  .attr("width", 500)
  .attr("height", 100)
  .attr("class", "sliderprevholder")
  .append("g")
  .attr("transform", "translate(30,30)")
  .attr("class", "sliderprev");

gPrev.call(sliderPrev);

var sliderPower = d3
  .sliderBottom()
  .min(0)
  .max(1)
  .width(300)
  .tickFormat(d3.format(".2"))
  .ticks(5)
  .step(0.01)
  .default(0.27)
  .on("onchange", val => {
    console.log(val);
    updatePowerLines(globalData, val);
  });

var gPower = d3
  .select("#powerSliderHolder")
  .append("svg")
  .attr("width", 500)
  .attr("height", 100)
  .append("g")
  .attr("transform", "translate(30,30)");

gPower.call(sliderPower);

var globalData;
// Get the data
d3.json("cv_blog_hugo/data/default-response-simple.json").then(function(defaultJson) {
  globalData = defaultJson.data.meta;
  drawGraphBox(globalData);
  drawGraphEVSI(globalData, sliderPrev.value());
  drawGraphSample(globalData);
  drawPowerLines(globalData, sliderPower.value());

  makeTipsSample(globalData);
  makeTipsEvsi(globalData);
});

function xEvsiMax(data) {
  return d3.max(Object.keys(data[getMetric()]), function(d) {
    return Number(d);
  });
}
function yEvsiMax(data) {
  return d3.max(
    Object.values(
      objectMap(
        data[getMetric()],
        val => val * data["total_population"] * sliderPrev.value().toFixed(2)
      )
    ),
    function(d) {
      return Number(d);
    }
  );
}

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

function drawGraphBox(data) {
  var boxData = [];
  boxData[data["name_treatment_1"]] =
    data["decision_model"][getMetric()]["treatment_1"];
  boxData[data["name_treatment_2"]] =
    data["decision_model"][getMetric()]["treatment_2"];

  // Select all values into one Array for axis scaling (min/ max)
  // and sort group counts so quantile methods work
  var globalCounts = [];
  for (var key in boxData) {
    var groupCount = boxData[key];
    boxData[key] = groupCount.sort(sortNumber);
    boxData[key].forEach(element => {
      globalCounts.push(element);
    });
  }

  // Prepare the data for the box plots
  var plotData = [];
  var colorIndex = 0.1;
  var colorIndexStepSize = 0.08;
  for (var [key, groupCount] of Object.entries(boxData)) {
    var record = {};
    var localMin = d3.min(groupCount);
    var localMax = d3.max(groupCount);

    record["key"] = key;
    record["counts"] = groupCount;
    record["quartile"] = boxQuartiles(groupCount);
    record["whiskers"] = [localMax, localMin];
    record["color"] = d3.interpolateInferno(colorIndex);

    plotData.push(record);
    colorIndex += colorIndexStepSize;
  }

  //scale
  xBox.domain(Object.keys(boxData));
  // Compute a global y scale based on the global counts
  var min = d3.min(globalCounts);
  var max = d3.max(globalCounts);
  yBox.domain([min, max]);

  // draw the boxplots
  // Setup the group the box plot elements will render in
  //var g = svgBox.append("g")
  //.attr("transform", "translate(20,0)");

  // Draw the box plot vertical lines
  var verticalLines = svgBox
    .selectAll(".verticalLines")
    .data(plotData)
    .enter()
    .append("line")
    .attr("class","verticalLines")
    .attr("x1", d => {
      return xBox(d.key) + barWidth / 2;
    })
    .attr("y1", d => {
      return yBox(d.whiskers[0]);
    })
    .attr("x2", d => {
      return xBox(d.key) + barWidth / 2;
    })
    .attr("y2", d => {
      return yBox(d.whiskers[1]);
    })
    .attr("stroke", boxPlotColor)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "5,5")
    .attr("fill", "none");

  // Draw the boxes of the box plot, filled in white and on top of vertical lines
  var rects = svgBox
    .selectAll("rect")
    .data(plotData)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", d => {
      return yBox(d.quartile[2]) - yBox(d.quartile[0]);
    })
    .attr("x", d => {
      return xBox(d.key);
    })
    .attr("y", d => {
      return yBox(d.quartile[0]);
    })
    .attr("fill", d => {
      return d.color;
    })
    .attr("stroke", boxPlotColor)
    .attr("stroke-width", 1)
    .on("mouseover", boxTip.show)
    .on("mouseout", boxTip.hide);

  // Config for whiskers and median
  var horizontalLineConfigs = [
    {
      // Top whisker
      class: "top",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.whiskers[0]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.whiskers[0]);
      },
      color: boxPlotColor
    },
    {
      // Median
      class: "med",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.quartile[1]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.quartile[1]);
      },
      color: medianLineColor
    },
    {
      // Bottom whisker
      class: "bot",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.whiskers[1]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.whiskers[1]);
      },
      color: boxPlotColor
    }
  ];

  // Draw the whiskers and median line
  for (var i = 0; i < horizontalLineConfigs.length; i++) {
    var lineConfig = horizontalLineConfigs[i];
    var horizontalLine = svgBox
      .selectAll(".whiskers")
      .data(plotData)
      .enter()
      .append("line")
      .attr("class", "whiskaas " + lineConfig.class)
      .attr("x1", lineConfig.x1)
      .attr("y1", lineConfig.y1)
      .attr("x2", lineConfig.x2)
      .attr("y2", lineConfig.y2)
      .attr("stroke", lineConfig.color)
      .attr("stroke-width", 1)
      .attr("fill", "none");
  }

  // add the Y gridlines
  //svgBox.append("g")
  //  .attr("transform", "translate(40,0)")
  //.attr("class", "grid")
  //.call(d3.axisLeft(yBox)
  //    .tickSize(-width)
  //    .tickFormat("")
  //)

  // draw y axis
  yAxisBoxContainer
    .append("g")
    .attr("class", "y axis box")
    .call(yAxisBox);

  yAxisBoxContainer.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 3*margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text y axis label")
      .text(getMetricPretty());


  // draw x axis
  xAxisBoxContainer
    .append("g")
    .attr("class", "x axis box")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisBox);

  // draw title
  svgBox.append("text")
    .attr("x", boxChartWidth / 2 )
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .attr("class", "chart title text")
    .text("Expected Outcomes in Each Treatment Arm")
}

function drawGraphEVSI(data, prev) {
  prev = prev.toFixed(2);
  // Scale the range of the data again
  xEvsi.domain([0, xNetMax(data)]);
  yEvsi.domain([0, yEvsiMax(data)]);

  // Add the valueline path.
  svgEVSI
    .append("path")
    .datum(
      Object.entries(
        objectMap(
          data[getMetric()],
          val => val * data["total_population"] * sliderPrev.value().toFixed(2)
        )
      )
    )
    .attr("class", "lineEVSI")
    .style("stroke-dasharray","5,5")
    .attr("d", valuelineEvsi);

  // Add the X Axis
  svgEVSI
    .append("g")
    .attr("class", "x axis evsi")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisEvsi);

  svgEVSI.append("text")
      .attr("x",  width/2)
      .attr("y", height+margin.top/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text x axis label")
      .text("Study Size");

  // Add the Y Axis
  svgEVSI
    .append("g")
    .attr("class", "y axis evsi")
    .call(yAxisEvsi);

  svgEVSI.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 3*margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text y axis label evsi")
      .text(getMetricPretty());

    // draw title
  svgEVSI.append("text")
    .attr("x", width / 2 )
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .attr("class", "chart title text")
    .text("Expected Value of Sample Information")

  svgEVSI
    .append("path")
    .datum(Object.entries(data["net_evsi"][getMetric()][prev]))
    .attr("class", "lineNetEVSI")
    .attr("d", valuelineNet);

  var lines = ["EVSI", "EVSI after study costs", "Study size from power calculation"]
  var ordinalDash = d3.scaleOrdinal()
  .domain(lines)
  .range([ "5,5", "0,0", "0,0"]);
  var ordinalColor = d3.scaleOrdinal()
  .domain(lines)
  .range([ "#a51c30", "#a51c30", "#A9A9A9"]);
var legend = svgEVSI.selectAll(".legend")
      .data(lines)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + (2*height/3+ (i * 20)) +  ")"; });

  legend.append("line")
      .attr("x1", width - 28)
      .attr("x2", width)
      .attr("y1", 10)
      .attr("y2", 10)
      .style("stroke-dasharray",ordinalDash)
      .style("stroke-width", 2)
      .style("stroke", ordinalColor);

  legend.append("text")
      .attr("x", width - 44)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("class", "chart title text")
      .style("text-anchor", "end")
      .text(function(d) { return d; });


}

function xNetMax(data) {
  return d3.max(Object.keys(data[getMetric()]), function(d) {
    return Number(d);
  });
}
function yNetMax(data) {
  return d3.max(
    Object.values(data["net_evsi"][getMetric()][sliderPrev.value().toFixed(2)]),
    function(d) {
      return Number(d);
    }
  );
}


function xSampleMax(data) {
  return d3.max(Object.keys(data["optimal_study"][getMetric()]), function(d) {
    return Number(d);
  });
}
function ySampleMax(data) {
  return d3.max(Object.values(data["optimal_study"][getMetric()]), function(d) {
    return Number(d);
  });
}
function drawGraphSample(data) {
  console.log("here");
  // Scale the range of the data again
  xSample.domain([0, 1]);
  ySample.domain([0, ySampleMax(data)]);

  // Add the valueline path.
  svgSample
    .append("path")
    .datum(Object.entries(data["optimal_study"][getMetric()]))
    .attr("class", "lineSample")
    .attr("d", valuelineSample);
  // Add the X Axis
  svgSample
    .append("g")
    .attr("class", "x axis sample")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisSample);

  // Add the Y Axis
  svgSample
    .append("g")
    .attr("class", "y axis sample")
    .call(yAxisSample);

  svgSample.append("text")
      .attr("x",  width/2)
      .attr("y", height+margin.top/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text x axis label")
      .text("True Prevalence of Subpopulation");


  svgSample.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 3*margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text y axis label evsi")
      .text("Optimal Study Size");

    // draw title
  svgSample.append("text")
    .attr("x", width / 2 )
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .attr("class", "chart title text")
    .text("Optimal Study Size")

  var lines = ["Study size from EVSI calculation", "Study size from power calculation"]
  var ordinalDash = d3.scaleOrdinal()
  .domain(lines)
  .range([ "0,0", "0,0"]);
  var ordinalColor = d3.scaleOrdinal()
  .domain(lines)
  .range([ "#a51c30", "#A9A9A9"]);
var legend = svgSample.selectAll(".legend")
      .data(lines)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + (3*height/4+ (i * 20)) +  ")"; });

  legend.append("line")
      .attr("x1", width - 28)
      .attr("x2", width)
      .attr("y1", 10)
      .attr("y2", 10)
      .style("stroke-dasharray",ordinalDash)
      .style("stroke-width", 2)
      .style("stroke", ordinalColor);

  legend.append("text")
      .attr("x", width - 44)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("class", "chart title text")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

}

function drawPowerLines(data, event_prob) {
  svgEVSI
    .append("line") // vertical powerline
    .attr("class", "power-line net")
    .style("stroke", "#A9A9A9")
    .style("stroke-width", 2);

  svgSample
    .append("line") // horizontal powerline
    .attr("class", "power-line sample")
    .style("stroke", "#A9A9A9")
    .style("stroke-width", 2);

  updatePowerLines(data, event_prob);
}

function updatePowerLines(data, event_prob) {
  event_prob = event_prob.toFixed(2);
  var sampleSize = data["power_calculation"][event_prob];
  var svg = d3.select("body").transition();

  svg
    .select(".power-line.net")
    .attr("x1", xEvsi(sampleSize))
    .attr("y1", yEvsi(0))
    .attr("x2", xEvsi(sampleSize))
    .attr("y2", yEvsi(yEvsiMax(data)));

  svg
    .select(".power-line.sample")
    .attr("x1", xSample(0))
    .attr("y1", ySample(sampleSize))
    .attr("x2", xSample(1))
    .attr("y2", ySample(sampleSize));
}

function updateGraphBox(data) {
  var boxData = [];
  boxData[data["name_treatment_1"]] =
    data["decision_model"][getMetric()]["treatment_1"];
  boxData[data["name_treatment_2"]] =
    data["decision_model"][getMetric()]["treatment_2"];

  // Select all values into one Array for axis scaling (min/ max)
  // and sort group counts so quantile methods work
  var globalCounts = [];
  for (var key in boxData) {
    var groupCount = boxData[key];
    boxData[key] = groupCount.sort(sortNumber);
    boxData[key].forEach(element => {
      globalCounts.push(element);
    });
  }

  // Prepare the data for the box plots
  var plotData = [];
  var colorIndex = 0.1;
  var colorIndexStepSize = 0.08;
  for (var [key, groupCount] of Object.entries(boxData)) {
    var record = {};
    var localMin = d3.min(groupCount);
    var localMax = d3.max(groupCount);

    record["key"] = key;
    record["counts"] = groupCount;
    record["quartile"] = boxQuartiles(groupCount);
    record["whiskers"] = [localMax, localMin];
    record["color"] = d3.interpolateInferno(colorIndex);

    plotData.push(record);
    colorIndex += colorIndexStepSize;
  }

  //scale
  xBox.domain(Object.keys(boxData));
  // Compute a global y scale based on the global counts
  var min = d3.min(globalCounts);
  var max = d3.max(globalCounts);
  yBox.domain([min, max]);
  var svgBoxMover = d3.select("body").transition();
  // draw the boxplots
  // Setup the group the box plot elements will render in
  //var g = svgBox.append("g")
  //.attr("transform", "translate(20,0)");

  // Draw the box plot vertical lines
  var verticalLines = svgBox
    .selectAll(".verticalLines")
    .data(plotData)
    .transition(d3.transition(750))
    .attr("x1", d => {
      return xBox(d.key) + barWidth / 2;
    })
    .attr("y1", d => {
      return yBox(d.whiskers[0]);
    })
    .attr("x2", d => {
      return xBox(d.key) + barWidth / 2;
    })
    .attr("y2", d => {
      return yBox(d.whiskers[1]);
    })
    .attr("stroke", boxPlotColor)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "5,5")
    .attr("fill", "none");

  // Draw the boxes of the box plot, filled in white and on top of vertical lines
  var rects = svgBox
    .selectAll("rect")
    .data(plotData)
    .transition(d3.transition(750))
    .attr("width", barWidth)
    .attr("height", d => {
      return yBox(d.quartile[2]) - yBox(d.quartile[0]);
    })
    .attr("x", d => {
      return xBox(d.key);
    })
    .attr("y", d => {
      return yBox(d.quartile[0]);
    })
    .attr("fill", d => {
      return d.color;
    })
    .attr("stroke", boxPlotColor)
    .attr("stroke-width", 1);

  // Config for whiskers and median
  var horizontalLineConfigs = [
    {
      // Top whisker
      class: "top",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.whiskers[0]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.whiskers[0]);
      },
      color: boxPlotColor
    },
    {
      // Median
      class: "med",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.quartile[1]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.quartile[1]);
      },
      color: medianLineColor
    },
    {
      // Bottom whisker
      class: "bot",
      x1: d => {
        return xBox(d.key);
      },
      y1: d => {
        return yBox(d.whiskers[1]);
      },
      x2: d => {
        return xBox(d.key) + barWidth;
      },
      y2: d => {
        return yBox(d.whiskers[1]);
      },
      color: boxPlotColor
    }
  ];

  // Draw the whiskers and median line
  for (var i = 0; i < horizontalLineConfigs.length; i++) {
    var lineConfig = horizontalLineConfigs[i];
    var horizontalLine = svgBox
      .selectAll(".whiskaas."+lineConfig.class)
      .data(plotData)
      .transition(d3.transition(750))
      .attr("x1", lineConfig.x1)
      .attr("y1", lineConfig.y1)
      .attr("x2", lineConfig.x2)
      .attr("y2", lineConfig.y2)
      .attr("stroke", lineConfig.color)
      .attr("stroke-width", 1)
      .attr("fill", "none");
  }

  // add the Y gridlines
  //svgBox.append("g")
  //  .attr("transform", "translate(40,0)")
  //.attr("class", "grid")
  //.call(d3.axisLeft(yBox)
  //    .tickSize(-width)
  //    .tickFormat("")
  //)

  // draw y axis
  svgBoxMover
    .select(".y.axis.box") // change the x axis
    .duration(750)
    .call(yAxisBox);

  svgBoxMover.select(".y.axis.label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 3*margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text y axis label")
      .text(getMetricPretty());

  // draw x axis
  svgBoxMover
    .select(".x.axis.box") // change the x axis
    .duration(750)
    .call(xAxisBox);
}

function updateGraphEVSI(data, prev) {
  prev = prev.toFixed(2);
  // Scale the range of the data again
  xEvsi.domain([0, xNetMax(data)]);
  yEvsi.domain([0, yEvsiMax(data)]);
  // Select the section we want to apply our changes to
  var svgEVSI = d3.select("body").transition();

  // Make the changes
  svgEVSI
    .select(".lineEVSI") // change the line
    .duration(750)
    .attr(
      "d",
      valuelineEvsi(
        Object.entries(
          objectMap(
            data[getMetric()],
            val =>
              val * data["total_population"] * sliderPrev.value().toFixed(2)
          )
        )
      )
    );
  svgEVSI
    .select(".x.axis.evsi") // change the x axis
    .duration(750)
    .call(xAxisEvsi);
  svgEVSI
    .select(".y.axis.evsi") // change the y axis
    .duration(750)
    .call(yAxisEvsi);

  // draw y axis


  svgEVSI.select(".y.axis.label.evsi").duration(750)
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 3*margin.left/4)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart title text y axis label evsi")
      .text(getMetricPretty());

  svgEVSI
    .select(".lineNetEVSI") // change the line
    .duration(750)
    .attr(
      "d",
      valuelineNet(Object.entries(data["net_evsi"][getMetric()][prev]))
    );

  mouseGEVSI
    .selectAll(".mouse-per-line")
    .data([
      Object.entries(
        objectMap(
          data[getMetric()],
          val => val * data["total_population"] * sliderPrev.value().toFixed(2)
        )
      )
    ]);

  mouseGEVSI.on("mousemove", function() {
    var mouse = d3.mouse(this);
    updateTooltipContentEvsi(
      mouse,
      Object.entries(
        objectMap(
          data[getMetric()],
          val => val * data["total_population"] * sliderPrev.value().toFixed(2)
        )
      )
    );
  });
}

function updateGraphSample(data) {
  // Scale the range of the data again
  xSample.domain([
    0,
    1
  ]);
  ySample.domain([
    0,
    d3.max(Object.values(data["optimal_study"][getMetric()]), function(d) {
      return d;
    })
  ]);

  // Select the section we want to apply our changes to
  var svgSample = d3.select("body").transition();

  // Make the changes
  svgSample
    .select(".lineSample") // change the line
    .duration(750)
    .attr(
      "d",
      valuelineSample(Object.entries(data["optimal_study"][getMetric()]))
    );
  svgSample
    .select(".x.axis.sample") // change the x axis
    .duration(750)
    .call(xAxisSample);
  svgSample
    .select(".y.axis.sample") // change the y axis
    .duration(750)
    .call(yAxisSample);
  mouseGSample
    .selectAll(".mouse-per-line")
    .data([Object.entries(data["optimal_study"][getMetric()])]);

  mouseGSample.on("mousemove", function() {
    var mouse = d3.mouse(this);
    updateTooltipContentSample(
      mouse,
      Object.entries(data["optimal_study"][getMetric()])
    );
  });
}

function getMetric() {
  if (metricToggle.checked) {
    return "nmb";
  } else {
    return "qaly";
  }
}

function getMetricPretty() {
  if (metricToggle.checked) {
    return "Net Monetary Benefit (USD)";
  } else {
    return "QALYs";
  }
}

function updateData() {
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  var theUrl = "https://clinicalvoi.herokuapp.com/evsi";
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.onload = function(e) {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        loopTask(xmlhttp.responseText);
      } else {
        console.error(xmlhttp.statusText);
      }
    }
  };
  xmlhttp.onerror = function(e) {
    console.error(xmlhttp.statusText);
  };
  xmlhttp.send(JSON.stringify(getData("subpop1")));
}

function loopTask(taskId) {
  console.log(taskId);
  // trim quotes
  url = "https://clinicalvoi.herokuapp.com/tasks/" + taskId.slice(1, -2);
  console.log(url);
  var newMin = Number(document.getElementsByName("prevalence.min")[0].value)
  var newMax = Number(document.getElementsByName("prevalence.max")[0].value)
  var ticks = Math.min((newMax-newMin)/0.05, 5)
  console.log(ticks)
  sliderPrev = d3
  .sliderBottom()
  .min(newMin)
  .max(newMax)
  .width(300)
  .tickFormat(d3.format(".2"))
  .ticks(ticks)
  .step(0.05)
  .on("onchange", val => {
    console.log(val);
    updateGraphEVSI(globalData, val);
  });

  d3
  .select(".sliderprev").remove();

  d3
  .select(".sliderprevholder").append("g")
  .attr("transform", "translate(30,30)")
  .attr("class", "sliderprev").call(sliderPrev);


  var interval = setInterval(function() {
    d3.json(url, {
      method: "GET",
      mode: "cors"
    }).then(data => {
      if (data.data.meta.progress > 0) {
        globalData = data.data.meta;
        updateGraphBox(globalData);
        updateGraphEVSI(globalData, sliderPrev.value());
        updateGraphSample(globalData);
        updatePowerLines(globalData, sliderPower.value());
      }
      if (data.data.task_status == "finished") {
        clearInterval(interval);
      }
    });
  }, 3000);
}

function updateTooltipContentEvsi(mouse, data) {
  // use 'invert' to get distance from mouse position relative to svg
  var xPos = xEvsi.invert(mouse[0]);
  var bisect = d3.bisector(function(d) {
    return Number(d[0]);
  }).left; // retrieve index in data
  var idx = bisect(data, xPos);

  if (idx > 1) {
    var leftData = Number(data[idx - 1][0]);
    var rightData = Number(data[idx][0]);
    var closest =
      xPos - leftData > rightData - xPos ? data[idx] : data[idx - 1];
  } else {
    var closest = data[idx];
  }

  tooltipEvsi
    .html(
      "A study size of " +
        closest[0] +
        " has a population net value of " +
        closest[1].toFixed(2) +
        " " +
        getMetric() +
        " at subpopulation prevalence " +
        sliderPrev.value().toFixed(2)
    )

    .style("left", d3.event.pageX + 20 + "px")
    .style("top", d3.event.pageY - 20 + "px")
    .style("display", "inline")
    .style("font-size", 11.5);
}

function makeTipsEvsi(data) {
  mouseGEVSI
    .append("path") // create vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "#A9A9A9")
    .style("stroke-width", 2)
    .style("opacity", "0");

  var lines = document.getElementsByClassName("line");

  var mousePerLine = mouseGEVSI
    .selectAll(".mouse-per-line")
    .data([
      Object.entries(
        objectMap(
          data[getMetric()],
          val => val * data["total_population"] * sliderPrev.value().toFixed(2)
        )
      )
    ])
    .enter()
    .append("g")
    .attr("class", "mouse-per-line evsi");

  mousePerLine
    .append("circle")
    .attr("r", 4)
    .style("stroke", function(d) {
      return "#A9A9A9";
    })
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("opacity", "0");

  mouseGEVSI
    .append("svg:rect") // append a rect to catch mouse movements on canvas
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function() {
      // on mouse out hide line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line circle").style("opacity", "0");
      d3.selectAll(".mouse-per-line text").style("opacity", "0");
      d3.selectAll(".tooltip").style("display", "none");
    })
    .on("mouseover", function() {
      // on mouse in show line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line,.evsi circle").style("opacity", "1");
      d3.selectAll(".tooltip evsi").style("display", "inline");
    })
    .on("mousemove", function() {
      // update tooltip content, line, circles and text when mouse moves
      var mouse = d3.mouse(this);
      d3.selectAll(".mouse-per-line.evsi").attr("transform", function(d, i) {
        // use 'invert' to get distance from mouse position relative to svg
        var xPos = xEvsi.invert(mouse[0]);
        var bisect = d3.bisector(function(d) {
          return Number(d[0]);
        }).left; // retrieve index in data
        var idx = bisect(d, xPos);

        if (idx > 1) {
          var leftData = Number(d[idx - 1][0]);
          var rightData = Number(d[idx][0]);
          var closest =
            xPos - leftData > rightData - xPos ? d[idx] : d[idx - 1];
        } else {
          var closest = d[idx];
        }

        d3.select(".mouse-line").attr("d", function() {
          var data = "M" + xEvsi(Number(closest[0])) + "," + height;
          data += " " + xEvsi(Number(closest[0])) + "," + 0;
          return data;
        });
        return (
          "translate(" +
          xEvsi(Number(closest[0])) +
          "," +
          yEvsi(Number(closest[1])) +
          ")"
        );
      });
      updateTooltipContentEvsi(
        mouse,
        Object.entries(
          objectMap(
            data[getMetric()],
            val =>
              val * data["total_population"] * sliderPrev.value().toFixed(2)
          )
        )
      );
    });
}

function updateTooltipContentNet(mouse, data) {
  // use 'invert' to get distance from mouse position relative to svg
  var xPos = xNet.invert(mouse[0]);
  var bisect = d3.bisector(function(d) {
    return Number(d[0]);
  }).left; // retrieve index in data
  var idx = bisect(data, xPos);

  if (idx > 1) {
    var leftData = Number(data[idx - 1][0]);
    var rightData = Number(data[idx][0]);
    var closest =
      xPos - leftData > rightData - xPos ? data[idx] : data[idx - 1];
  } else {
    var closest = data[idx];
  }

  tooltipNet
    .html(
      "A study size of " +
        closest[0] +
        " has a population net value of " +
        closest[1].toFixed(2) +
        " " +
        getMetric() +
        " at subpopulation prevalence " +
        sliderPrev.value().toFixed(2)
    )

    .style("left", d3.event.pageX + 20 + "px")
    .style("top", d3.event.pageY - 20 + "px")
    .style("display", "inline")
    .style("font-size", 11.5);
}

function makeTipsNet(data) {
  mouseGNet
    .append("path") // create vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "#A9A9A9")
    .style("stroke-width", 2)
    .style("opacity", "0");

  var lines = document.getElementsByClassName("line");

  var mousePerLine = mouseGNet
    .selectAll(".mouse-per-line")
    .data([
      Object.entries(
        data["net_evsi"][getMetric()][sliderPrev.value().toFixed(2)]
      )
    ])
    .enter()
    .append("g")
    .attr("class", "mouse-per-line net");

  mousePerLine
    .append("circle")
    .attr("r", 4)
    .style("stroke", function(d) {
      return "#A9A9A9";
    })
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("opacity", "0");

  mouseGNet
    .append("svg:rect") // append a rect to catch mouse movements on canvas
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function() {
      // on mouse out hide line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line circle").style("opacity", "0");
      d3.selectAll(".mouse-per-line text").style("opacity", "0");
      d3.selectAll(".tooltip").style("display", "none");
    })
    .on("mouseover", function() {
      // on mouse in show line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line,.net circle").style("opacity", "1");
      d3.selectAll(".tooltip net").style("display", "inline");
    })
    .on("mousemove", function() {
      // update tooltip content, line, circles and text when mouse moves
      var mouse = d3.mouse(this);
      d3.selectAll(".mouse-per-line.net").attr("transform", function(d, i) {
        // use 'invert' to get distance from mouse position relative to svg
        var xPos = xNet.invert(mouse[0]);
        var bisect = d3.bisector(function(d) {
          return Number(d[0]);
        }).left; // retrieve index in data
        var idx = bisect(d, xPos);

        if (idx > 1) {
          var leftData = Number(d[idx - 1][0]);
          var rightData = Number(d[idx][0]);
          var closest =
            xPos - leftData > rightData - xPos ? d[idx] : d[idx - 1];
        } else {
          var closest = d[idx];
        }

        d3.select(".mouse-line").attr("d", function() {
          var data = "M" + xNet(Number(closest[0])) + "," + height;
          data += " " + xNet(Number(closest[0])) + "," + 0;
          return data;
        });
        return (
          "translate(" +
          xNet(Number(closest[0])) +
          "," +
          yNet(Number(closest[1])) +
          ")"
        );
      });

      updateTooltipContentNet(
        mouse,
        Object.entries(data["net_evsi"][getMetric()][sliderPrev.value()])
      );
    });
}

function updateTooltipContentSample(mouse, data) {
  // use 'invert' to get distance from mouse position relative to svg
  var xPos = xSample.invert(mouse[0]);
  var bisect = d3.bisector(function(d) {
    return Number(d[0]);
  }).left; // retrieve index in data
  var idx = bisect(data, xPos);

  if (idx > 1) {
    var leftData = Number(data[idx - 1][0]);
    var rightData = Number(data[idx][0]);
    var closest =
      xPos - leftData > rightData - xPos ? data[idx] : data[idx - 1];
  } else {
    var closest = data[idx];
  }

  tooltipSample
    .html(
      "A subpopulation prevalence of " +
        closest[0] +
        " corresponds to an optimal study size of " +
        closest[1]
    )

    .style("left", d3.event.pageX + 20 + "px")
    .style("top", d3.event.pageY - 20 + "px")
    .style("display", "inline")
    .style("font-size", 11.5);
}

function makeTipsSample(data) {
  mouseGSample
    .append("path") // create vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "#A9A9A9")
    .style("stroke-width", 2)
    .style("opacity", "0");

  var lines = document.getElementsByClassName("line");

  var mousePerLine = mouseGSample
    .selectAll(".mouse-per-line")
    .data([Object.entries(data["optimal_study"][getMetric()])])
    .enter()
    .append("g")
    .attr("class", "mouse-per-line sample");

  mousePerLine
    .append("circle")
    .attr("class", "sample")
    .attr("r", 4)
    .style("stroke", function(d) {
      return "#A9A9A9";
    })
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("opacity", "0");

  mouseGSample
    .append("svg:rect") // append a rect to catch mouse movements on canvas
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseout", function() {
      // on mouse out hide line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line circle").style("opacity", "0");
      d3.selectAll(".mouse-per-line text").style("opacity", "0");
      d3.selectAll(".tooltip").style("display", "none");
    })
    .on("mouseover", function() {
      // on mouse in show line, circles and text
      d3.select(".mouse-line").style("opacity", "0");
      d3.selectAll(".mouse-per-line,.sample circle").style("opacity", "1");
      d3.selectAll(".tooltip sample").style("display", "inline");
    })
    .on("mousemove", function() {
      // update tooltip content, line, circles and text when mouse moves
      var mouse = d3.mouse(this);
      d3.selectAll(".mouse-per-line.sample").attr("transform", function(d, i) {
        // use 'invert' to get distance from mouse position relative to svg
        var xPos = xSample.invert(mouse[0]);
        var bisect = d3.bisector(function(d) {
          return Number(d[0]);
        }).left; // retrieve index in data
        var idx = bisect(d, xPos);

        if (idx > 1) {
          var leftData = Number(d[idx - 1][0]);
          var rightData = Number(d[idx][0]);
          var closest =
            xPos - leftData > rightData - xPos ? d[idx] : d[idx - 1];
        } else {
          var closest = d[idx];
        }

        d3.select(".mouse-line").attr("d", function() {
          var data = "M" + xSample(Number(closest[0])) + "," + height;
          data += " " + xSample(Number(closest[0])) + "," + 0;
          return data;
        });
        return (
          "translate(" +
          xSample(Number(closest[0])) +
          "," +
          ySample(Number(closest[1])) +
          ")"
        );
      });

      updateTooltipContentSample(
        mouse,
        Object.entries(data["optimal_study"][getMetric()])
      );
    });
}

// Quartile definition
function boxQuartiles(d) {
  return [d3.quantile(d, 0.75), d3.quantile(d, 0.5), d3.quantile(d, 0.25)];
}
// Perform a numeric sort on an array
function sortNumber(a, b) {
  return a - b;
}
