var place1 = ''
var name1 = ''
function share() {
  console.log('TINGGAL BERESIN AXIOS');
  console.log(place1);
  console.log(name1);
  axios.post('https://graph.facebook.com/v2.9/me/feed?access_token=EAACEdEose0cBADwoyKeywC1XrLbOw0MHJ7CQa8ZCDuLhAhIdCE5lQIr07t0lrbq4ofi06MrbeGi2NlxbnPCQfrME3Xxz1YjQzVIKPa6WuZBKvMnx6ZAp3uokEiFvhJjOu8RyVkhLiX5BZAU5hZCb3LGN3bxmSDeAZBukEkvWCh5ZCNVyI4UZAu6ppe7NIFdq7BMZD', {
    message: 'ada tempat asik, \n ' + 'Namanya  ' +name1 + ' \n ' + 'Alamatnya '+ place1
  })
  .then(function(response) {
    console.log('berhasil', response.data);
  })
  .catch(function(err) {
    console.log(err);
  })
}

var infoWindow, nodes, posNow
      var markers = []
      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: posNow,
          zoom: 13,
          mapTypeId: 'roadmap'
        });
        infoWindow = new google.maps.InfoWindow;
        // var posNow
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            posNow = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };



            // nodes = new google.maps.Marker({
            //   map: map,
            //   draggable: true,
            //   animation: google.maps.Animation.DROP,
            //   position: posNow,
            //   title: 'your position'
            // })

            // console.log(nodes.getPlace());

            infoWindow.setPosition(posNow);

            // infoWindow.setContent('Your Location');
            // infoWindow.open(map);
            map.setCenter(posNow);
            map.setZoom(15)
            console.log(map);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        //create marker for current position

        // Create the search box and link it to the UI element.
        var input = document.getElementById('mapinput');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // map.setZoom(15)

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.

          // markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();

          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            console.log(place);
            name1 = place.name
            place1 = place.formatted_address;
            var placesList = document.getElementById('places');

            var contentString = `
            <!DOCTYPE html>
            <html>
            <body>

            <div class="">
              <div class="">
                ${place.name}
                </br>
                ${place.formatted_address}
              </div>
              <div class="">
                <button type="button" name="button" onclick="share()">share</button>
                <a href="#"><button type="button" name="button">direction</button></a>
              </div>
            </div>
            </body>
            </html>
            `;
            // new Vue({
            //   el: '#app',
            //   data: {
            //     search : '',
            //     statusLogin : false
            //   },
            //   methods: {

            //   }
            // })




            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            var mark = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location,
              animation: google.maps.Animation.DROP,
            })

            mark.addListener('click', function() {
              infowindow.open(map, mark)
            })
            // Create a marker for each place.
            markers.push(mark);
            // console.log(markers);
            //localtion
            // placesList.innerHTML += '<li>' + place.name + '</li>';

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          // map.fitBounds(bounds);
          map.setZoom(15)
        });



      new AutocompleteDirectionsHandler(map);
      }

      function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        console.log(originInput);
        var destinationInput = document.getElementById('mapinput');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        // this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          // if (!place.place_id) {
          //   window.alert("Please select an option from the dropdown list.");
          //   return;
          // }
          if (mode === 'DEST') {
            me.destinationPlaceId = place.place_id;
            console.log('-----sini');
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = []
            me.route();
          } else {
            me.destinationPlaceId = place.place_id;
            // console.log(place.place_id);
          }
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': 'ChIJB-I8cajxaS4RxfqLovShPiw'},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          console.log('sampai');
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };
