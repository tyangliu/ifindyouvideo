'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import VideoCard from './VideoCard.jsx';

@Radium
class VideoCardList extends Component {

  static defaultProps = {
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
  }

  render() {
    let videoCards = this.props.videos.map(video =>
      <li style={styles.cardLi} key={video.mapId}>
        <VideoCard video={video} />
      </li>
    );

    return (
      <ul style={styles.videoCardList}>
        {videoCards}
        <div style={styles.clearfix} />
      </ul>
    );
  }

}

export default Relay.createContainer(VideoCardList, {
  fragments: {
    video: () => Relay.QL`
      fragment on Video {
        ${VideoCard.getFragment('video')}
      }
    `
  }
});

const styles = styler`
  videoCardList
    width: 100%
    height: 100%

  cardLi
    float: left;
    width: 320px
    height: 100%

  clearfix
    clear: both
    display: table
`;
