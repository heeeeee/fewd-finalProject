//
// app.js
// connects to Google Maps API to get location infomration
//


// The API can't be loaded after the document has finished loading by default, 
// need to load it asynchronous.
function initMap() {

  // get all of the post title (locations) and store it in locationList
  var locationNameList = [];
  locationNameList = extract($('h2').toArray());
  console.log(locationNameList);

  // store the coordinate information of the locations in locationsWithCoordinates
  var locations = [];
  for ( var i = 0; i < locationNameList.length; i++ ) {
    var parkPosition = getLocationCoordinate(locationNameList[i]);
    locations.push([parkPosition.address,parkPosition.lat,parkPosition.lng]);
  }
  console.log(locations);

  // center the map
  var map = new google.maps.Map($('#map').get(0), {
    zoom: 6,
    center: {lat: 37.7749295, lng: -122.4194155}
  });


  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  var geocoder = new google.maps.Geocoder();
  $('#submit').on("click", function(){
    geocodeAddress(geocoder, map);
  });
}

// extract the innerText from headers
function extract(headers) {
  var a = [];
  for ( var i = 0; i < headers.length; i++ ) {
    a.push(headers[i].innerText);
    // console.log(headers[i].innerText);
  }
  return a;
}

// get location coordinates based on address passed
function getLocationCoordinate(address) {
  var position = {};
  $.ajax({
    url : 'http://maps.google.com/maps/api/geocode/json',
    type : 'GET',
    data : {
      address : address,
      sensor : false
    },
    async : false,
    success : function(result) {
      try {
        position.address = address;
        position.lat = result.results[0].geometry.location.lat;
        position.lng = result.results[0].geometry.location.lng;
        //console.log(position.lat);
      } catch(err) {
        position = null;
      }
    }
  });
  return position;
}


function geocodeAddress(geocoder, resultsMap) {
  var address = $('#address').val();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


$(document).ready(function(){

  // show overlay box 
   $("#create-overlay1").mouseenter(function(){
     $("#overlay-box1").show("slow", function() {
     });
   });
   $("#create-overlay2").mouseenter(function(){
     $("#overlay-box2").show("slow", function() {
     });
   });
   $("#create-overlay3").mouseenter(function(){
     $("#overlay-box3").show("slow", function() {
     });
   });
   $("#create-overlay4").mouseenter(function(){
     $("#overlay-box4").show("slow", function() {
     });
   });
   $("#create-overlay5").mouseenter(function(){
     $("#overlay-box5").show("slow", function() {
     });
   });
   $("#create-overlay6").mouseenter(function(){
     $("#overlay-box6").show("slow", function() {
     });
   });
   // hide overlay box
   $(".post").mouseleave(function(){
     $(".overlay-box").hide("slow", function() {
     });
   });

  // GET news source from news api
  $.ajax({
     type: "GET",
     url: "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=1eff36b4414c4786abb39ecd8ad16f4c",
     success: function(news) {
        $("#contenthere").load(news);
        console.log(news);
  },
  error: function() {
    alert("Error getting news");
  }
});

  });
