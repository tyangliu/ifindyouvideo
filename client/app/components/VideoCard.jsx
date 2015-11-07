'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
class VideoCard extends Component {

  state = {
    selected:false
  };

  static defaultProps = {
    video: {
      title: 'Video Title',
      mapId: 35,
      thumbnailUrl: "testURL",
      views: 100,
      likes: 500
    }
  };

  handleClick = () => {
    this.setState({selected: true});
  }

  render() {
    let video = this.props.video;
    return (
      <div style={this.state.selected ? styles.scaleVideoCard:styles.videoCard} onClick={this.handleClick}>
        <div style={styles.heading}>
          <h2 style={styles.title}>{this.props.video.title}</h2>
          <div style={styles.idContainer}>
            <div style={styles.mapIcon} />
            <p style={styles.mapId}>{this.props.video.mapId}</p>
          </div>
        </div>
        <div style={styles.clearfix} />
        <div style={[styles.thumbnail, {
          backgroundImage: `url(${this.props.video.thumbnailUrl})`,
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
          default {
            url,
            width,
            height
          }
        },
        statistics {
          viewCount,
          likeCount
        },
        title
      }
    `
  }
});

const styles = styler`
  videoCard
    border-top: 7px solid rgba(255,72,40,0.8)
    width: 100%
    height: 100%
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    overflow: hidden
    position: relative

  scaleVideoCard
    border-top: 7px solid rgba(255,72,40,0.8)
    width: 100%
    height: 100%
    transform: scale(1.1)
    transform-origin: 0% 100%
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    overflow: hidden
    position: relative

  heading
    height: 76px
    padding: 14px
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0.9) 100%)
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)
    border-right: 1px solid rgba(0,0,0,0.1)
    position: relative
    z-index: 10

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
