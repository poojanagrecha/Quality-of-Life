$(document).ready(function() {
    // readSource();
    buildCircleBarplot1("Housing");
    // buildCircleBarplot2("Economy");
    buildHeader("Housing", "Economy");

    $('#selIndicator1').on('change', function() {
        var activeIndicator1 = $('#selIndicator1').val();
        // var activeIndicator2 = $('#selIndicator2').val();
        $('#my_dataviz1').empty()
        buildHeader(activeIndicator1);
        buildCircleBarplot1(activeIndicator1);
    })

    // $('#selIndicator2').on('change', function() {
    //     var activeIndicator1 = $('#selIndicator1').val();
    //     var activeIndicator2 = $('#selIndicator2').val();
    //     $('#my_dataviz2').empty()
    //     buildHeader(activeIndicator1, activeIndicator2);
    //     buildCircleBarplot2(activeIndicator2);
    // })


});

function buildHeader(activeIndicator1) {
    $('#header').empty()
    $('#header').append(`<h1 style="text-align: center;"> ${activeIndicator1} Scores Across Major Cities</h1>`)
}

function buildCircleBarplot1(activeIndicator) {
    // // CIRCULAR BAR GRAPH: https: //www.d3-graph-gallery.com/graph/circular_barplot_basic.html

    // set the dimensions and margins of the graph
    var margin = { top: 0, right: 10, bottom: 100, left: 10 },
        width = innerWidth - margin.left - margin.right,
        height = innerHeight - margin.top - margin.bottom,
        innerRadius = 130,
        outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer
    d3.csv("./data/Allinclusive.csv").then(function(data) {

        // console.log(data);

        // let housing = data.map(d => d.Housing);
        // console.log(housing);
        data = data.filter(function(d) { return parseFloat(d[activeIndicator]) > 0 })

        data.sort(function(a, b) { return d3.ascending(parseFloat(a[activeIndicator]), parseFloat(b[activeIndicator])); });

        // console.log(activeIndicator);

        // X scale
        var x = d3.scaleBand()
            .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0) // This does nothing ?
            .domain(data.map(function(d) { return d.City; })); // The domain of the X axis is the list of states.



        // Y scale
        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius]) // Domain will be define later.
            .domain([0, 13]); // Domain of Y is from 0 to the max seen in the data

        // Add bars
        barGroup = svg.append("g")
            .selectAll("path")

        .data(data)
            .enter()

        circleBars = barGroup
            // .transition()
            // .duration(1000)
            .append("path")
            .attr("fill", "#31145b")
            .attr("d", d3.arc() // imagine your doing a part of a donut plot
                .innerRadius(0)
                .outerRadius(80)
                .startAngle(function(d) { return x(d.City); })
                .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))

        barGroup.selectAll("path")
            .transition()
            .duration(2500)
            .attr("d", d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d[activeIndicator]); })
                .startAngle(function(d) { return x(d.City); })
                .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))




        // Add labels
        if (function(data) { parseFloat(data[activeIndicator]) > 0 }) {
            barGroup
                .append("g")
                .attr("text-anchor", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
                .attr("transform", function(d) { return "rotate(" + ((x(d.City) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d[activeIndicator]) + 10) + ",0)"; })
                .append("text")
                .text(function(d) { return (d.City) })
                .attr("transform", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
                .style("font-size", "7px")
                .attr("alignment-baseline", "middle")
        }



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
                toolTip.style("top", (height + innerRadius - innerRadius / 5) + "px")
                    .style("left", (width - (width / 1.8)) + "px")
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "#eedffd")
            })
            .on('mouseout', function(data) {
                toolTip.hide(data);
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", '#31145b')
            });

        // 

    });

}

function fillColor(data) {
    let fill = "yellow"
    if (parseFloat(data) > 8) {
        fill = "#31145b"
    } else if (parseFloat(data) > 6) {
        fill = "#967AA1"
    } else if (parseFloat(data) > 4) {
        fill = "#AAA1C8"
    } else if (parseFloat(data) > 2) {
        fill = "#D5C6E0"
    } else {
        // fill = "#F5E6E8"
    }
    return fill
}

