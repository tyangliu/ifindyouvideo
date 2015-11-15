'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import SearchPopover from './SearchPopover.jsx';
import CurrentCity from './CurrentCity.jsx'

@Radium
export default class MapHeader extends Component {

  state = {
    searchTerm: ''
  };

  handleChange = event => this.setState({searchTerm: event.target.value});


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


          <div style={styles.search}>
            <SearchPopover searchTerm={this.state.searchTerm}
                           cities={this.props.cities} />
            <i className='material-icons' style={[styles.icon,styles.searchIcon]}>search</i>
            <input type='text' style={styles.searchInput}
                   placeholder='Search for a trendy city'
                   onChange={this.handleChange}/>
            <i className='material-icons' style={styles.icon}>more_vert</i>
            <div style={styles.clearfix} />
          </div>

          <CurrentCity city={this.props.city} />

          <div style={[styles.dropdown, {float: 'left'}]}>
            <p style={styles.dropdownText}>Past Week</p>
            <i className='material-icons' style={styles.icon}>arrow_drop_down</i>
          </div>
          <div style={{float: 'right', borderLeft: '1px solid rgba(0,0,0,0.15)', padding: '0 20px 0 14px'}}>
            <i className='material-icons' style={[styles.icon, {marginRight: '7px'}]}>favorite</i>
            <p style={styles.dropdownText}>My Locations</p>
            <i className='material-icons' style={styles.icon}>arrow_drop_down</i>
          </div>
          <div style={styles.clearfix} />
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

  search
    margin-left: 26px
    padding-right: 20px
    border-right: 1px solid rgba(0,0,0,0.15)
    float: left

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 20px
    line-height: 44px
    float: left

  searchInput
    background: none
    border: none
    outline: none
    float: left
    line-height: 44px
    padding: 0
    margin-left: 14px
    font-family: inherit
    font-size: 13px
    color: rgba(102,102,102,1)
    position: relative
    width: 240px

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

  dropdown
    border-right: 1px solid rgba(0,0,0,0.15)
    padding: 0 14px

  dropdownText
    color: rgba(90,90,90,1)
    font-size: 13px
    float: left
    line-height: 42px
    margin: 2px 7px 0

  clearfix
    clear: both
    display: table
`;
