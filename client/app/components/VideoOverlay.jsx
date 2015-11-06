'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoOverlay extends Component {

  getInitialState() {
    return {
      selected: false
    };
  }

  static defaultProps = {
    video: {
      title: 'Video Title',
      mapId: '1'
    }
  };

  handleClick = () => {
    this.setState({selected: true});
    console.log("Clicked: " + this.state.selected);
  }

  render() {
    //var overlayStyle = this.state.selected? styles.svideoOverlay:styles.VideoOverlay;
    console.log("Render: " + this.state.selected);
    return (
      <div style={styles.VideoOverlay}
          onClick={this.handleClick}>
        <div style={this.state.selected? styles.scaleLogoImg:styles.logoImg}></div>
        <div style={this.state.selected? styles.scaleContentBox: styles.contentBox}>
          <span style={styles.mapId}>{this.props.video.mapId}</span>
          <span style={styles.title}>{this.props.video.title}</span>
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }
}

const styles = styler`
  videoOverlay
    position: relative

  sVideoOverlay
    position: relative
    transform: scale(2,2)

  logoImg
    background: url(${require('../images/logo-red-outline-shadow.svg')}) no-repeat center;
    background-size: 60px
    width: 60px
    height: 60px
    margin-top: -5px
    position: absolute
    left: 0
    z-index: 10

  scaleLogoImg
    background: url(${require('../images/logo-red-outline-shadow.svg')}) no-repeat center;
    background-size: 60px
    width: 60px
    height: 60px
    transform: scale(1.2)
    transform-origin: 50% 100%
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

  scaleContentBox
    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.9) 72%,rgba(255,255,255,0.8) 100%)
    margin-left: 30px
    margin-top: 10px
    transform: scale(1.2)
    transform-origin: 0% 100%
    box-shadow: 0px 1px 2px rgba(0,0,0,0.4)
    border-radius: 3px
    float: left
    white-space: nowrap
    font-family: 'proxima-nova', sans-serif

  mapId
    font-size: 14px
    font-weight: 700
    line-height: 30px
    border-right: 1px solid rgba(0,0,0,0.1)
    padding: 0 10px 0 24px
    display: inline-block
    color: rgba(255,72,40,1)

  title
    font-size: 14px
    font-weight: 700
    line-height: 30px
    padding: 0 16px 0 10px
    display: inline-block
    color: rgba(76,76,76,1)

  clearfix
    clear: both
    display: table
`;
