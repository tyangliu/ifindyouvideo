'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import config from '../config.js';

@Radium
export default class GoogleSignInButton extends Component {

  componentDidMount() {
    const { setAuthObj } = this.props;

    if (!document.getElementById('google-platform-script')) {
      let platform = document.createElement('script');
      platform.id = 'google-platform-script';
      platform.src = 'https://apis.google.com/js/api:client.js';
      
      document.head.appendChild(platform);

      platform.onload = () => gapi.load('auth2', () => {

        let auth2 = gapi.auth2.init({
          client_id: config.clientId,
          cookiepolicy: 'single_host_origin',
          scope: 'https://www.googleapis.com/auth/youtube'
        });

        auth2.isSignedIn.listen(() => setAuthObj(auth2));

        let btn = document.getElementById('google-sign-in-button');

        auth2.attachClickHandler(btn, {}, googleUser => {
          setAuthObj(auth2);
        }, err => {
          console.error(JSON.stringify(err, undefined, 2));
        });
      });
    }
  }

  render() {
    return (
      <div style={styles.signInButton} id='google-sign-in-button'>
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
