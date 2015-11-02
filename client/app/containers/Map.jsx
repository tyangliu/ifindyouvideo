'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import GoogleMap from 'google-map-react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Map extends Component {

  static defaultProps = {
    center: {lat: 49.2827, lng: -123.1207},
    zoom: 12
  };

  render() {
    return (
      <div style={styles.map}>
        <GoogleMap defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
        </GoogleMap>
        <section style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoImg} />
            <div style={styles.textualLogoImg} />
            <div style={styles.clearfix} />
          </div>
        </section>
      </div>
    )
  }

}

const styles = styler`
  map
    width: 100%
    height: 100vh
    position: relative
    overflow-y: hidden

  header
    position: absolute
    z-index: 10
    background: linear-gradient(to bottom, rgba(239,46,81,0.85) 7%, rgba(240,53,78,0.85) 30%, rgba(244,76,70,0.85) 100%)
    width: 100%
    top: 0

  logoContainer
    width: 196px
    margin: 0 auto
    padding: 14px 0

  logoImg
    width: 46px
    height: 65px
    background: url(${require('../images/logo-white.svg')}) no-repeat center
    float: left
    margin-right: 16px

  textualLogoImg
    height: 21px
    width: 133px
    background: url(${require('../images/logo-text-white.svg')}) no-repeat left center
    float: left
    margin-top: 13px

  clearfix
    clear: both
    display: table
`;
