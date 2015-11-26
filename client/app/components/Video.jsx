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
    const baseUrl = baseUrls.youtube;
    if (!document.getElementById('iframe')) {
      let iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'iframe');
      iframe.setAttribute('src', baseUrl + videoId + '?iv_load_policy=3');
      iframe.setAttribute('allowfullscreen', 'allowfullscreen');
      iframe.width = '1600px';
      iframe.height = '900px';
      iframe.style.position = 'absolute';
      iframe.style.top = 0;
      iframe.style.left = 0;
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      // wait some time before reflowing the DOM to avoid hiccup
      // with the CSS transition
      setTimeout(() => {
        let container = document.getElementById('iframeContainer');

        if (!container) return;

        while (container.hasChildNodes()) {
          container.removeChild(container.lastChild);
        }

        container.appendChild(iframe);
      }, 250);
    }
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
    height: 0
    overflow: hidden
    background: rgba(0,0,0,1)
`;
