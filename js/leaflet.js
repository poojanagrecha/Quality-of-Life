$(document).ready(function() {

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

    var geoData = "data/convertScores.geojson";

    d3.json(geoData).then(function(cityData) {
        console.log(cityData.features[0].geometry.coordinates);

        var markers = L.markerClusterGroup();
        var circles = [];

        var city = cityData.features;
        city.forEach(function(place) {
            if ((place.geometry.coordinates[1]) && (place.geometry.coordinates[0])) {
                console.log(place.properties);
                let popUp = L.marker([+place.geometry.coordinates[1], +place.geometry.coordinates[0]]).bindPopup("<h3>" + place.properties.City + "<h3> ");
                markers.addLayer(popUp);

                let circle = L.circle([+place.geometry.coordinates[1], +place.geometry.coordinates[0]], {
                    radius: 5,
                    fillColor: "black",
                    fillOpacity: .9,
                    color: 'grey',
                    weight: .5
                }).bindPopup("<h3>" + place.properties.City + "<h3> ");

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
            "Earthquake Clusters": markers,
            "Earthquake Circles": circleLayer,
        };

        var myMap = L.map("mapid", {
            center: [39.833333, -98.583333],
            zoom: 4.7,
            layers: [streetSatmap, markers]
        });

        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function(myMap) {

            var div = L.DomUtil.create('div', 'legend'),
                magnitudes = [0, 1, 2, 3, 4, 5]

            div.innerHTML += "<h4>Magnitude</h4>"
            for (var i = 0; i < magnitudes.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + circleColor(magnitudes[i] + 1) + '"></i> ' +
                    magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
            }
            return div;


        };
        legend.addTo(myMap);



        // Create a layer control
        // Pass in our baseMaps and overlayMaps
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    })
});

function circleColor(x) {
    var colorFill = ['#82b74b', '#b5e7a0', '#f2e394', '#f2ae72', '#d96459', '#c83349'];
    if (x > 5) {
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