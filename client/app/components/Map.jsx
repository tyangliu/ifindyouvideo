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
    showOverlays: true,
    videos: [
      {
        title: "Cool Video",
        mapId: 1,
        thumbnailUrl: "http://img.lum.dolimg.com/v1/images/image_8230eadb.jpeg",
        views: 100,
        likes: 500
      },
      {
        title: "Rainbow Gnome",
        mapId: 2,
        thumbnailUrl: "http://themysteryofgravityfalls.com/images/credits/001.jpg",
        views: 100,
        likes: 500
      },
      {
        title: "Waddles",
        mapId: 3,
        thumbnailUrl: "http://emea.lum.dolimg.com/v1/images/image_2be5e783.jpeg",
        views: 100,
        likes: 500
      }
    ]
  };

  render() {
    let overlays = this.props.showOverlays ? this.props.videos.map((video, index) =>
      <VideoOverlay lat={59.955413 + index * 0.25} lng={30.337844 - index * 0.25} video={video} />
    ) : [];

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
