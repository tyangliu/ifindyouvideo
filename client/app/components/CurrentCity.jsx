'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class CurrentCity extends Component {


  render() {
    console.log('city is: ' + this.props.city);

    return (
      <div style={styles.current}>
        <i className='material-icons' style={styles.icon}>location_city</i>
        <p style={styles.currentText}>{this.props.city}</p>
        <i className='material-icons' style={styles.icon}>close</i>
      </div>
    );
  }

}

const styles = styler`
  current
    border-right: 1px solid rgba(0,0,0,0.15)
    float: left
    padding: 0 20px 0 26px

  currentText
    color: rgba(90,90,90,1)
    font-size: 12px
    font-weight: 700
    text-transform: uppercase
    letter-spacing: 1px
    float: left
    line-height: 42px
    margin: 2px 20px 0 14px

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 20px
    line-height: 44px
    float: left

`;
