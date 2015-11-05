'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoModal extends Component {

  render() {
    let video = this.props.video;
    return (
      <div style={styles.userWidget}>
        <div style={styles.avatar} />
        <div style={styles.nameDropdown}>
          <p style={styles.name}>Tom Liu</p>
          <i style={styles.dropdownIcon} className='material-icons'>keyboard_arrow_down</i>
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`

`;
