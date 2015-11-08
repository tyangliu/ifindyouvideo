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
  };

  state = {
    windowWidth: window.innerWidth,
    scrollPosition: 0,
    deltaX: 0,
    mouseDown: false,
    shouldTransition: true,
    mousePosition: 0
  };

  handleMouseDown = event => this.setState({
    mouseDown: true,
    mousePosition: event.clientX,
    deltaX: 0
  });

  handleMouseUp = event => this.setState({
    mouseDown: false,
    mousePosition: event.clientX
  });

  handleMouseMove = event => {
    if (this.state.mouseDown) {
      let prevPosition = this.state.mousePosition;
      this.setState({mousePosition: event.clientX});
      this.updateScrollPosition(prevPosition - event.clientX);
    }
  };

  handleTouchStart = event => this.setState({
    mouseDown: true,
    mousePosition: event.changedTouches[0].clientX,
    deltaX: 0
  });

  handleTouchEnd = event => this.setState({
    mouseDown: false,
    mousePosition: event.changedTouches[0].clientX
  });

  handleTouchMove = event => {
    if (this.state.mouseDown) {
      let prevPosition = this.state.mousePosition
        , touchObj = event.changedTouches[0];
      this.setState({mousePosition: touchObj.clientX});
      this.updateScrollPosition(prevPosition - touchObj.clientX);
    }
  };

  handleWheel = event => this.updateScrollPosition(
    Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
  );

  scrollToCard = index => {
    if (index > 0 && index < this.props.videos.length + 1) {
      let newPos = this.normalizePosition((index - 1) * 320 + 320/2 - window.innerWidth/2);
      this.setState({scrollPosition: newPos, shouldTransition: true});
    }
  };

  updateScrollPosition = deltaX => {
    let newPos = this.normalizePosition(this.state.scrollPosition + deltaX);
    this.setState({
      scrollPosition: newPos,
      shouldTransition: false,
      // refresh deltaX only if new abs(deltaX) > 2,
      // used to ensure that mouse drag scrolling does not trigger a card click
      deltaX: (Math.abs(deltaX) > 2) ? deltaX : this.state.deltaX
    });
  };

  normalizePosition = pos => {
    let minPos = 0
      , maxPos = this.props.videos.length * 320 - window.innerWidth
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
                 ignoreClicks={Math.abs(this.state.deltaX) > 0}
                 setActiveVideo={setActiveVideo} />
    );

    return (
      <div style={styles.videoCardListContainer}>
        <div style={styles.border} />
        <div style={[styles.videoCardList, {
               width: videoCards.length * 320 + 'px',
               marginLeft: 0 - this.state.scrollPosition + 'px',
               transition: this.state.shouldTransition ? 'margin-left 0.15s linear' : null
             }]}
             onWheel={this.handleWheel}
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseLeave={this.handleMouseUp}
             onMouseMove={this.handleMouseMove}
             onTouchStart={this.handleTouchStart}
             onTouchEnd={this.handleTouchEnd}
             onTouchMove={this.handleTouchMove}>
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
    pointer-events: none

  border
    position: absolute
    top: 36px
    left: 0
    width: 100%
    height: 7px
    background: rgba(255,72,40,0.8)

  videoCardList
    min-width: 100%
    height: 220px
    box-shadow: 0 -1px 2px rgba(0,0,0,0.2)
    background: rgba(255,255,255,0.9)
    white-space: nowrap
    pointer-events: auto

  clearfix
    clear: both
    display: table
`;
