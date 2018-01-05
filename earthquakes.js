// Create a map object
var myMap = L.map("map", {
	center: [42.09, -105.71],
	zoom: 4
});

// // Control box
// var info = L.control();
// info.onAdd = function (myMap) {
// 	this._div = L.DomUtil.create("div", "info");
// 	this.update();
// 	return this._div;
// };

// info.addTo(myMap);

// Legend
var legend = L.control({position: "bottomright"});

legend.onAdd = function(myMap) {
	var div = L.DomUtil.create("div", "info legend"),
		scales = [0,1,2,3,4,5],
		labels = ["0-1","1-2","2-3","3-4","4-5","5+"];

	for (i = 0; i < scales.length; i++) {
		div.innerHTML +=
		"<i style='background:" + getColor(scales[i] + 1) + "'></i>" + 
		scales[i] + (scales[i + 1] ? " &ndash; " + scales[i + 1] + "<br>":"+")
	}

	return div;

}

legend.addTo(myMap);

// Color function
function getColor(d) {
	return d > 5 ? "rgb(192,0,0)" :
		d > 4 ? "rgb(255,0,0)" :
		d > 3 ? "rgb(255,192,0)" :
		d > 2 ? "rgb(255,255,0)" :
		d > 1 ? "rgb(146,208,80)" :
			"rgb(0,176,80)" ;
}

// Initialize earthquake list
var earthquakes = [];

// Add a tile layer to the map
L.tileLayer(
		"https://api.mapbox.com/styles/v1/slavin22/cjc20tvy80xxf2smsho9smskq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2xhdmluMjIiLCJhIjoiY2phazl6NnZmMmpnMDMzcGRjbnBxeDFhbiJ9.XLg9JO1k2J0xY_W8OQKv3g"
	).addTo(myMap);

// API call to USGS past week geojson
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(jsondata) {
	quakes = jsondata.features

	for (i = 0; i < quakes.length; i++) {
		y = quakes[i].geometry.coordinates[0];
		x = quakes[i].geometry.coordinates[1];
		mag = quakes[i].properties.mag;
		place = quakes[i].properties.place;

		L.circle([x, y], {
			color: getColor(mag),
			fillColor: getColor(mag),
			fillOpacity: 1,
			radius: mag * 20000
		})
		.bindPopup("<h2>Magnitude: " + mag + "</h2> <hr> <h3>Location: " + place + "</h3>")
		.addTo(myMap);

		console.log(mag, place)
	}
});
