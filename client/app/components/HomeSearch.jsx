'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import styler from 'react-styling';
import SearchPopover from './SearchPopover.jsx';

@Radium
export default class HomeSearch extends Component {

  state = {
    searchTerm: '',
    index: -1,
    cities: [
      'Vancouver, BC',
      'Vatican City',
      'San Francisco, CA',
      'Virginia',
      'New York City, NY',
      'Seattle, WA'
    ]
  };

  handleChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  keyTyped = event => {
    var keyCode = event.keyCode | event.which;
    var oldIndex = this.state.index;

    if(event.keyCode == 38){
      if (oldIndex >= 0){
        this.setState({index: oldIndex-1});
      }
    }
    else if (event.keyCode == 40){
      this.setState({index: oldIndex + 1});
    }
  };

  reduceIndex = () => {
    var oldIndex = this.state.index;
    this.setState({index: oldIndex-1})
  }

  render() {
    return (
      <div style={styles.homeSearch}>
        <SearchPopover searchTerm={this.state.searchTerm}
                       cities={this.props.cities}
                       index={this.state.index}
                       reduceIndex={this.reduceIndex} />
        <i className='material-icons' style={[styles.icon, styles.searchIcon]}>search</i>
        <input type='text' style={styles.searchInput}
               placeholder='Search for a trendy city'
               onChange={this.handleChange}
               onKeyDown={this.keyTyped}/>
        <button style={styles.optionsButton}>
          <i className='material-icons' style={styles.icon}>more_vert</i>
        </button>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`
  homeSearch
    max-width: 600px
    margin: 0 auto
    position: relative

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 28px
    line-height: 60px

  searchIcon
    width: 106px
    margin-right: 44px
    display: block
    float: left
    text-align: center

  searchInput
    background: none
    border: none
    outline: none
    display: inline-block
    line-height: 40px
    padding: 10px 0
    font-family: inherit
    font-size: 16px
    float: left
    color: rgba(102,102,102,1)
    position: relative
    z-index: 1
    width: 300px

  optionsButton
    width: 40px
    float: right
    display: block
    text-align: center
    background: none
    outline: none
    border: none
    padding: 0

  clearfix
    clear: both
    display: table
`;
