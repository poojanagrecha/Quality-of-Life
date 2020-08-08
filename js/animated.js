$(document).ready(function() {
    d3.csv("../ScoreInfo.csv").then(function(cityData) {
        console.log(cityData);
    });

    // Seattle Average Score

    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.05,
        title: { text: "Seattle Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE = document.getElementById("gauge");
    Plotly.newPlot(GAUGE, data, layout);

    // Dallas Overall Score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.77,
        title: { text: "Dallas Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };
    var GAUGE1 = document.getElementById("gauge1");
    Plotly.newPlot(GAUGE1, data, layout);

    // Austin overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6,
        title: { text: "Austin Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE2 = document.getElementById("gauge2");
    Plotly.newPlot(GAUGE2, data, layout);

    // Orlando overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.3,
        title: { text: "Orlando Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE3 = document.getElementById("gauge3");
    Plotly.newPlot(GAUGE3, data, layout);

    // San Francisco overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.4,
        title: { text: "San Francisco Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE4 = document.getElementById("gauge4");
    Plotly.newPlot(GAUGE4, data, layout);

    // Tampa overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.5,
        title: { text: "Tampa Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE5 = document.getElementById("gauge5");
    Plotly.newPlot(GAUGE5, data, layout);

    // New York overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.5,
        title: { text: "New York Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE6 = document.getElementById("gauge6");
    Plotly.newPlot(GAUGE6, data, layout);

    // Los Angeles overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.3,
        title: { text: "Los Angeles Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE7 = document.getElementById("gauge7");
    Plotly.newPlot(GAUGE7, data, layout);

    // San Antonio overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.5,
        title: { text: "San Antonio Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE8 = document.getElementById("gauge8");
    Plotly.newPlot(GAUGE8, data, layout);

    // San Diego overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.3,
        title: { text: "San Diego Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE8 = document.getElementById("gauge8");
    Plotly.newPlot(GAUGE8, data, layout);

    // Seattle overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 6.1,
        title: { text: "Seattle Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE9 = document.getElementById("gauge9");
    Plotly.newPlot(GAUGE9, data, layout);

    // Atlanta overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.8,
        title: { text: "Atlanta Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE10 = document.getElementById("gauge10");
    Plotly.newPlot(GAUGE10, data, layout);

    // Kansas City overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.8,
        title: { text: "Kansas City Overall Score", font: { size: 24 } },
        delta: { reference: 5.9, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE11 = document.getElementById("gauge11");
    Plotly.newPlot(GAUGE11, data, layout);

    // Houston City overall score
    var data = [{
        type: "indicator",
        mode: "gauge+number+delta",
        value: 5.9,
        title: { text: "Houston Overall Score", font: { size: 24 } },
        delta: { reference: 5.2, increasing: { color: "red" } },
        gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
            bar: { color: "indigo" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
                { range: [0, 10], color: "lightblue" },
                { range: [0, 5.9], color: "darkblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 10
            }
        }
    }];

    var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "teal", family: "Arial" }
    };

    var GAUGE12 = document.getElementById("gauge12");
    Plotly.newPlot(GAUGE12, data, layout);
});