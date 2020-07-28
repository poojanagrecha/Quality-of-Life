$(document).ready(function() {
    readSource();
});

function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
};

function readSource() {
    $.ajax({
        url: "https://api.teleport.org/api/locations/46.9994%2C%20-122.3921/",
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var geoIDURL = data._embedded["location:nearest-cities"][0]._links["location:nearest-city"].href;
            console.log(geoIDURL);
            $.ajax({
                url: geoIDURL,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    var urbanAreaData = data._links["city:urban_area"].href;


                }
            })
        }


    })
}