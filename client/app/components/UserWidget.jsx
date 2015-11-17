'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import GoogleSignInButton from './GoogleSignInButton.jsx';

@Radium
export default class UserWidget extends Component {

  state = {
    authObj: null,
    popoverOpen: false
  };

  setAuthObj = authObj => this.setState({ authObj });

  handleBaseClick = event => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleOuterClick = event => {
    this.setState({ popoverOpen: false });
  };

  handlePopoverClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOuterClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOuterClick);
  }

  render() {
    const { authObj, popoverOpen } = this.state;
    const isSignedIn = authObj && authObj.isSignedIn.get();

    let els = [
      <div key='signInButtonContainer'
           style={styles.buttonContainer[isSignedIn ? 'hidden' : 'normal']}>
        <GoogleSignInButton setAuthObj={this.setAuthObj} />
      </div>
    ];

    if (isSignedIn) {
      let profile = authObj.currentUser.get().getBasicProfile()
        , name = profile.getName()
        , avatarUrl = profile.getImageUrl() || require('../images/default-avatar.svg');

      els.push(
        <div style={styles.userWidget} key='userWidget'>
          <div style={[styles.avatar, {
                 backgroundImage: `url(${avatarUrl})`,
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center'
               }]} />
          <div style={styles.nameDropdown} onClick={this.handleBaseClick}>
            <p style={styles.name}>{name}</p>
            <i style={styles.dropdownIcon} className='material-icons'>arrow_drop_down</i>
          </div>
          <div onClick={this.handlePopoverClick}
               style={styles.popover[popoverOpen ? 'open' : 'hidden']}>
            <ul>
              <li style={styles.popoverItem}
                  onClick={() => {
                    this.setState({popoverOpen: false});
                    authObj.signOut();
                  }}>
                Sign Out
              </li>
            </ul>
          </div>
          <div style={styles.clearfix} />
        </div>
      );
    }

    return (
      <div>{els}</div>
    );
  }

}

const styles = styler`
  userWidget
    margin-top: 4px
    position: relative

  buttonContainer
    position: absolute
    top: 0
    right: 0
    width: 166px
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out, background 0.15s ease-in-out

    &normal
      background: rgba(240,53,78,0)
      opacity: 1
      transform: scale(1)
      pointer-events: auto

    &hidden
      background: rgba(240,53,78,1)
      opacity: 0
      transform: scale(1.04)
      pointer-events: none

  avatar
    width: 26px
    height: 26px
    border-radius: 1000px
    background-color: rgba(255,255,255,1)
    border: 2px solid rgba(255,255,255,1)
    float: left
    margin-right: 10px

  nameDropdown
    float: left
    color: rgba(255,255,255,1)
    cursor: pointer
    user-select: none

  name
    line-height: 26px
    font-size: 14px
    font-weight: 700
    float: left

  dropdownIcon
    line-height: 26px
    font-size: 20px
    margin-left: 6px

  popover
    position: absolute
    top: 40px
    right: 0
    width: 160px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.9) 100%)
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.1)
    border-radius: 3px
    padding: 10px 16px
    transform-origin: 100% 0%
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out

    &hidden
      opacity: 0
      pointer-events: none
      transform: translateY(-5%) scale(0.85)

    &open
      opacity: 1
      pointer-events: auto
      transform: translateY(0) scale(1)

  popoverItem
    font-size: 12px
    font-weight: 700
    line-height: 21px
    text-transform: uppercase
    letter-spacing: 1px
    color: rgba(255,72,40,0.8)
    cursor: pointer

  clearfix
    clear: both
    display: table
`;
