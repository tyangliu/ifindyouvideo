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
      <div style={styles.CardList}>
        <ol>
          {videoList.map(function(video) {
            //return VideoCard(video);
            return (
              <li>
               <VideoCard></VideoCard>
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
    height: 300px

  li
    display: inline;
`;