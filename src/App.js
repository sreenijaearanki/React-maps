import React, { Component, createRef, useState  } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import { BrowserRouter as Router, Switch, Route, Link, useScreenshot, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react, use-react-screenshot, react-router-dom';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { useScreenshot } from "use-react-screenshot";


//import React, { createRef, useState } from 'react'
//import { 'use-react-screenshot' } from 'use-react-screenshot'

import CurrentLocation from './Map';

//import React from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Download from "./components/Download";
import Image from "./components/Image";


/*
const App = () => {
  return (
    <Router>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link to="/download"> Download </Link> -{" "}
          <code>/components/Download.js</code>
        </li>{" "}
        <li>
          <Link to="/image"> Image </Link> - <code>/components/Image.js</code>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route path="/download" component={Download} />
        <Route path="/image" component={Image} />
      </Switch>
    </Router>
  );
};

*/

const mapStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}

      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Current Location'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}


const App=() => {
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)
  return (
    <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      <img width={this.width} src={"https://developers.google.com/maps/documentation/maps-static/overview"} alt={'Screenshot'} />
      <img className={'mapsname'} href={'https://developers.google.com/maps/documentation/maps-static/overview'} alt={'mapsname'} />
      <div ref={ref}>
        <h1>use-react-screenshot</h1>
        
        <p>
          <strong>hook by @vre2h which allows to create screenshots</strong>
        </p>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAJa7EPmu6K8I1YDLYy3w7FQaYP5pD6lW8'
})(MapContainer);

/*
export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.apiKey
  }
))(MapContainer);
*/