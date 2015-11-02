'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import VideoCard from './VideoCard.jsx';

@Radium
export default class VideoCardList extends Component {

  static defaultProps = {
    videos: [
      {
        title: "Vancouver",
        mapId: 35,
        thumbnailURL: "testURL",
        views: 100,
        likes: 500
      },
      {
        title: "San Fransisco",
        mapId: 45,
        thumbnailURL: "testURL",
        views: 100,
        likes: 500
      },
      {
        title: "Toronto",
        mapId: 55,
        thumbnailURL: "testURL",
        views: 100,
        likes: 500
      }
    ]
  }

  render() {
    let videoCards = this.props.videos.map(video =>
      <li style={styles.cardLi}>
        <VideoCard />
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

const styles = styler`
  videoCardList
    width: 100%
    height: 100%

  cardLi
    float: left;
    width: 220px
    height: 100%

  clearfix
    clear: both
    display: table
`;
