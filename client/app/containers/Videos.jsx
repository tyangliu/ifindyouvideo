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
    let { city, year, month } = this.props.location.query;
    this.props.initVideos(city, year, month);
  }

  render() {
    const {
      videos, activeVideo, openVideo, cities, viewer, authObj,
      setActiveVideo, setOpenVideo, initVideos, history
    } = this.props;

    let { city, year, month } = this.props.location.query;

    return (
      <div style={styles.videos}>
        <VideoModal isOpen={openVideo !== null}
                    video={openVideo ? videos[openVideo - 1] : null}
                    index={openVideo}
                    setOpenVideo={setOpenVideo}
                    authObj={authObj} />

        <MapHeader city={city} year={year} month={month}
                   cities={cities}
                   viewer={viewer}
                   history={history}
                   initVideos={initVideos} />

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
    `,
    cities: () => Relay.QL`
      fragment on City @relay(plural: true) {
        ${MapHeader.getFragment('cities')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${MapHeader.getFragment('viewer')}
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
