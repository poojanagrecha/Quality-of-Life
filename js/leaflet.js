$(document).ready(function() {
    let dropFilter = $("select").val();
    createMap(dropFilter);

    $("select").on("change", function() {
        let dropFilter = this.value;
        createMap(dropFilter);
    });
});

function createMap(dropFilter) {
    $('#mapParent').empty();
    $('#mapParent').append('<div style="height:827px" id="mapid"></div>');

    var streetSatmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var litemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });


    var geoData = "data/Allinclusive.geojson";

    d3.json(geoData).then(function(cityData) {

        var markers = L.markerClusterGroup();

        var circles = [];

        var city = cityData.features;

        city.forEach(function(place) {

            if ((place.geometry.coordinates[1]) && (place.geometry.coordinates[0])) {

                let popUp = L.marker([+place.geometry.coordinates[1], +place.geometry.coordinates[0]]).bindPopup("<h3>" + place.properties.Address + "</h3><hr><h5>" + dropFilter.split('_').join(' ') + " Score: " + Math.round(place.properties[dropFilter], 2) + "</h5>");
                markers.addLayer(popUp);

                let circle = L.circle([+place.geometry.coordinates[1], +place.geometry.coordinates[0]], {
                    radius: markerSize(place.properties[dropFilter]),
                    fillColor: circleColor(place.properties[dropFilter]),
                    fillOpacity: .9,
                    color: 'grey',
                    weight: .5
                }).bindPopup("<h3>" + place.properties.Address + "</h3><hr><h5>" + dropFilter.split('_').join(' ') + " Score: " + Math.round(place.properties[dropFilter], 2) + "</h5>");

                circles.push(circle);

            }


        });

        var circleLayer = L.layerGroup(circles);

        var baseMaps = {
            "Satellite Map": streetSatmap,
            "Light Map": litemap,
            "Dark Map": darkmap
        };

        // Create overlay object to hold our overlay layer
        var overlayMaps = {
            "City Markers": markers,
            "City Circles": circleLayer,
        };

        var myMap = L.map("mapid", {
            center: [39.833333, -98.583333],
            zoom: 4.7,
            layers: [darkmap, circleLayer]
        });

        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function(myMap) {

            var div = L.DomUtil.create('div', 'legend'),
                scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

            div.innerHTML += "<h4>Scores</h4>"
            for (var i = 0; i < scores.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + circleColor(scores[i] + 1) + '"></i> ' +
                    scores[i] + (scores[i + 1] ? '&ndash;' + scores[i + 1] + '<br>' : '+');
            }
            return div;


        };

        function markerSize(dot) {
            return dot * 10000;
        };
        legend.addTo(myMap);



        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    })
};

function circleColor(x) {
    var colorFill = ['#ff0066', '#e60f75', '#bf268c', '#993da3', '#804cb2', '#665cc2', '#4073d9', '#1a8af0', '#0099ff', '#00CCFF'];
    if (x > 9) {
        return colorFill[9];
    } else if (x > 8) {
        return colorFill[8];
    } else if (x > 7) {
        return colorFill[7];
    } else if (x > 6) {
        return colorFill[6];
    } else if (x > 5) {
        return colorFill[5];
    } else if (x > 4) {
        return colorFill[4];
    } else if (x > 3) {
        return colorFill[3];
    } else if (x > 2) {
        return colorFill[2];
    } else if (x > 1) {
        return colorFill[1];
    } else
        return colorFill[0]
};