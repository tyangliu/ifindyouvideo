'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import VideoCard from './VideoCard.jsx';

@Radium
class VideoCardList extends Component {

  static defaultProps = {
    videos: []
  }

  state = {
    windowWidth: window.innerWidth,
    scrollPosition: 0,
    mouseDown: false,
    mousePosition: 0
  }

  handleMouseDown = event => this.setState({mouseDown: true, mousePosition: event.clientX});
  handleMouseUp   = event => this.setState({mouseDown: false, mousePosition: event.clientX});
  handleMouseMove = event => {
    if (this.state.mouseDown) {
      let prevPosition = this.state.mousePosition;
      this.setState({mousePosition: event.clientX});
      this.updateScrollPosition(prevPosition - event.clientX);
    }
  };

  handleWheel = event => this.updateScrollPosition(event.deltaY);

  scrollToCard = index => {
    if (index > 0 && index < this.props.videos.length + 1) {
      let newPos = this.normalizePosition((index - 1) * 320);
      this.setState({scrollPosition: newPos});
    }
  };

  updateScrollPosition = deltaX => {
    let newPos = this.normalizePosition(this.state.scrollPosition + deltaX);
    this.setState({scrollPosition: newPos});
  };

  normalizePosition = pos => {
    let minPos = 0, maxPos = this.props.videos.length * 320 - window.innerWidth
      , newPos = pos;

    maxPos = (maxPos < 0) ? 0 : maxPos;

    if (newPos < minPos) { newPos = minPos; }
    if (newPos > maxPos) { newPos = maxPos; }

    return newPos;
  };

  // reset the scroll position based on the new window width
  handleResize = event => this.updateScrollPosition(0);

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeVideo !== this.props.activeVideo) {
      this.scrollToCard(nextProps.activeVideo);
    }
  }

  render() {
    const {activeVideo, setActiveVideo, videos} = this.props;

    let videoCards = videos.map((video, index) =>
      <VideoCard video={video} key={index + 1} index={index + 1}
                 isActive={(index + 1) === activeVideo}
                 setActiveVideo={setActiveVideo} />
    );

    return (
      <div style={styles.videoCardListContainer}
           onWheel={this.handleWheel}
           onMouseDown={this.handleMouseDown}
           onMouseUp={this.handleMouseUp}
           onMouseLeave={this.handleMouseUp}
           onMouseMove={this.handleMouseMove}>
        <div style={styles.border} />
        <div style={[styles.videoCardList, {
            width: videoCards.length * 320 + 'px',
            marginLeft: 0 - this.state.scrollPosition + 'px',
            transition: this.state.mouseDown ? null : 'margin-left 0.15s linear'
          }]}>
          {videoCards}
          <div style={styles.clearfix} />
        </div>
      </div>
    );
  }

}

export default Relay.createContainer(VideoCardList, {
  fragments: {
    videos: () => Relay.QL`
      fragment on Video @relay(plural: true) {
        ${VideoCard.getFragment('video')}
      }
    `
  }
});

const styles = styler`
  videoCardListContainer
    width: 100%
    padding-top: 36px
    height: 256px
    overflow-x: hidden
    overflow-y: hidden
    user-select: none

  border
    position: absolute
    top: 36px
    left: 0
    width: 100%
    height: 7px
    background: rgba(255,72,40,0.8)

  videoCardList
    min-width: 100%
    height: 240px
    box-shadow: 0 -1px 2px rgba(0,0,0,0.2)
    background: rgba(255,255,255,0.9)
    white-space: nowrap
    pointer-events: auto

  clearfix
    clear: both
    display: table
`;
