'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import MapHeader from '../components/MapHeader.jsx';
import VideoCardList from '../components/VideoCardList.jsx';
import VideoModal from '../components/VideoModal.jsx';

@Radium
class Videos extends Component {

  componentWillMount() {
    this.props.setShowOverlays(true);
    let city = this.props.location.query.city;
    this.props.initVideos(city);
  }

  render() {
    const {videos, activeVideo, openVideo, setActiveVideo, setOpenVideo} = this.props;

    return (
      <div style={styles.videos}>
        <VideoModal isOpen={openVideo !== null}
                    video={openVideo ? videos[openVideo - 1] : null}
                    index={openVideo}
                    setOpenVideo={setOpenVideo} />
        <MapHeader />
        <div style={styles.cardListContainer}>
          <VideoCardList videos={videos}
                         activeVideo={activeVideo}
                         setActiveVideo={setActiveVideo}
                         setOpenVideo={setOpenVideo} />
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(Videos, {
  fragments: {
    videos: () => Relay.QL`
      fragment on Video @relay(plural: true) {
        ${VideoModal.getFragment('video')}
        ${VideoCardList.getFragment('videos')}
      }
    `
  }
});

const styles = styler`
  videos
    width: 100%
    height: 100vh
    position: absolute
    top: 0
    left: 0
    overflow-y: hidden
    pointer-events: none

  cardListContainer
    width: 100%
    pointer-events: none
    position: absolute
    bottom: 0
    left: 0
    z-index: 2
`;
