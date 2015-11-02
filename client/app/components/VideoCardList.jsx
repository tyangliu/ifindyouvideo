'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

import VideoCard from './VideoCard.jsx';

@Radium
export default class VideoCardList extends Component{

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
    let videoList = this.props.videos;

    return (
      <div>
        <ol style={styles.CardList}>
          {videoList.map(function(videoInfo) {
            //<VideoCard></VideoCard>;
            return (
              <li style={styles.CardStyle}>
                <VideoCard video={videoInfo} />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

}

const styles = styler`
  CardList
    background: #f7f7f7
    padding: 8px
    max-height: 300px
    height: 300px
    width: 100%

  CardStyle
    display: inline
    float: left
`;