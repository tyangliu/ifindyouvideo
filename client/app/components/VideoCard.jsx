'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import XDate from 'xdate';

function roundCount(x) {
  let len = x.toString().length
    , magnitude = Math.pow(10, len - 1);

  return Math.floor(x / magnitude) * magnitude;
}

function formatCount(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@Radium
class VideoCard extends Component {

  static defaultProps = {
    isActive: false,
    ignoreClicks: false,
    video: {
      title: 'Video Title',
      thumbnails: {}
    }
  };

  handleClick = () => {
    this.props.ignoreClicks || this.props[this.props.isActive ? 'setOpenVideo' : 'setActiveVideo'](this.props.index);
  };

  render() {
    const {video, isActive, index: mapId} = this.props
        , {title, thumbnails, publishedAt, statistics } = video
        , { viewCount } = statistics
        , { url: thumbnailUrl } = thumbnails.high || thumbnails.medium || thumbnails.default;

    const publishedAtStr = (new XDate(publishedAt)).toString('MMM M, yyyy')
        , viewCountStr   = viewCount ? formatCount(roundCount(viewCount)) : 0;

    return (
      <div style={styles.videoCard[isActive ? 'active' : 'normal']} onClick={this.handleClick}>
        <div style={styles.heading}>
          <div style={styles.idContainer}>
            <div style={styles.mapIcon} />
            <p style={styles.mapId}>{mapId}</p>
          </div>
          <h2 style={styles.title}>{title}</h2>
          <div style={styles.details}>
            <p style={[styles.infoBar, styles.date]}>
              <i className='material-icons' style={styles.infoBarIcon}>event</i>
              <span style={styles.infoBarText}>
                {publishedAtStr}
              </span>
            </p>
            <p style={styles.infoBar}>
              <span style={[styles.infoBarText, {float: 'right'}]}>
                {viewCountStr}+ Views
              </span>
            </p>
            <div style={styles.clearfix} />
          </div>
        </div>
        <div style={styles.clearfix} />
        <div style={[styles.thumbnail, {
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: 'cover'
        }]} />
      </div>
    );
  }

}

export default Relay.createContainer(VideoCard, {
  fragments: {
    video: () => Relay.QL`
      fragment on Video {
        thumbnails {
          default { url, width, height },
          high { url, width, height },
          medium { url, width, height },
          standard { url, width, height },
          maxres { url, width, height }
        },
        statistics {
          viewCount,
          likeCount
        },
        title,
        publishedAt
      }
    `
  }
});

const styles = styler`
  videoCard
    width: 340px
    height: 100%
    overflow: hidden
    position: relative
    display: inline-block
    transition: transform 0.12s ease-in-out, z-index 0.12s ease-in-out, border-radius 0.12s ease-in-out
    transform-origin: 50% 100%

    &normal
      box-shadow: 0 1px 2px rgba(0,0,0,0.2)
      transform: scale(1) translateY(0)

    &active
      transform: scale(1.05) translateY(-14px)
      z-index: 20
      box-shadow: 0px 0px 4px 3px rgba(240,53,78,0.7)
      border-radius: 3px

  heading
    height: 93px
    padding: 18px 14px 14px
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0.9) 100%)
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    border-right: 1px solid rgba(0,0,0,0.1)
    position: relative
    z-index: 10

  title
    color: rgba(90,90,90,1)
    font-size: 16px
    line-height: 18px
    font-weight: 700
    float: left
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    max-width: 240px

  details
    width: 340px
    margin: 36px -14px 0
    border-top: 1px solid rgba(0,0,0,0.1)

  infoBar
    float: left
    width: 50%
    padding: 7px 15px

  infoBarIcon
    float: left
    display: block
    font-size: 16px
    line-height: 24px
    margin-right: 8px
    margin-left: -2px
    text-align: left
    color: rgba(0,0,0,0.4)

  infoBarText
    display: block
    line-height: 24px
    color: rgba(0,0,0,0.6)
    font-size: 11px
    text-transform: uppercase
    letter-spacing: 1px

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

  thumbnail
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    background-color: rgba(240,53,78,1)
    opacity: 0.9
    z-index: 0

  clearfix
    clear: both
    display: table
`;
