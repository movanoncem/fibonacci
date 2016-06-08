
//Create a tab with fibonacci suite 
tab = new Array(0,1);
for(var i=2; i<=16; i++){
	tab[i]=tab[i-1]+tab[i-2];
}

//Variables declarations
var bad_place = false;
var nice_place = false;
var map;
var marker;

//Initialize the map
google.maps.event.addDomListener(window, 'load', initialize);
function initialize(){
	var longitude;
	var latitude;
	//Creates the map with Namur at the center 
	map = new google.maps.Map(document.getElementById('map_canvas'), {
	    center: {lat: 50.46456389999999, lng: 4.875865500000032},
	    zoom: 4
	  });
	map.setOptions({styles: newStyle});
	//Creates the marker
	var image = '_images/pin.png';
	marker = new google.maps.Marker({
	    map:map,
	    draggable:true,
	    animation: google.maps.Animation.DROP,
	    position: map.getCenter(), 
	    icon: image
	});
	//Event listener when draging the marker
	google.maps.event.addListener(marker, 'dragend', function(){
	    geocodePosition(marker.getPosition());
	});
	//Geolocation at the begining
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
	        var pos = {
	          lat: position.coords.latitude,
	          lng: position.coords.longitude
	        };
	        longitude = pos.lng;
	        latitude = pos.lat;
	        document.getElementById("mapResults").innerHTML = 'longitude = '+longitude+ '   latitude = ' + latitude;
	    map.setCenter(pos);
	    marker.setPosition(pos);
	    }, function() {
	    });
    } 
}

//Get the position when the marker is dragged
function geocodePosition(pos){
	nice_place = false;
	bad_place = false;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        latLng: pos
    }, 
        function(results, status){
            if (status == google.maps.GeocoderStatus.OK) {
        		latitude = (results[0].geometry.location.lat()).toString();
				longitude = (results[0].geometry.location.lng()).toString();
				document.getElementById("mapResults").innerHTML = 'Longitude = '+longitude+ '   </br> Latitude = ' + latitude;
				// Get longitude before 
                var longitude_before_point = longitude.split(".")[0];
				// Get longitude after .
				var longitude_after_point = (longitude.split(".")[1]);
				// Split longitude after point
				var longitude_after_point_1 = longitude_after_point.substring(0,3);
				var longitude_after_point_2 = longitude_after_point.substring(3,6);
				var longitude_after_point_3 = longitude_after_point.substring(6,9);
				var longitude_after_point_4 = longitude_after_point.substring(9,12);
				var longitude_after_point_5 = longitude_after_point.substring(12,15);
				//If in fibonacci = ok
				for(var s=1; s<17; s++ ){
					if((longitude_before_point == tab[s]) || (longitude_after_point_1 != '') && 
						(longitude_after_point_1 == tab[s]) || (longitude_after_point_2 != '') && 
						(longitude_after_point_2 == tab[s]) || (longitude_after_point_3 != '') && 
						(longitude_after_point_3 == tab[s]) || (longitude_after_point_4 != '') &&
						(longitude_after_point_4 == tab[s]) || (longitude_after_point_5 != '') &&
						(longitude_after_point_5 == tab[s])){
						nice_place = true;
					}else{
						bad_place = true;
					}
				};
				// Message alert 
				if(nice_place == true){
					$('.hello').css({'opacity': '1'});
					$('.hello').html("Votre lieu est cool &#128515;");
				}else if(bad_place == true){
					$('.hello').css({'opacity': '1'});
					$('.hello').html("Votre lieu est nul &#128542;");
				}
            }else {
            	document.getElementById("mapResults").innerHTML = 'Hey, vous êtes dans la mer, sélectionnez un lieu terrestre.';
            }
        }
    );
}

function TrouverAdresse() {
	var adresse = document.getElementById('adresse').value;
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': adresse}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	    map.setCenter(results[0].geometry.location);
	    var strposition = results[0].geometry.location+"";
	    strposition=strposition.replace('(', '');
	    strposition=strposition.replace(')', '');
	    document.getElementById('mapResults').innerHTML='Coordonnées : '+strposition;
	    marker.setPosition(results[0].geometry.location);
	   geocodePosition(marker.getPosition());
	} else {
	  alert('Adresse introuvable,  pouvez vous vérifier que les données sont correctes.');
	}
	});
}
var newStyle = [
  {
    "featureType": "road.highway",
    "stylers": [
      { "color": "#fecc9f" }
    ]
  },{
    "featureType": "landscape.man_made",
    "stylers": [
      { "color": "#f6ead8" }
    ]
  },{
    "featureType": "poi.attraction",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.business",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": "#aad4f3" }
    ]
  },{
    "featureType": "poi.park",
    "stylers": [
      { "color": "#BFD7BC" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#fac48e" }
    ]
  },{
  }
]
