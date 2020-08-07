var data = [{
    type: "indicator",
    mode: "gauge+number+delta",
    value: 2.291,
    title: { text: "Seattle Housing", font: { size: 24 } },
    delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    gauge: {
        axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
            { range: [0, 10], color: "cyan" },
            { range: [0, 3], color: "royalblue" }
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
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('myDiv', data, layout);