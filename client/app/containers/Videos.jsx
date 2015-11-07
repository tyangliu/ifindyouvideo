'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import MapHeader from '../components/MapHeader.jsx';
import VideoCardList from '../components/VideoCardList.jsx';

@Radium
class Videos extends Component {

  componentWillMount() {
    this.props.setShowOverlays(true);
  }

  render() {
    const {videos, activeVideo, setActiveVideo} = this.props;

    return (
      <div style={styles.videos}>
        <MapHeader />
        <div style={styles.cardListContainer}>
          <div style={styles.border} />
          <VideoCardList videos={videos} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(Videos, {
  fragments: {
    videos: () => Relay.QL`
      fragment on Video @relay(plural: true) {
        ${VideoCardList.getFragment('videos')}
      }
    `
  }
});

const styles = styler`
  videos
    width: 100%
    height: 100vh
    position: relative
    overflow-y: hidden
    pointer-events: none

  cardListContainer
    pointer-events: auto
    height: 220px
    width: 100%
    position: absolute
    bottom: 0
    left: 0
    box-shadow: 0 -1px 2px rgba(0,0,0,0.2)
    background: rgba(255,255,255,0.9)
    z-index: 2

  border
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 7px
    background: rgba(255,72,40,0.8)
`;
