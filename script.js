
      var map, geocoder, infowindow, elevator;
      var elevation_pos = {
              lat: -34.397, lng: 150.644
            };

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: -34.397, lng: 150.644}
        });
        geocoder = new google.maps.Geocoder;
        infowindow = new google.maps.InfoWindow;
        elevator = new google.maps.ElevationService;

        document.getElementById('submit').addEventListener('click', function() {
          geocodeLatLng(geocoder, map, infowindow);
        });

        document.getElementById('findme').addEventListener('click', function() {
          findme(geocoder, map, infowindow);
        });

        document.getElementById('elevate').addEventListener('click', function() {
          displayLocationElevation(elevator, infowindow);
        });
      }


      function displayLocationElevation(elevator, infowindow) {
        if(!document.getElementById('lat').value.match("^[0-9\.\-]+$") || !document.getElementById('lng').value.match("^[0-9\.\-]+$") )
          alert("Your input has not suitable characters.")
        else if(document.getElementById('lat').value == "" || document.getElementById('lng').value == "")
          alert("Latitude or Longutude is emty please fill them")
        else if(parseFloat(document.getElementById('lat').value) > 90|| parseFloat(document.getElementById('lng').value) > 90||
          parseFloat(document.getElementById('lat').value) < -90|| parseFloat(document.getElementById('lng').value) < -90)
          alert("Latitude or Longutude cannot be out of interval [-90 90]")
        else{
        var latInput = document.getElementById('lat').value;
        var lngInput = document.getElementById('lng').value;
        var latlng = {lat: parseFloat(latInput), lng: parseFloat(lngInput)};
        
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });


              var location = {lat: latlng.lat, lng: latlng.lng};

              // Initiate the location request
              elevator.getElevationForLocations({
                'locations': [location]
              }, function(results, status) {
                infowindow.setPosition(location);
                if (status === 'OK') {
                  // Retrieve the first result
                  if (results[0]) {
                    // Open the infowindow indicating the elevation at the clicked position.
                    infowindow.setContent('The elevation at this point <br>is ' +
                        results[0].elevation + ' meters.');
                    infowindow.open(map, marker);
                    map.setCenter(latlng);
                  } 
                  else {
                    infowindow.setContent('No results found');
                  }
                } 
                else {
                  infowindow.setContent('Elevation service failed due to: ' + status);
                }
              });


            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });


      } 
        
      }

      function findme(geocoder, map, infowindow){
        // Try HTML5 geolocation.
        if(!document.getElementById('lat').value.match("^[0-9\.\-]+$") || !document.getElementById('lng').value.match("^[0-9\.\-]+$") )
          alert("Your input has not suitable characters.")
        else if(document.getElementById('lat').value == "" || document.getElementById('lng').value == "")
          alert("Latitude or Longutude is emty please fill them")
        else if(parseFloat(document.getElementById('lat').value) > 90|| parseFloat(document.getElementById('lng').value) > 90||
          parseFloat(document.getElementById('lat').value) < -90|| parseFloat(document.getElementById('lng').value) < -90)
          alert("Latitude or Longutude cannot be out of interval [-90 90]")
        else{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            //infowindow.setPosition(pos);
            //infowindow.setContent('Location found.');
            //infowindow.open(map);
            //map.setCenter(pos);
            //map.setZoom(11);
            
            geocoder.geocode({'location': pos}, function(results) {
              var marker = new google.maps.Marker({
                position: pos,
                map: map
              });
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker); 
              map.setCenter(pos);
              map.setZoom(11);
            });

          }, function() {
            handleLocationError(true, infowindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infowindow, map.getCenter());
        }
      }
      }

      function geocodeLatLng(geocoder, map, infowindow) {
        if(!document.getElementById('lat').value.match("^[0-9\.\-]+$") || !document.getElementById('lng').value.match("^[0-9\.\-]+$") )
          alert("Your input has not suitable characters.")
        else if(document.getElementById('lat').value == "" || document.getElementById('lng').value == "")
          alert("Latitude or Longutude is emty please fill them")
        else if(parseFloat(document.getElementById('lat').value) > 90|| parseFloat(document.getElementById('lng').value ) > 90||
          parseFloat(document.getElementById('lat').value) < -90|| parseFloat(document.getElementById('lng').value ) < -90)
          alert("Latitude or Longutude cannot be out of interval [-90 90]")
        else{
        var latInput = document.getElementById('lat').value;
        var lngInput = document.getElementById('lng').value;
        var latlng = {lat: parseFloat(latInput), lng: parseFloat(lngInput)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
              map.setCenter(latlng);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
      }




      function handleLocationError(browserHasGeolocation, infowindow, pos) {
        infowindow.setPosition(pos);
        infowindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infowindow.open(map);
      }
      
      function gettingJSON()
      {
          document.write("jquery loaded");
          $.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=066ad3949ebb64605f41a34833991f32",function(json){
            console.log("Sunrise: " + json.city.sunrise + " Country: "+ json.city.country);
            alert("Sunrise: " + json.city.sunrise + " Country: "+ json.city.country);
            //document.write(JSON.stringify(json));
            
          });
          $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=066ad3949ebb64605f41a34833991f32",function(json){
            //document.write(JSON.stringify(json));
            console.log(json.name + " : " + json.weather[0].main + " : " + json.weather[0].description + " : " + json.main.temp + " : " + json.main.pressure);
            alert(json.name + " : " + json.weather[0].main + " : " + json.weather[0].description + " : " + json.main.temp + " : " + json.main.pressure);
          });
          
      }
