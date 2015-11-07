'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import GoogleMap from 'google-map-react';
import Radium from 'radium';
import styler from 'react-styling';
import VideoOverlay from './VideoOverlay.jsx';

const createMapOptions = maps => ({
  zoomControlOptions: {
    position: maps.ControlPosition.RIGHT_CENTER,
    style: maps.ZoomControlStyle.SMALL
  }
});

@Radium
class Map extends Component {

  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    showOverlays: true,
    videos: []
  };

  render() {
    const {video, showOverlays, videos} = this.props;

    let overlays = showOverlays ? videos.map((video, index) =>
      <VideoOverlay lat={59.955413 + index * 0.25} lng={30.337844 - index * 0.25} video={video} key={index} />
    ) : [];

    return (
      <div style={styles.map}>
        <GoogleMap defaultCenter={this.props.center}
                   defaultZoom={this.props.zoom}
                   options={createMapOptions}>
          {overlays}
        </GoogleMap>
      </div>
    );
  }

}

export default Relay.createContainer(Map, {
  fragments: {
    videos: () => Relay.QL`
      fragment on Video @relay(plural: true) {
        title
      }
    `
  }
});

const styles = styler`
  map
    width: 100%
    height: 100vh
    position: absolute
    top: 0
    left: 0
    overflow-y: hidden
`;
