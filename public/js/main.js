jQuery.support.cors = true;

require([
	  "esri/Map",
	  "esri/views/MapView",
	  "dojo/domReady!"
	],
	function(Map, MapView) {
	  var map = new Map({
	    basemap: "streets"
	  });

	  var view = new MapView({
	    container: "viewDiv",  // Reference to the DOM node that will contain the view
	    map: map,               // References the map object
	    zoom: 4,
	    center: [15, 65]
	  });
});

$(document).ready(function() {
	$("#mybtn1").on('click', function() {
		$.ajax({
			url: 'https://api.weather.com/v1/geocode/43.656/-79.38/forecast/fifteenminute\
						.json?language=en-US&units=m&apiKey=d72b366c029c42f2ab366c029c02f2ce',
			type: "GET",
			data: {},
			xhrFields: {
				withCredentials: false,
			},
			// header: {
			// 	"Access-Control-Request-Headers": "x-requested-with",
			// },
			// crossDomain: true,

			success: function(res,status,xhr) {
				console.log("success! Type: "+ xhr.getResponseHeader("content-type"));
				console.log("status: " + status);
				// console.log(res);
				$("#results").html(JSON.stringify(res));
			},
			error: function(xhr, textStatus, error) {
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
			}
		})
	}); //mybtn1
}) // document.ready


