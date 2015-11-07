'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import VideoCard from './VideoCard.jsx';

@Radium
class VideoCardList extends Component {

  static defaultProps = {
    videos: []
  }

  render() {
  let videoCards = this.props.videos.map((video, index) =>
    <VideoCard video={video} key={index + 1} index={index + 1} />
  );

    return (
      <div style={styles.videoCardList}>
        {videoCards}
        <div style={styles.clearfix} />
      </div>
    );
  }

}

export default Relay.createContainer(VideoCardList, {
  fragments: {
    videos: () => Relay.QL`
      fragment on Video @relay(plural: true) {
        ${VideoCard.getFragment('video')}
      }
    `
  }
});

const styles = styler`
  videoCardList
    width: 100%
    height: 100%

  clearfix
    clear: both
    display: table
`;
