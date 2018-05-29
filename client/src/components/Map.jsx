import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Map extends Component {
    
    //state holds the marker locations (array of individual objects)
    state = {
        places: [
            {
                coordinate: {lat:, lng},
                iconImage: '',
                category: '',
                content: `
                    <img src=''>
                    <h1></h1>
                    <p>Address:</p>
                    <p></p>
                `
            },
            {},
            {}
        ]
    }
    
    //when component mounts, invoke loadMap function
    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        //checking to see if props were passed down from parent {MapContainer}
            //this.props = google object (contains the map object)
            //this.props.google = maps object (contains all the map info)
        if(this.props && this.props.google) {
            const {google} = this.props;
            //google.maps (or this.props.google.maps) = map object
            const maps = google.maps;

            // Here we define both so that we can use it later to create new Markers, InfoWindows, etc. (i.e. google.maps.Marker)

            //Looks for the HTML div where ref='map'
            const mapRef = this.refs.map;
            //Finds that exact div in the React DOM
            const node = ReactDOM.findDOMNode(mapRef);


            //map options/configurations (zoom + center)
            const mapConfig = Object.assign({}, {
                center: {lat: 37.7749, lng: -122.4194},
                zoom: 11
            })

            //creating a new Map (var map = new google.maps.Map(document.getElementById('map'), options)
            this.map = new maps.Map(node, mapConfig);

            //ADD MARKER
            //iterate through each location in state (for each, create a marker). Takes 'position' and 'map'
            this.state.places.forEach(place => {
                const marker = new google.maps.Marker({
                    position: {lat: place.coordinate.lat, lng: place.coordinate.lng},
                    //this.map is referencing the map we created above 
                    map: this.map
                })
            })

            //ADD CUSTOM ICON
            //if iconImage is included in any of the objects
            if(place.iconImage) {
                marker.setIcon(place.iconImage);
            }
            
            //checking category, to get the right icon
            if(place.category === '') {
                place.iconImage = '';
                marker.setIcon(place.iconImage);
            }

            //ADD INFOWINDOW
            if(place.content) {
                const infoWindow = new google.maps.InfoWindow({
                    content: place.content
                })

                //when user clicks on any of the markers, open infowindow
                    //2 parameters: the map where it will open, and the marker
                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker);
                })
            }
        }
    }
    
    
    render () {
        //NEEDED in order for map to display 
        const style = {
            width: '90vw',
            height: '75vh'
        }
        return (
            <div ref='map' style={style}>
                loading map...
            </div>
        );
    }
}