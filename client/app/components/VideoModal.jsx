'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import XDate from 'xdate';
import Video from './Video.jsx';
import { roundCount, formatCount } from '../utils/numUtils.js';

@Radium
class VideoModal extends Component {

  calcDimensions = () => {
    let width = window.innerWidth
      , height = window.innerHeight;

    return {
      width: (height - 170 - 80) * 16/9,
      height: height - 80
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

  handleClose = () => {
    this.props.setOpenVideo(null);
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

    const {title, thumbnails, publishedAt, statistics, channel } = video
        , viewCount = statistics ? statistics.viewCount : 0
        , channelTitle = channel ? channel.title : '';

    const publishedAtStr = publishedAt ? (new XDate(publishedAt)).toString('MMM M, yyyy') : ''
        , viewCountStr   = viewCount ? formatCount(roundCount(viewCount)) : 0;

    return (
      <div style={styles.modalContainer}>
        <div style={styles.overlay[isOpen ? 'open' : 'hidden']} onClick={this.handleClose} />
        <div style={[styles.modal[isOpen ? 'open' : 'hidden'], {width, height}]}>
          <div style={styles.info}>
            <div style={styles.heading}>
              <div>
                <div style={styles.idContainer}>
                  <div style={styles.mapIcon} />
                  <p style={styles.mapId}>{mapId}</p>
                </div>
                <h2 style={[styles.title, {width: width - 165 + 'px'}]}>{video.title}</h2>
                <i style={styles.closeIcon} className='material-icons' onClick={this.handleClose}>
                  close
                </i>
                <div style={styles.clearfix} />
              </div>
              <div style={styles.details}>
                <p style={styles.infoBar}>
                  <i className='material-icons' style={styles.infoBarIcon}>event</i>
                  <span style={styles.infoBarText}>
                    {publishedAtStr}
                  </span>
                </p>
                <p style={[styles.infoBar, {marginLeft: '10px'}]}>
                  <i className='material-icons' style={styles.infoBarIcon}>face</i>
                  <span style={styles.infoBarText}>
                    {channelTitle}
                  </span>
                </p>
                <p style={[styles.infoBar, {float: 'right'}]}>
                  <span style={[styles.infoBarText, {float: 'right'}]}>
                    {viewCountStr}+ Views
                  </span>
                </p>
                <div style={styles.clearfix} />
              </div>
            </div>
          </div>
          <div style={{
                 width: width + 'px',
                 height: height - 170 + 'px'
               }}>
            {isOpen ? <Video videoId={video.videoId} /> : null}
          </div>
          <div style={styles.actionBar}>

            <button style={[styles.actionButton, styles.buttonLeft]}>
              <i className='material-icons' style={styles.infoBarIcon}>thumb_up</i>
              <span style={[styles.infoBarText, {float: 'left'}]}>Like</span>
            </button>

            <button style={[styles.actionButton, styles.buttonLeft]}>
              <i className='material-icons' style={styles.infoBarIcon}>thumb_down</i>
              <span style={[styles.infoBarText, {float: 'left'}]}>Dislike</span>
            </button>

            <button style={[styles.actionButton, styles.buttonRight]}>
              <i className='material-icons' style={styles.infoBarIcon}>keyboard_arrow_up</i>
              <span style={[styles.infoBarText, {float: 'left'}]}>More Details</span>
            </button>

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
        publishedAt,
        channel {
          title
        },
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
    background-color: rgba(0,0,0,0.55)
    transition: opacity 0.15s ease-in-out

    &open
      pointer-events: auto
      opacity: 1

    &hidden
      opacity: 0

  modal
    position: absolute
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    border-radius: 3px
    top: 50%
    left: 50%
    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.9) 100%)
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
    height: 120px
    width: 100%

  heading
    padding: 20px 18px

  title
    color: rgba(90,90,90,1)
    font-size: 21px
    line-height: 30px
    font-weight: 700
    float: left
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  idContainer
    float: left
    padding-right: 16px
    margin-right: 16px
    border-right: 1px solid rgba(0,0,0,0.2)

  mapIcon
    background: url(${require('../images/logo-red.svg')}) no-repeat center
    width: 24px
    height: 30px
    float: left
    margin-right: 8px

  mapId
    float: left
    line-height: 30px
    font-size: 21px
    font-weight: 700
    color: rgba(255,72,40,1)

  closeIcon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 28px
    line-height: 30px
    margin-top: -2px
    float: right
    cursor: pointer

  details
    margin: 22px -18px 0
    border-top: 1px solid rgba(0,0,0,0.18)

  infoBar
    float: left
    padding: 11px 23px 0

  infoBarIcon
    float: left
    display: block
    font-size: 18px
    line-height: 27px
    margin-right: 8px
    margin-left: -2px
    text-align: left
    color: rgba(0,0,0,0.4)

  infoBarText
    display: block
    line-height: 27px
    color: rgba(0,0,0,0.6)
    font-size: 14px
    text-transform: uppercase
    letter-spacing: 1px
    white-space: nowrap

  actionBar
    width: 100%
    height: 50px

  actionButton
    background: none
    border: none
    outline: none
    font-family: 'proxima-nova', sans-serif
    font-weight: 700
    font-size: 14px
    color: rgba(0,0,0,0.6)
    padding: 12px 23px
    cursor: pointer

  buttonLeft
    border-right: 1px solid rgba(0,0,0,0.18)
    float: left

  buttonRight
    border-left: 1px solid rgba(0,0,0,0.18)
    float: right

  clearfix
    clear: both
    display: table
`;
