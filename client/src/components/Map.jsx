import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Bar from '../images/icons/bar.svg';
import Cafe from '../images/icons/cafe.svg';
import Garden from '../images/icons/garden.svg';
import Hike from '../images/icons/hike.svg';
import Dessert from '../images/icons/dessert.svg';
import Museum from '../images/icons/museum.svg';
import PhotoOp from '../images/icons/photoop.svg';
import Restaurant from '../images/icons/restaurant.svg';
import Romantic from '../images/icons/romantic.svg';
import './Map.css';

export class Map extends Component {
  state = {
    mapWidth: '100vw',
    panelWidth: '0vw',
    panelDisplay: 'none',
    map: '',
    geocoder: '',
    start: '',
    segmentOrigin: '',
    end: '',
    routes: []
  }

  // when component mounts, invoke loadMap function
  componentDidMount() {
    this.loadMap();
  }

  loadMap = () => {

    //normal style
    //takes off default poi & transit markers
    const styles = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }]
      }
    ];

    const icons = {
      'museum': Museum,
      'restaurant': Restaurant,
      'dessert': Dessert,
      'hike': Hike,
      'photo-op': PhotoOp,
      'romantic': Romantic,
      'bar': Bar,
      'cafe': Cafe,
      'garden': Garden
    }

    //checking to see if props were passed down from parent {MapContainer}
    //this.props = google object (contains the map object)
    //this.props.google = maps object (contains all the map info)
    if (this.props && this.props.google) {
      const { google } = this.props;
      //google.maps (or this.props.maps) = map object
      const maps = google.maps;

      // Here we define both so that we can use it later to create new Markers, InfoWindows, etc. (i.e. google.maps.Marker)

      //Looks for the HTML div where ref='map'
      const mapRef = this.refs.map;
      //Finds that exact div in the React DOM
      const node = ReactDOM.findDOMNode(mapRef);
      if (this.props.city[0].coordinates === undefined) {
        alert('Maps is currently not working. Please try again later.');
      }

      const city = this.props.city[0].coordinates;
      //map options/configurations (zoom + center)
      const mapConfig = Object.assign({}, {
        center: { lat: city.latitude, lng: city.longitude },
        zoom: 11,
        styles: styles
      })


      //creating a new Map (var map = new google.maps.Map(document.getElementById('map'), options)
      this.map = new maps.Map(node, mapConfig);

      //so that the map and geocoder can be accessed anywhere
      this.setState({ map: this.map, geocoder: new google.maps.Geocoder() })

      //custom control ('Get Directions'); puts it at the TOP_CENTER of the map
      const centerControlDiv = document.getElementById('control-div');
      centerControlDiv.index = 1;
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        suppressBicyclingLayer: true,
        preserveViewport: true
      });
      directionsDisplay.setMap(this.map);

      //ADD MARKER
      //iterate through each location in state (for each, create a marker). Takes 'position' and 'map'
      this.props.places.forEach(place => {
        const marker = new google.maps.Marker({
          position: { lat: place.coordinate.lat, lng: place.coordinate.lng },
          //this.map is referencing the map we created above 
          map: this.map
        })

        //ADD CUSTOM ICON
        if (place.category in icons) {
          marker.setIcon(icons[place.category]);
        }

        //ADD INFOWINDOW
        if (place.content) {
          const infoWindow = new google.maps.InfoWindow({
            content: `
						<div id='content'>
							<h2>${place.place_name}</h2>
							<p><strong>Address</strong>: ${place.address}</p>
							<div id='place_image'>
								<img src=${place.image} alt=${place.place_name} />
							</div>
							<hr />
							<div id='infowindow-controls'>
								<div id='btn-container'>
									<Button id='homebtn'>Go Home</Button> 
								</div>
								<div id="travel-mode">
									<div id='mode-description'>
										<p><strong>Directions to here by</strong>: </p>
									</div>
									<div id='mode-type'>
										<select id="mode">
											<option disabled selected value> Options</option>
											<option value="DRIVING">Driving</option>
											<option value="WALKING">Walking</option>
											<option value="BICYCLING">Bicycling</option>
											<option value="TRANSIT">Transit</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						`
          })

          //when user clicks on any of the markers, open infowindow
          //2 parameters: the map where it will open, and the marker
          //also when they click, it grabs that marker's coordinates (updates segmentOrigin)
          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
            console.log(`marker: ${marker.position}`)

            this.setState({
              segmentOrigin: {
                lat: marker.position.lat(),
                lng: marker.position.lng()
              }
            })
          })

          //allows me to call a js function from the infowindow --> travel mode selection 
          google.maps.event.addListener(infoWindow, 'domready', () => {
            //grabs the selected travel mode
            const selected = document.getElementById('mode');
            selected.onchange = () => {
              const selectedMode = selected.options[selected.selectedIndex].value;

              this.calculateAndDisplayRoute(directionsService, selectedMode);
            }
          });

          //JS functionality for "Go Home" button in infowindow
          google.maps.event.addListener(infoWindow, 'domready', () => {
            const home = document.getElementById('homebtn');

            home.onclick = () => {
              this.directionsToHome(directionsService, directionsDisplay);
            }
          });

        }
      })
    }
  }

  //opens the right panel (for directions)
  loadDirectionsPanel = () => {
    this.setState({ mapWidth: '65vw', panelWidth: '35vw', panelDisplay: 'flex' })
  }

  //geocode -> converts address into coordinates (also makes marker)
  geocodeAddress = (e) => {
    e.preventDefault();
    const address = e.target.address.value;

    this.state.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        const hotelCoords = results[0].geometry.location;

        this.state.map.setCenter(hotelCoords);
        const marker = new this.props.google.maps.Marker({
          position: hotelCoords,
          map: this.state.map
        })
        console.log(`ignore: ${marker}`);

        this.setState({
          start: results[0].formatted_address,
          end: results[0].formatted_address
        });

      } else {
        alert('Geocode was not successful for the following reasons: ' + status);
      }
    })
  }

  calculateAndDisplayRoute = (directionsService, mode) => {
    const travelMode = {
      'TRANSIT': '#ffb84d',
      'WALKING': '#d633ff',
      'BICYCLING': '#009900'
    }

    let pathColor = '';
    if (mode in travelMode) {
      pathColor = travelMode[mode];
    }

    //grabbing the current destination's coordinates --> to be set as the new origin for next route
    const previousDestinationToOrigin = { lat: this.state.segmentOrigin.lat, lng: this.state.segmentOrigin.lng };

    directionsService.route({
      origin: this.state.start,
      destination: { lat: this.state.segmentOrigin.lat, lng: this.state.segmentOrigin.lng },
      travelMode: this.props.google.maps.TravelMode[mode]
    }, (response, status) => {

      //once the previous route displays, instantiate DirectionsRenderer (so that each is a separate call and all displays) --> both map route and text directions for each
      if (status === 'OK') {
        this.setState({ start: previousDestinationToOrigin });

        let dirDisplay = new this.props.google.maps.DirectionsRenderer({
          map: this.state.map,
          suppressMarkers: true,
          suppressBicyclingLayer: true,
          preserveViewport: true,
          polylineOptions: {
            strokeColor: pathColor,
            strokeWeight: 6
          }
        })

        //creating the route on map AND giving text directions for each. 
        dirDisplay.setDirections(response);
        dirDisplay.setPanel(document.getElementById('text-directions'));

      } else {
        window.alert("Directions failed due to " + status);
      }
    })
  }

  // when user clicks "Go Home", will route directions from their last location back to hotel
  directionsToHome = (directionsService, directionsDisplay) => {
    directionsService.route({
      origin: this.state.start,
      destination: this.state.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        directionsDisplay.setPanel(document.getElementById('text-directions'));

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  render() {

    const mapStyle = {
      width: this.state.mapWidth,
      height: '90vh'
    }

    const rightPanel = {
      width: this.state.panelWidth,
      display: this.state.panelDisplay,
      height: '90vh'
    }

    return (
      <div>
        {/* attaching the map styles */}
        <div className="app">
          <div ref='map' className='map' style={mapStyle}>
            loading map...
					</div>

          <div id="control-div">
            <div id="controlUI" onClick={this.loadDirectionsPanel}>
              <div id="controlText">
                Get Directions
							</div>
            </div>
          </div>

          <div id='right-panel' style={rightPanel}>
            <form onSubmit={this.geocodeAddress} className='address-form'>
              <label htmlFor="address"><strong>Your Hotel Address: </strong></label>
              <input type="text" name="address" />
              <button id='hotelbtn'>Submit</button>
            </form>
            <div className='legend'>
              <p><strong>DRIVING</strong>: <span id='driving'>blue</span></p>
              <p><strong>TRANSIT</strong>: <span id='transit'>orange</span></p>
              <p><strong>WALKING</strong>: <span id='walking'>purple</span></p>
              <p><strong>BICYCLING</strong>: <span id='bicycling'>green</span></p>
            </div>

            <div className='directions-container'>
              <div id="text-directions"></div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}
