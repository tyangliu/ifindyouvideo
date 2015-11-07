'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class MapHeader extends Component {

  render() {
    return (
      <div style={styles.mapHeader}>
        <section style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoImg} />
            <div style={styles.textualLogoImg} />
            <div style={styles.clearfix} />
          </div>
        </section>
        <section style={styles.optionsBar}>

        </section>
      </div>
    );
  }

}

const styles = styler`
  mapHeader
    position: absolute
    z-index: 10
    width: 100%
    top: 0
    pointer-events: auto

  header
    width: 100%
    background: linear-gradient(to bottom, rgba(239,46,81,0.9) 7%, rgba(240,53,78,0.9) 30%, rgba(244,76,70,0.9) 100%)


  logoContainer
    width: 173px
    padding: 14px 0
    margin-left: 20px

  logoImg
    width: 30px
    height: 42px
    background: url(${require('../images/logo-white.svg')}) no-repeat center
    float: left
    margin-right: 10px

  textualLogoImg
    height: 23px
    width: 133px
    background: url(${require('../images/logo-text-white.svg')}) no-repeat left center
    float: left
    margin-top: 11px

  optionsBar
    height: 44px
    background: rgba(255,255,255,0.9)
    box-shadow: 0 1px 2px rgba(0,0,0,0.2)

  clearfix
    clear: both
    display: table
`;
