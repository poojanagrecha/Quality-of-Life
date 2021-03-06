// $(document).ready(function () {
//   // readSource();
//   $("#selDataset").on("change", function () {
//     var activeIndicator = $("#selDataset").val();
//     $("#my_dataviz1").empty();
//     buildHeader(activeIndicator);
//   });
// });

function buildHeader(activeIndicator, score) {
  $("#description-text").empty();
  $("#description-text").append(
    `<h1><b>${activeIndicator}</b></h1>
    <h6>This is a visual representation of ${activeIndicator} scores, the city's average score is ${score}/10</h6>`
  );
}
var margin = { top: 100, right: 100, bottom: 100, left: 100 },
  width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
  height = Math.min(
    width,
    window.innerHeight - margin.top - margin.bottom - 20
  );

function RadarChart(id, data, options) {
  var cfg = {
    // width and height for the circle
    w: 600,
    h: 600,

    //The margins of the SVG
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    levels: 3,
    maxValue: 0,
    labelFactor: 1.25,
    wrapWidth: 60,
    opacityArea: 0.35,
    dotRadius: 4,
    opacityCircles: 0.1,
    strokeWidth: 2,
    roundStrokes: false,
    color: function () {
      c = [
        "lightsteelblue",
        "coral",
        "saddlebrown",
        "mediumaquamarine",
        "deeppink",
        "indigo",
        "blueviolet",
        "darkgoldenrod",
        "darkmagenta",
      ];
      m = c.length - 1;
      x = parseInt(Math.random() * 100);
      //Get a random color
      return c[x % m];
    },
  };

  //Put all of the options into a variable called cfg
  if ("undefined" !== typeof options) {
    for (var i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    }
  }

  //If the supplied maxValue is smaller than the actual one, replace by the max in the data
  var maxValue = Math.max(
    cfg.maxValue,
    d3.max(data, function (i) {
      return d3.max(
        i.map(function (o) {
          return o.value;
        })
      );
    })
  );

  var allAxis = data[0].map(function (i, j) {
      return i.axis;
    }), //Names of each axis
    total = allAxis.length, //The number of different axes
    radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
    // Format = d3.format("%"), //Percentage formatting
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  //Scale for the radius
  var rScale = d3.scale.linear().range([0, radius]).domain([0, maxValue]);

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////

  //Remove whatever chart with the same id/class was present before
  d3.select(id).select("svg").remove();

  //Initiate the radar chart SVG
  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id);
  //Append a g element
  var g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (cfg.w / 2 + cfg.margin.left) +
        "," +
        (cfg.h / 2 + cfg.margin.top) +
        ")"
    );

  /////////////////////////////////////////////////////////
  ////////// Glow filter for some extra pizzazz ///////////
  /////////////////////////////////////////////////////////

  //Filter for the outside glow
  var filter = g.append("defs").append("filter").attr("id", "glow"),
    feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur"),
    feMerge = filter.append("feMerge"),
    feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
    feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  /////////////////////////////////////////////////////////
  /////////////// Draw the Circular grid //////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  var axisGrid = g.append("g").attr("class", "axisWrapper");

  //Draw the background circles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", function (d, i) {
      return (radius / cfg.levels) * d;
    })
    .style("fill", "#CDCDCD")
    .style("stroke", "#CDCDCD")
    .style("fill-opacity", cfg.opacityCircles)
    .style("filter", "url(#glow)");

  //Text indicating at what each level is
  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", 4)
    .attr("y", function (d) {
      return (-d * radius) / cfg.levels;
    })
    .attr("dy", "0.4em")
    .style("font-size", "10px")
    .attr("fill", "#737373")
    .text(function (d, i) {
      return (maxValue * d) / cfg.levels;
    });

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Create the straight lines radiating outward from the center
  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");
  //Append the lines
  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("y2", function (d, i) {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  //Append the labels at each axis
  axis
    .append("text")
    .attr("class", "legend")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", function (d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.cos(angleSlice * i - Math.PI / 2)
      );
    })
    .attr("y", function (d, i) {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.sin(angleSlice * i - Math.PI / 2)
      );
    })
    .text(function (d) {
      return d;
    })
    .call(wrap, cfg.wrapWidth);

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  var radarLine = d3
    .lineRadial()
    .curve(d3.curveLinearClose)
    .curve(d3.curveLinear)
    .radius(function (d) {
      return rScale(d.value);
    })
    .angle(function (d, i) {
      return i * angleSlice;
    });

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
  }

  //Create a wrapper for the blobs
  var blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  //Append the backgrounds
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("fill", function (d, i) {
      return cfg.color(i);
    })
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function (d, i) {
      //Dim all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", 0.1);
      //Bring back the hovered over blob
      d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
    })
    .on("mouseout", function () {
      //Bring back all blobs
      d3.selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function (d, i) {
      return radarLine(d);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function (d, i) {
      return cfg.color(i);
    })
    .style("fill", "none")
    .style("filter", "url(#glow)");

  //Append the circles
  blobWrapper
    .selectAll(".radarCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", 0)
    .attr("cy", 0)
    .merge(blobWrapper)
    .transition()
    .duration(2000)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", function (d, i, j) {
      return cfg.color(j);
    })
    .style("fill-opacity", 0.8);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  //Wrapper for the invisible circles on top
  var blobCircleWrapper = g
    .selectAll(".radarCircleWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarCircleWrapper");

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll(".radarInvisibleCircle")
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarInvisibleCircle")
    .attr("r", cfg.dotRadius * 1.5)
    .attr("cx", function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function (d, i) {
      newX = parseFloat(d3.select(this).attr("cx")) - 10;
      newY = parseFloat(d3.select(this).attr("cy")) - 10;

      tooltip
        .attr("x", newX)
        .attr("y", newY)
        .text(parseFloat(d.value).toFixed(2))
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });

  //Set up the small tooltip for when you hover over a circle
  var tooltip = g.append("text").attr("class", "tooltip").style("opacity", 0);

  /////////////////////////////////////////////////////////
  /////////////////// Helper Function /////////////////////
  /////////////////////////////////////////////////////////

  //Taken from http://bl.ocks.org/mbostock/7555321
  //Wraps SVG text
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  }
}
var csvData;
d3.csv("/data/Allinclusive.csv")
  .then(function (scoreData) {
    csvData = scoreData;
    // scoreData.forEach(function (d) {
    //   d.Cost_of_Living = +d.Cost_of_Living;
    //   d.Economy = +d.Economy;
    //   d.Education = +d.Education;
    //   d.Environmental_Quality = +d.Environmental_Quality;
    //   d.Healthcare = +d.Healthcare;
    //   d.Housing = +d.Housing;
    //   d.Internet_Access = +d.Internet_Access;
    //   d.Outdoors = +d.Outdoors;
    //   d.Safety = +d.Safety;
    //   d.Startups = +d.Startups;
    //   d.Taxation = +d.Taxation;
    //   d.Tolerance = +d.Tolerance;
    //   d.Travel_Connectivity = +d.Travel_Connectivity;
    //   d.Leisure = +d.Leisure;
    // });

    var graphScoreData = scoreData.map((dataItem) => {
      return [
        {
          axis: "Cost of Living",
          value: +dataItem.Cost_of_Living,
          name: dataItem.City,
        },
        { axis: "Education", value: +dataItem.Education },
        {
          axis: "Environmental Quality",
          value: +dataItem.Environmental_Quality,
        },
        { axis: "Healthcare", value: +dataItem.Healthcare },
        { axis: "Housing", value: +dataItem.Housing },
        { axis: "Safety", value: +dataItem.Safety },
        { axis: "Taxation", value: +dataItem.Taxation },
        { axis: "Tolerance", value: +dataItem.Tolerance },
        { axis: "Economy", value: +dataItem.Economy },
        { axis: "Startups", value: +dataItem.Startups },
        { axis: "Outdoors", value: +dataItem.Outdoors },
        { axis: "Internet Access", value: +dataItem.Internet_Access },
        { axis: "Travel_Connectivity", value: +dataItem.Travel_Connectivity },
        { axis: "Leisure", value: +dataItem.Leisure },
      ];
    });

    const sortedAverages = graphScoreData
      .map((cityData) => {
        return {
          name: cityData[0].name,
          averageScore:
            cityData.reduce((acc, item) => (acc += item.value), 0) /
            cityData.length,
          ...cityData,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 20)
      .map((cityData) => {
        return {
          name: cityData.name,
          value: cityData.averageScore,
        };
      });
    console.log(sortedAverages);
    //   ////////////////////////////////////////////////////////////
    //   ////////////////// Draw the Chart //////////////////////////
    //   ////////////////////////////////////////////////////////////

    // var color = d3.scale.ordinal().range(["#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 10,
      levels: 5,
      roundStrokes: true,
      color: function () {
        c = [
          "lightsteelblue",
          "coral",
          "saddlebrown",
          "mediumaquamarine",
          "deeppink",
          "indigo",
          "blueviolet",
          "darkgoldenrod",
          "darkmagenta",
        ];
        m = c.length - 1;
        x = parseInt(Math.random() * 100);
        //Get a random color
        return c[x % m];
      },
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", [graphScoreData[0]], radarChartOptions);
    loadMetaData(scoreData[0].City);
    buildHeader(scoreData[0].City);
  })
  .catch(function (error) {
    console.log(error);
  });

function sortAverageCityData() {
  const sortedAverages = csvData
    .map((cityData) => {
      return {
        averageScore:
          cityData.reduce((acc, item) => (acc += item.value), 0) /
          cityData.length,
        ...cityData,
      };
    })
    .sort((a, b) => a.averageScore - b.averageScore);
  console.log(sortedAverages);
}

function renderCitiesData(city) {
  let filteredCitiesData = csvData.find((row) => {
    return city === row.City;
  });

  var graphfilteredCitiesData = [
    { axis: "Cost of Living", value: +filteredCitiesData.Cost_of_Living },
    { axis: "Education", value: +filteredCitiesData.Education },
    {
      axis: "Environmental Quality",
      value: +filteredCitiesData.Environmental_Quality,
    },
    { axis: "Healthcare", value: +filteredCitiesData.Healthcare },
    { axis: "Housing", value: +filteredCitiesData.Housing },
    { axis: "Safety", value: +filteredCitiesData.Safety },
    { axis: "Taxation", value: +filteredCitiesData.Taxation },
    { axis: "Tolerance", value: +filteredCitiesData.Tolerance },
    { axis: "Economy", value: +filteredCitiesData.Economy },
    { axis: "Startups", value: +filteredCitiesData.Startups },
    { axis: "Outdoors", value: +filteredCitiesData.Outdoors },
    { axis: "Internet Access", value: +filteredCitiesData.Internet_Access },
    {
      axis: "Travel_Connectivity",
      value: +filteredCitiesData.Travel_Connectivity,
    },
    { axis: "Leisure", value: +filteredCitiesData.Leisure },
  ];

  var avgScore =
    graphfilteredCitiesData.reduce((acc, item) => (acc += item.value), 0) /
    graphfilteredCitiesData.length;

  avgScore = Math.round(avgScore * 100) / 100;

  //   ////////////////////////////////////////////////////////////
  //   ////////////////// Draw the Chart //////////////////////////
  //   ////////////////////////////////////////////////////////////

  // var color = d3.scale.ordinal().category20();

  var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 10,
    levels: 5,
    roundStrokes: true,
    color: function () {
      c = [
        "lightsteelblue",
        "coral",
        "saddlebrown",
        "mediumaquamarine",
        "deeppink",
        "indigo",
        "blueviolet",
        "darkgoldenrod",
        "darkmagenta",
      ];
      m = c.length - 1;
      x = parseInt(Math.random() * 100);
      //Get a random color
      return c[x % m];
    },
  };
  // console.log(filteredCitiesData);
  RadarChart(".radarChart", [graphfilteredCitiesData], radarChartOptions);
  buildHeader(filteredCitiesData.City, avgScore);
}

function getData() {
  var selector = d3.select("#selDataset");

  d3.csv("/data/Allinclusive.csv").then(function (data) {
    data.forEach(function (sample) {
      var cityName = sample.City;
      selector.append("option").text(cityName).property("value", cityName);
    });
  });
}

getData();

function loadMetaData(sample) {
  d3.csv("/data/Allinclusive.csv").then((data) => {
    var result = data.find((row) => row.City === sample);

    var PANEL = d3.select(".card-body");

    PANEL.html("");

    Object.entries(result).forEach(([key, value]) => {
      let renderValue = value;
      if (!isNaN(value)) {
        renderValue = Math.round(value * 100) / 100;
      }
      PANEL.append("div").html(`<strong>${key}</strong>: ${renderValue}`);
    });
  });
}

function optionChanged(sample) {
  // Fetch new data each time a new sample is selected
  renderCitiesData(sample);
  loadMetaData(sample);
}
