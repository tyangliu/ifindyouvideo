'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import VideoOverlay from '../components/VideoOverlay.jsx'
@Radium
export default class Test extends Component {

  render() {
    return (
      <div>
        <div>Testing</div>
        <VideoOverlay/>
      </div>
    );
  }

}

const styles = styler`
`;
