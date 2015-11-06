'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoModal extends Component {

  render() {
    return (
      <div style={styles.Modal}>
        <div style={styles.nameDropdown}>
          <p style={styles.name}>uploader</p>
          <p style={styles.name}>location</p>
        </div>
        <div style={styles.} />
      </div>
    );
  }



}


const styles = styler`
  video
  title
  date
  uploader
  location
  description

`;
