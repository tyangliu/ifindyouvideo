'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class GoogleSignInButton extends Component {

  render() {
    return (
      <div style={styles.signInButton}>
        <div style={styles.googleIcon} />
        <p style={styles.label}>Sign in with Google</p>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`
  signInButton
    border: 2px solid rgba(255,255,255,1)
    border-radius: 3px
    background: rgba(255,255,255,0)
    cursor: pointer

  googleIcon
    width: 25px
    height: 25px
    background-color: rgba(255,255,255,1)
    background-image: url(${require('../images/google-icon.svg')})
    background-repeat: no-repeat
    background-position: center
    float: left

  label
    line-height: 25px
    font-size: 12px
    font-weight: 700
    color: rgba(255,255,255,1)
    padding: 0 14px
    float: left

  clearfix
    clear: both
    display: table
`;
