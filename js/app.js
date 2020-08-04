$(document).ready(function() {
    // readSource();
    buildCircleBarplot("Housing");
    buildHeader("Housing");

    $('#selIndicator').on('change', function() {
        var activeIndicator = $('#selIndicator').val();
        $('#my_dataviz').empty()
        buildHeader(activeIndicator);
        buildCircleBarplot(activeIndicator);
    })


});

function buildHeader(activeIndicator) {
    $('#header').empty()
    $('#header').append(`<h1 style="text-align: center;"> ${activeIndicator} Scores Across Major U.S. Cities</h1>`)
}

function buildCircleBarplot(activeIndicator) {
    // // CIRCULAR BAR GRAPH: https: //www.d3-graph-gallery.com/graph/circular_barplot_basic.html

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom,
        innerRadius = 80,
        outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer
    d3.csv("../ScoreInfo.csv").then(function(data) {

        console.log(data);

        // let housing = data.map(d => d.Housing);
        // console.log(housing);

        data.sort(function(a, b) { return d3.ascending(a[activeIndicator], b[activeIndicator]); });

        console.log(activeIndicator);

        // X scale
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0) // This does nothing ?
            .domain(data.map(function(d) { return d.City; })); // The domain of the X axis is the list of states.



        // Y scale
        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius]) // Domain will be define later.
            .domain([0, 20]); // Domain of Y is from 0 to the max seen in the data

        // Add bars
        barGroup = svg.append("g")
            .selectAll("path")

        .data(data)
            .enter()

        circleBars = barGroup
            // .transition()
            // .duration(1000)
            .append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.arc() // imagine your doing a part of a donut plot
                .innerRadius(0)
                .outerRadius(80)
                .startAngle(function(d) { return x(d.City); })
                .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))

        barGroup.selectAll("path")
            .transition()
            .duration(1000)
            .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d[activeIndicator]); })
                .startAngle(function(d) { return x(d.City); })
                .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))




        // Add labels
        barGroup
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.City) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d[activeIndicator]) + 10) + ",0)"; })
            .append("text")
            .text(function(d) { return (d.City) })
            .attr("transform", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "11px")
            .attr("alignment-baseline", "middle")

        // EVENT LISTENERS!

        var toolTip = d3.tip()
            // .attr("class", "d3-tip")
            // .offset([-80, -60])
            .html(function(d) {
                return (`<h5>${d.City} <hr>${activeIndicator} Score: ${Math.round(d[activeIndicator]*100)/100}/10</h5>`)
            });

        circleBars.call(toolTip);

        circleBars.on('mouseover', function(data) {
                toolTip.show(data, this);
                toolTip.style("top", (height / 2.1) + "px")
                    .style("left", (width - (width / 8)) + "px")
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "pink")
            })
            .on('mouseout', function(data) {
                toolTip.hide(data);
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "#69b3a2")
            });

        // 

    });

}




////////////////////////////// TO-DO LIST /////////////////////////
// + Add values to the dropdown options to match the key names for the CSV
// + Generalize the graph-making - remember to empty out the SVG and re-create 
// + Figure out formatting of SVG - when I change indicators, the names of the cities are cut off
// + Figure out the format of the tool tips with the chart - why do they change location depending on where the cursor is?? 
// + Make the tool-tip names dynamic 
// + Add event listeners to the dropdown options
// + Make the bars grow?



















////////////////////////// IGNORE FOR NOW /////////////////////////////////////

// function unpack(rows, key) {
//     return rows.map(function(row) {
//         return row[key];
//     });
// }

// // Import data
// d3.csv("25cities.csv").then(function (cityData) {
//   console.log(cityData);

//   cityData.forEach(function (data) {
//     data.lat = +data.lat;
//     data.lng = +data.lng;
//   });
// });

// function readSource() {
//     $.ajax({
//         url: "https://api.teleport.org/api/locations/46.9994%2C%20-122.3921/",
//         type: "GET",
//         dataType: "json",
//         success: function(data) {
//             let geoIDURL = getGeoURL(data);
//             $.ajax({
//                 url: geoIDURL,
//                 type: "GET",
//                 dataType: "json",
//                 success: function(url) {
//                     let urbanAreaData = getSlugURL(url);
//                     $.ajax({
//                         url: urbanAreaData,
//                         type: "GET",
//                         dataType: "json",
//                         success: function(url) {
//                             let detail = getDetailURL(url);
//                             $.ajax({
//                                 url: detail,
//                                 type: "GET",
//                                 dataType: "json",
//                                 success: function(data) {
//                                     console.log(data);
//                                     var categories = data.categories;
//                                     console.log(categories);
//                                     var city_metric_names = [];
//                                     var city_metric_scores = [];

//                                     categories.forEach(function(category) {
//                                         var indicator = category.name;
//                                         var scores = category["score_out_of_10"];

//                                         city_metric_names.push(indicator);
//                                         city_metric_scores.push(scores);
//                                     });
//                                     console.log(city_metric_names, city_metric_scores);
//                                 },
//                             });
//                         },
//                     });
//                 },
//             });
//         },
//     });
// }

// // NOTES
// // * Need to see if we can put the AJAX requests within the functions - but it seems like that would require nested functions, which defeats the purpose?
// // * Need to figure out how we want to bring back data - as an object with the names as keys and the scores as the values?
// // Alternatively, we could just have 17 different variables and just pull back the scores.
// // * Might be good to have each person build a separate function for their visualization.

// // FUNCTIONS

// function getGeoURL(data) {
//     var geoIDURL =
//         data._embedded["location:nearest-cities"][0]._links["location:nearest-city"]
//         .href;
//     console.log(geoIDURL);
//     return geoIDURL;
// }

// function getSlugURL(url) {
//     var urbanAreaData = url._links["city:urban_area"].href;
//     console.log(urbanAreaData);
//     return urbanAreaData;
// }

// function getDetailURL(url) {
//     var detail = url._links["ua:scores"].href;
//     console.log(detail);
//     return detail;
// }