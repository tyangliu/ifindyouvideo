'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoCard extends Component {

  static defaultProps = {
    video: {
      title: 'Video Title',
      mapId: 35,
      thumbnailURL: "testURL",
      views: 100,
      likes: 500
    }
  };

  render() {
    let video = this.props.video;
    return (
      <div style={styles.videoCard}>
        <div style={styles.heading}>
          <h2 style={styles.title}>{this.props.video.title}</h2>
          <div style={styles.idContainer}>
            <div style={styles.mapIcon} />
            <p style={styles.mapId}>{this.props.video.mapId}</p>
          </div>
        </div>
        <div style={styles.clearfix} />
        <div style={styles.thumbnail} />
      </div>
    );
  }

}

const styles = styler`
  videoCard
    width: 100%
    height: 100%
    position: relative

  heading
    height: 76px
    padding: 14px
    border-right: 1px solid rgba(0,0,0,0.1)

  title
    color: rgba(76,76,76,1)
    font-size: 16px
    line-height: 18px
    font-weight: 700
    float: left

  idContainer
    float: right

  mapIcon
    background: url(${require('../images/logo-red.svg')}) no-repeat center
    width: 14px
    height: 18px
    float: left
    margin-right: 5px

  mapId
    float: left
    line-height: 18px
    font-size: 14px
    color: rgba(239,46,81,1)

  thumbnail
    position: absolute
    width: 100%
    top: 76px
    bottom: 0
    left: 0
    background: rgba(41,171,226,1)

  clearfix
    clear: both
    display: table
`;
