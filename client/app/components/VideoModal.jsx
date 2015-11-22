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
      width: Math.round((height - 170 - 80) * 16/9),
      height: height - 80,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };
  };

  state = this.calcDimensions();

  static defaultProps = {
    isOpen: false,
    video: {}
  };

  rateVideo = rating => {
    const { authObj, video } = this.props
        , isSignedIn = authObj && authObj.isSignedIn.get();

    if ( !isSignedIn || !video ) return;

    const accessToken = authObj.currentUser.get().getAuthResponse().access_token
        , { videoId } = video;

    let req = new XMLHttpRequest();
    req.open("POST", `https://www.googleapis.com/youtube/v3/videos/rate?id=${videoId}&rating=${rating}`, true);
    req.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = () => {console.log("Success")};
    req.send();

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

  handleBaseClick = event => {
    this.setState({ detailsOpen: !this.state.detailsOpen });
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleOuterClick = event => {
    this.setState({ detailsOpen: false });
  };

  handlePopoverClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('click', this.handleOuterClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('click', this.handleOuterClick);
  }

  render() {
    const {isOpen, index: mapId} = this.props
        , {width, height, windowWidth, windowHeight, detailsOpen} = this.state;

    let video = this.props.video || {};

    const { title, thumbnails, publishedAt, statistics, channel, description } = video
        , viewCount = statistics ? statistics.viewCount : 0
        , channelTitle = channel ? channel.title : '';

    const publishedAtStr = publishedAt ? (new XDate(publishedAt)).toString('MMM M, yyyy') : ''
        , viewCountStr   = viewCount ? formatCount(roundCount(viewCount)) : 0;

    return (
      <div style={styles.modalContainer}>
        <div style={styles.overlay[isOpen ? 'open' : 'hidden']} onClick={this.handleClose} />
        <div style={[styles.modal[isOpen ? 'open' : 'hidden'], {
                     width,
                     height,
                     top: (windowHeight - height) / 2,
                     left: (windowWidth - width) / 2
                   }]}>
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

            <button style={[styles.actionButton.normal, styles.buttonLeft]} onClick={() => this.rateVideo('like')}>
              <i className='material-icons' style={styles.infoBarIcon}>thumb_up</i>
              <span style={[styles.infoBarText, {float: 'left'}]}>Like</span>
            </button>

            <button style={[styles.actionButton.normal, styles.buttonLeft]} onClick={ () => this.rateVideo('dislike')}>
              <i className='material-icons' style={styles.infoBarIcon}>thumb_down</i>
              <span style={[styles.infoBarText, {float: 'left'}]}>Dislike</span>
            </button>

            <button style={[styles.actionButton[detailsOpen ? 'active' : 'normal'], styles.buttonRight]}
                    onClick={this.handleBaseClick}>
              <i className='material-icons'
                 style={[
                   styles.infoBarIcon,
                   styles.popoverIcon[detailsOpen ? 'flipped' : 'normal']
                 ]}>
                keyboard_arrow_up
              </i>
              <span style={[styles.infoBarText, {float: 'left'}]}>More Details</span>
            </button>

          </div>
          <div style={styles.moreDetails[detailsOpen ? 'open' : 'hidden']} onClick={this.handlePopoverClick}>
            <div style={styles.descriptionContainer}>
              <h3 style={styles.detailLabel}>Description</h3>
              <p style={styles.contentBody}>
                {description}
              </p>
              <div style={styles.contentBodyCover} />
            </div>
            <div style={styles.sidebarContainer}>
            </div>
            <div style={styles.clearfix} />
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
    transition: opacity 0.3s ease-in-out

    &open
      pointer-events: auto
      opacity: 1

    &hidden
      opacity: 0

  modal
    position: absolute
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    border-radius: 3px
    background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.9) 100%)
    padding: 0
    overflow: hidden
    z-index: 21
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out

    &open
      pointer-events: auto
      opacity: 1
      transform: translate(0)

    &hidden
      opacity: 0
      transform: translate(0, 100%)

  info
    height: 120px
    width: 100%

  heading
    padding: 22px 18px 20px

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
    margin-top: 0px
    float: right
    cursor: pointer

  details
    margin: 20px -18px 0
    border-top: 1px solid rgba(0,0,0,0.18)

  infoBar
    float: left
    padding: 10px 23px 0

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
    font-size: 13px
    text-transform: uppercase
    letter-spacing: 1px
    white-space: nowrap

  actionBar
    width: 100%
    height: 50px
    border-top: 1px solid rgba(190,190,190,1)

  actionButton
    border-top: none
    border-bottom: none
    outline: none
    font-family: 'proxima-nova', sans-serif
    font-weight: 700
    font-size: 14px
    color: rgba(0,0,0,0.6)
    padding: 12px 23px
    cursor: pointer

    &normal
      background: rgba(255,255,255,0)

    &active
      background: linear-gradient(to top, rgba(215,215,215,1) 0%,rgba(215,215,215,1) 93%, rgba(195,195,195,1) 100%)

  buttonLeft
    border-left: none
    border-right: 1px solid rgba(0,0,0,0.18)
    float: left

  buttonRight
    border-left: 1px solid rgba(0,0,0,0.18)
    border-right: none
    float: right

  popoverIcon
    transition: transform 0.15s ease-in-out
    font-size: 24px
    margin-left: -10px
    margin-top: -1px

    &normal
      transform: rotate(0deg)

    &flipped
      transform: rotate(180deg)


  moreDetails
    position: absolute
    left: 0
    right: 0
    bottom: 50px
    height: 250px
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out
    transform-origin: 100% 100%
    box-shadow: 0 -1px 2px rgba(0,0,0,0.15)

    &open
      opacity: 1
      pointer-events: auto
      transform: scale(1)

    &hidden
      opacity: 0
      pointer-events: none
      transform: scale(0.5, 0.3)

  descriptionContainer
    width: 70%
    padding: 23px 30px 23px 23px
    border-right: 1px solid rgba(180,180,180,0.8)
    background: linear-gradient(to bottom, rgba(255,255,255,.95) 0%, rgba(255,255,255,.95) 80%, rgba(255,255,255,0.9) 100%)
    position: relative
    overflow: hidden
    height: 100%
    float: left

  detailLabel
    font-size: 16px
    font-weight: 700
    text-transform: uppercase
    letter-spacing: 1px
    margin-bottom: 16px
    color: rgba(0,0,0,0.4)

  contentBody
    white-space: pre-wrap
    font-size: 14px

  contentBodyCover
    background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)
    position: absolute
    bottom: 0
    left: 0
    right: 0
    height: 20%

  sidebarContainer
    width: 30%
    height: 100%
    padding: 20px 23px
    background: rgba(255,255,255,0.95)
    float: left

  clearfix
    clear: both
    display: table
`;
