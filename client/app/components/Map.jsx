'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import GoogleMap from 'google-map-react';
import Radium from 'radium';
import styler from 'react-styling';
import VideoOverlay from './VideoOverlay.jsx';

@Radium
export default class Map extends Component {

  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    showOverlays: true
  };

  render() {
    let overlays = this.props.showOverlays ? [
      <VideoOverlay lat={59.955413} lng={30.337844} />
    ] : [];

    return (
      <div style={styles.map}>
        <GoogleMap defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          {overlays}
        </GoogleMap>
      </div>
    );
  }

}

const styles = styler`
  map
    width: 100%
    height: 100vh
    position: absolute
    top: 0
    left: 0
    overflow-y: hidden
`;
