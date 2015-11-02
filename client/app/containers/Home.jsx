'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Home extends Component {

  render() {
    return (
      <div style={styles.home}>
        <div style={styles.cover} />
        <section style={styles.middleContainer}>

          <section style={styles.heading}>
            <div style={styles.logoImg} />
            <div style={styles.headingContent}>
              <h1 style={styles.textualLogoImg} />
              <h2 style={styles.tagline}>
                Ever wondered what's on YouTube from around town?
              </h2>
            </div>
            <div style={styles.clearfix} />
          </section>

          <section style={styles.search}>
            <div style={styles.searchInner}>
              <i className='material-icons' style={[styles.icon, styles.searchIcon]}>search</i>
              <input type='text' style={styles.searchInput} placeholder='Search for a trendy city' />
              <Link to='/videos'>
                <button style={styles.optionsButton}>
                  <i className='material-icons' style={styles.icon}>more_vert</i>
                </button>
              </Link>
              <div style={styles.clearfix} />
            </div>
          </section>

        </section>
      </div>
    );
  }

}

const styles = styler`
  home
    width: 100%
    height: 100vh
    position: relative
    overflow-y: hidden
    color: white

  cover
    width: 100%
    height: 100%
    position: absolute
    background: linear-gradient(to bottom, rgba(239,46,81,.87) 7%, rgba(241,72,75,.87) 30%, rgba(248,152,56,.87) 100%)

  middleContainer
    width: 100%
    position: absolute
    top: 50%
    transform: translateY(-50%)

  heading
    max-width: 600px
    margin: 0 auto
    padding: 14px 0

  logoImg
    background: url(${require('../images/logo-white.svg')}) no-repeat center;
    width: 106px
    margin-right: 44px
    height: 150px
    float: left

  headingContent
    max-width: 440px
    float: left

  textualLogoImg
    background: url(${require('../images/logo-text-white.svg')}) no-repeat left center;
    height: 48px
    margin-top: 28px
    margin-bottom: 10px

  tagline
    font-size: 18px

  search
    height: 60px
    background: rgba(255,255,255,0.85)

  searchInner
    max-width: 600px
    margin: 0 auto

  icon
    background: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
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
