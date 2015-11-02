'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';



@Radium
export default class VideoOverlay extends Component {

  static defaultProps = {
    video: {
      title: 'asd',
      mapId: '1'
    }
  };

  render() {
    return (
      <div>
        <img src="../images/logo-white.svg"/>
          <span>{this.props.video.title}</span>
          <span>{this.props.video.mapId}</span>
      </div>
    );
  }
}