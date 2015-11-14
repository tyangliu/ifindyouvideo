'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

const baseUrls = {
  youtube: 'http://www.youtube.com/embed/'
};

@Radium
export default class Video extends Component {

  static defaultProps = {
    videoSource: 'youtube',
    videoId: 'CxOIBgE1Z0o'
  };

  // build the youtube iframe outside of the DOM, then append to
  // avoid browser history spam from iframe
  makeFrame = videoId => {
    if (!videoId) return;

    const baseUrl = baseUrls.youtube;

    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', baseUrl + videoId);
    iframe.style.position = 'absolute';
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    document.getElementById('iframeContainer').appendChild(iframe);
  }

  componentDidMount() {
    this.makeFrame(this.props.videoId);
  }

  componentWillReceiveProps(nextProps) {
    this.makeFrame(nextProps.videoId);
  }

  render() {
    const {videoId} = this.props
        , baseUrl = baseUrls.youtube;
    return (
      <div style={styles.video}>
        <div id='iframeContainer' />
      </div>
    );
  }

}

const styles = styler`
  video
    position: relative
    padding-bottom: 56.25%
    padding-top: 35px
    height: 0
    overflow: hidden
    background: rgba(0,0,0,1)

  iFrame
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
`;