// function buildCircleBarplot2(activeIndicator) {
//     // // CIRCULAR BAR GRAPH: https: //www.d3-graph-gallery.com/graph/circular_barplot_basic.html

//     // set the dimensions and margins of the graph
//     var margin = { top: 10, right: 10, bottom: 10, left: 10 },
//         width = 800 - margin.left - margin.right,
//         height = 800 - margin.top - margin.bottom,
//         innerRadius = 80,
//         outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

//     // append the svg object to the body of the page
//     var svg = d3.select("#my_dataviz2")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 100) + ")"); // Add 100 on Y translation, cause upper bars are longer
//     d3.csv("../data/Allinclusive.csv").then(function(data) {

//         console.log(data);

//         // let housing = data.map(d => d.Housing);
//         // console.log(housing);

//         data.sort(function(a, b) { return d3.ascending(parseFloat(a[activeIndicator]), parseFloat(b[activeIndicator])); });

//         console.log(activeIndicator);

//         // X scale
//         var x = d3.scaleBand()
//             .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
//             .align(0) // This does nothing ?
//             .domain(data.map(function(d) { return d.City; })); // The domain of the X axis is the list of states.



//         // Y scale
//         var y = d3.scaleRadial()
//             .range([innerRadius, outerRadius]) // Domain will be define later.
//             .domain([0, 20]); // Domain of Y is from 0 to the max seen in the data


//         // Add bars
//         barGroup = svg.append("g")
//             .selectAll("path")

//         .data(data)
//             .enter()

//         circleBars = barGroup
//             // .transition()
//             // .duration(1000)
//             .append("path")
//             .attr("fill", "#eedffd")
//             .attr("d", d3.arc() // imagine your doing a part of a donut plot
//                 .innerRadius(0)
//                 .outerRadius(80)
//                 .startAngle(function(d) { return x(d.City); })
//                 .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
//                 .padAngle(0.01)
//                 .padRadius(innerRadius))

//         barGroup.selectAll("path")
//             .transition()
//             .duration(1000)
//             .attr("d", d3.arc()
//                 .innerRadius(innerRadius)
//                 .outerRadius(function(d) { return y(d[activeIndicator]); })
//                 .startAngle(function(d) { return x(d.City); })
//                 .endAngle(function(d) { return x(d.City) + x.bandwidth(); })
//                 .padAngle(0.01)
//                 .padRadius(innerRadius))




//         // Add labels

//         barGroup
//             .append("g")
//             .attr("text-anchor", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
//             .attr("transform", function(d) { return "rotate(" + ((x(d.City) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d[activeIndicator]) + 10) + ",0)"; })
//             .append("text")
//             .text(function(d) { return (d.City) })
//             .attr("transform", function(d) { return (x(d.City) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
//             .style("font-size", "7px")
//             .attr("alignment-baseline", "middle")

//         // EVENT LISTENERS!

//         var toolTip = d3.tip()
//             // .attr("class", "d3-tip")
//             // .offset([-80, -60])
//             .html(function(d) {
//                 return (`<h5>${d.City} <hr>${activeIndicator} Score: ${Math.round(d[activeIndicator]*100)/100}/10</h5>`)
//             });

//         circleBars.call(toolTip);

//         circleBars.on('mouseover', function(data) {
//                 toolTip.show(data, this);
//                 toolTip.style("top", (height / 2.1) + "px")
//                     .style("left", (width - (width / 20)) + "px")
//                 d3.select(this)
//                     .transition()
//                     .duration(1000)
//                     .attr("fill", "31145b")
//             })
//             .on('mouseout', function(data) {
//                 toolTip.hide(data);
//                 d3.select(this)
//                     .transition()
//                     .duration(1000)
//                     .attr("fill", "#eedffd")
//             });

//         // 

//     });

// }




////////////////////////////// TO-DO LIST /////////////////////////
// + Add values to the dropdown options to match the key names for the CSV
// + Generalize the graph-making - remember to empty out the SVG and re-create 
// + Figure out formatting of SVG - when I change indicators, the names of the cities are cut off
// + Figure out the format of the tool tips with the chart - why do they change location depending on where the cursor is?? 
// + Make the tool-tip names dynamic 
// + Add event listeners to the dropdown options
// + Make the bars grow?