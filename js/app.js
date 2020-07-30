$(document).ready(function () {
  readSource();
});

function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key];
  });
}

// Import data
d3.csv("25cities.csv").then(function (cityData) {
  console.log(cityData);

  cityData.forEach(function (data) {
    data.lat = +data.lat;
    data.lng = +data.lng;
  });
});

function readSource() {
  $.ajax({
    url: "https://api.teleport.org/api/locations/46.9994%2C%20-122.3921/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let geoIDURL = getGeoURL(data);
      $.ajax({
        url: geoIDURL,
        type: "GET",
        dataType: "json",
        success: function (url) {
          let urbanAreaData = getSlugURL(url);
          $.ajax({
            url: urbanAreaData,
            type: "GET",
            dataType: "json",
            success: function (url) {
              let detail = getDetailURL(url);
              $.ajax({
                url: detail,
                type: "GET",
                dataType: "json",
                success: function (data) {
                  console.log(data);
                  var categories = data.categories;
                  console.log(categories);
                  var city_metric_names = [];
                  var city_metric_scores = [];

                  categories.forEach(function (category) {
                    var indicator = category.name;
                    var scores = category["score_out_of_10"];

                    city_metric_names.push(indicator);
                    city_metric_scores.push(scores);
                  });
                  console.log(city_metric_names, city_metric_scores);
                },
              });
            },
          });
        },
      });
    },
  });
}

// NOTES
// * Need to see if we can put the AJAX requests within the functions - but it seems like that would require nested functions, which defeats the purpose?
// * Need to figure out how we want to bring back data - as an object with the names as keys and the scores as the values?
// Alternatively, we could just have 17 different variables and just pull back the scores.
// * Might be good to have each person build a separate function for their visualization.

// FUNCTIONS

function getGeoURL(data) {
  var geoIDURL =
    data._embedded["location:nearest-cities"][0]._links["location:nearest-city"]
      .href;
  console.log(geoIDURL);
  return geoIDURL;
}

function getSlugURL(url) {
  var urbanAreaData = url._links["city:urban_area"].href;
  console.log(urbanAreaData);
  return urbanAreaData;
}

function getDetailURL(url) {
  var detail = url._links["ua:scores"].href;
  console.log(detail);
  return detail;
}
