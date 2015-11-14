'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import Video from './Video.jsx';

@Radium
class VideoModal extends Component {

  calcDimensions = () => {
    let width = window.innerWidth
      , height = window.innerHeight;

    return {
      width: width - 80,
      height: (width - 300 - 80) * 9/16
    };
  };

  state = this.calcDimensions();

  static defaultProps = {
    isOpen: false,
    video: {}
  };

  handleKeyUp = event => {
    const ESC = 27;
    if (event.key == ESC || event.code == 'Escape' || event.keyCode == ESC) {
      this.props.setOpenVideo(null);
    }
  };

  handleResize = event => this.setState(this.calcDimensions());

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const {isOpen, index: mapId} = this.props
        , {width, height} = this.state;

    let video = this.props.video || {};

    return (
      <div style={styles.modalContainer}>
        <div style={styles.overlay[isOpen ? 'open' : 'hidden']} />
        <div style={[styles.modal[isOpen ? 'open' : 'hidden'], {width, height}]}>
          <div style={{
                 width: width - 300 + 'px',
                 height: height + 'px',
                 float: 'left'
               }}>
            {isOpen ? <Video videoId={video.videoId} /> : null}
          </div>
          <div style={styles.info}>
            <div style={styles.heading}>
              <div style={styles.idContainer}>
                <div style={styles.mapIcon} />
                <p style={styles.mapId}>{mapId}</p>
              </div>
              <h2 style={styles.title}>{video.title}</h2>
            </div>
          </div>
          <div style={styles.clearfix} />
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(VideoModal, {
  fragments: {
    video: () => Relay.QL`
      fragment on Video {
        videoId: rawId,
        title,
        description,
        statistics {
          viewCount,
          likeCount
        },
        location {
          latitude,
          longitude
        }
      }
    `
  }
});

const styles = styler`
  modalContainer
    pointer-events: none

  overlay
    position: fixed
    zIndex: 20
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: rgba(0,0,0,0.7)
    transition: opacity 0.15s ease-in-out

    &open
      pointer-events: auto
      opacity: 1

    &hidden
      opacity: 0

  modal
    position: absolute
    boxShadow: 0 1px 2px rgba(0,0,0,0.2)
    top: 50%
    left: 50%
    backgroundColor: rgba(255,255,255,1)
    padding: 0
    overflow: hidden
    z-index: 21
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out

    &open
      pointer-events: auto
      opacity: 1
      transform: translate(-50%, -50%)

    &hidden
      opacity: 0
      transform: translate(-50%, 100%)

  info
    float: right
    width: 300px

  heading
    padding: 14px

  title
    color: rgba(90,90,90,1)
    font-size: 16px
    line-height: 18px
    font-weight: 700
    float: left
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    max-width: 220px

  idContainer
    float: left
    padding-right: 10px
    margin-right: 10px
    border-right: 1px solid rgba(0,0,0,0.2)

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
    font-weight: 700
    color: rgba(255,72,40,1)

  clearfix
    clear: both
    display: table
`;
