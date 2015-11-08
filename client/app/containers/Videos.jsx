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
    width: 100%
    pointer-events: auto
    position: absolute
    bottom: 0
    left: 0
    z-index: 2
`;
