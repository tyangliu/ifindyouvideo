'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoOverlay extends Component {

  static defaultProps = {
    isActive: false,
    video: {
      title: 'Video Title',
      mapId: '1'
    }
  };

  handleClick = () => this.props[this.props.isActive ? 'setOpenVideo' : 'setActiveVideo'](this.props.index);

  render() {
    const {video, isActive, index: mapId} = this.props;

    return (
      <div style={styles.videoOverlay[isActive ? 'active' : 'normal']} onClick={this.handleClick}>
        <div style={styles.logoImg}></div>
        <div style={styles.contentBox[isActive ? 'active' : 'normal']}>
          <span style={styles.mapId}>{mapId}</span>
          <span style={styles.title}>{video.title}</span>
          <div style={styles.clearfix} />
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }
}

const styles = styler`
  videoOverlay
    position: relative
    transition: transform 0.12s ease-in-out, z-index 0.12s ease-in-out
    transform-origin: 0% 50%

    &normal
      transform: scale(1) translate(-29px, -45px)

    &active
      transform: scale(1.15) translate(-29px, -45px)
      z-index: 20

  logoImg
    background-image: url(${require('../images/logo-red-outline-shadow.svg')});
    background-position: center
    background-repeat: no-repeat
    background-size: 60px
    width: 60px
    height: 60px
    margin-top: -5px
    position: absolute
    left: 0
    z-index: 10

  contentBox
    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.9) 72%,rgba(255,255,255,0.8) 100%)
    margin-left: 30px
    margin-top: 10px
    box-shadow: 0px 1px 2px rgba(0,0,0,0.4)
    border-radius: 3px
    float: left
    white-space: nowrap
    font-family: 'proxima-nova', sans-serif

    &normal
      box-shadow: 0px 1px 2px rgba(0,0,0,0.4)

    &active
      box-shadow: 0px 0px 4px 2px rgba(240,53,78,0.7)

  mapId
    font-size: 14px
    font-weight: 700
    line-height: 30px
    border-right: 1px solid rgba(0,0,0,0.1)
    padding: 0 10px 0 24px
    display: block
    float: left
    color: rgba(255,72,40,1)

  title
    font-size: 14px
    font-weight: 700
    line-height: 30px
    padding: 0 16px 0 10px
    display: block
    color: rgba(90,90,90,1)
    max-width: 280px
    overflow-x: hidden
    text-overflow: ellipsis

  clearfix
    clear: both
    display: table
`;
