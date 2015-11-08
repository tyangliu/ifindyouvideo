'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class UserWidget extends Component {

  render() {
    let video = this.props.video;
    return (
      <div style={styles.userWidget}>
        <div style={styles.avatar} />
        <div style={styles.nameDropdown}>
          <p style={styles.name}>Tom Liu</p>
          <i style={styles.dropdownIcon} className='material-icons'>arrow_drop_down</i>
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`
  avatar
    width: 26px
    height: 26px
    border-radius: 1000px
    background: rgba(255,255,255,1)
    float: left
    margin-right: 10px
    margin-top: -2px

  nameDropdown
    float: left
    color: rgba(255,255,255,1)

  name
    line-height: 26px
    font-size: 14px
    font-weight: 700
    float: left

  dropdownIcon
    line-height: 26px
    font-size: 20px
    margin-left: 6px

  clearfix
    clear: both
    display: table
`;
