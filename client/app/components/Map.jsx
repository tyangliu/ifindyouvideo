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
    zoom: 9,
    showOverlays: true,
    videos: [],
    defaultCenter: {
      latitude: 59.288331692,
      longitude: -135.637207031
    }
  };

  render() {
    const {showOverlays, activeVideo, setActiveVideo, viewer, location, defaultCenter} = this.props;
    const activeVideoLocation = activeVideo !== null
                              ? viewer.videos[activeVideo-1].location
                              : null;

    const {latitude: lat, longitude: lng} = (activeVideoLocation || location || defaultCenter);

    const overlays = showOverlays ? viewer.videos.map((video, index) =>
      <VideoOverlay lat={video.location.latitude}
                    lng={video.location.longitude}
                    video={video}
                    index={index + 1}
                    isActive={(index + 1) === activeVideo}
                    setActiveVideo={setActiveVideo}
                    key={index + 1} />
    ) : [];

    return (
      <div style={styles.map}>
        <GoogleMap defaultCenter={defaultCenter}
                   defaultZoom={this.props.zoom}
                   center={{lat,lng}}
                   options={createMapOptions}>
          {overlays}
        </GoogleMap>
      </div>
    );
  }

}

export default Relay.createContainer(Map, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        videos: videosByLocation(
          latitude: 59.1293, longitude: -129.3984, radius: "200km"
        ) {
          title,
          location { latitude, longitude }
        },
        location { latitude, longitude }
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
