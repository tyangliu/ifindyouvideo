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

  render() {
    const {videoId} = this.props
        , baseUrl = baseUrls.youtube;
    return (
      <div style={styles.video}>
        <iframe src={baseUrl + videoId}
                style={styles.iFrame}
                height='900px' width='1600px'
                allowFullScreen=''
                frameBorder='0' />
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
