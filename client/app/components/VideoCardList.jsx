'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoCardList extends Component{

  static defaultProps = {
    videos: [
      {
        videoId: 1,
        title: "Title 1",
        mapId: "MapId 1"
      },
      {
        videoId: 2,
        title: "Title 2",
        mapId: "MapId 2"
      },
      {
        videoId: 1,
        title: "Title 2",
        mapId: "MapId 2"
      }
    ]
  }

  render() {
    let videoList = this.props.videos;

    return (
      <div>
        <ol>
          {videoList.map(function(video) {
            //return VideoCard(video);
            return (
              <li>
               <div>{video.videoId}</div>
               <div>{video.title}</div>
               <div>{video.mapId}</div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

}

const styles = styler`
`;