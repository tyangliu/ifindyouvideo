'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoOverlay extends Component {

  static defaultProps = {
    video: {
      title: 'asd',
      mapId: '1'
    }
  };

  render() {
    return (
      <div style={styles.videoOverlay}>
        <div style={styles.logoImg}></div>
        <div style={styles.contentBox}>
          <p style={styles.mapId}>{this.props.video.mapId}</p>
          <p style={styles.title}>{this.props.video.title}</p>
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }
}

const styles = styler`
  videoOverlay
    position: relative

  logoImg
    background: url(${require('../images/logo-red-outline-shadow.svg')}) no-repeat center;
    background-size: 65px
    width: 50px
    height: 65px
    margin-top: -5px
    position: absolute
    left: 0
    z-index: 10

  contentBox
    background: rgba(255,255,255,1)
    margin-left: 15px
    margin-top: 10px
    box-shadow: 0px 0px 2px 1px rgba(180,180,180,1)
    float: left

  mapId
    display: inline-block
    border-right: 1px solid rgba(180,180,180,1)
    line-height: 30px
    padding: 0 10px 0 35px
    color: rgba(239,48,81,1)

  title
    display: inline-block
    line-height: 30px
    padding: 0 10px
    font-weight: 700
    color: rgba(102,102,102,1)

  clearfix
    clear: both
    display: table
`;
