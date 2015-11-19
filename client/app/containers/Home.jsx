'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import HomeSearch from '../components/HomeSearch.jsx';

@Radium
class Home extends Component {

  componentWillMount() {
    this.props.setShowOverlays(false);
  }

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
            <HomeSearch cities={this.props.cities}
                        history={this.props.history} />
          </section>

          <section style={styles.popListContainer}>
            <h3 style={styles.popListLabel}>Popular Cities</h3>
            <ul style={styles.popList}>
              <li style={styles.popListItem}>{this.props.cities[0].name}</li>
              <li style={styles.popListItem}>{this.props.cities[1].name}</li>
              <li style={styles.popListItem}>{this.props.cities[2].name}</li>
            </ul>
          </section>

        </section>
        <footer style={styles.footer}>
          <Link to='' style={styles.footerLink}>About this Project</Link>
        </footer>
      </div>
    );
  }

}

export default Relay.createContainer(Home, {
  fragments: {
    cities: () => Relay.QL`
      fragment on City @relay(plural: true) {
        ${HomeSearch.getFragment('cities')},
        name
      }
    `
  }
});

const styles = styler`
  home
    width: 100%
    height: 100vh
    position: absolute
    top: 0
    left: 0
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
    height: 54px
    margin-top: 24px
    margin-bottom: 10px

  tagline
    font-size: 18px

  search
    height: 60px
    background: rgba(255,255,255,0.95)

  popListContainer
    max-width: 300px
    margin: 0 auto
    padding: 14px 0

  popListLabel
    font-size: 14px
    line-height: 30px
    text-transform: uppercase
    letter-spacing: 1px
    border-bottom: 2px solid rgba(255,255,255,0.7)
    padding: 7px 0
    margin: 14px 0

  popListItem
    font-size: 14px
    font-weight: 700
    line-height: 30px
    text-transform: uppercase
    letter-spacing: 1px

  footer
    max-width: 300px
    width: 100%
    padding: 14px 0
    border-top: 2px solid rgba(255,255,255,0.7)
    position: absolute
    bottom: 0
    left: 50%
    text-align: left
    transform: translateX(-50%)


  footerLink
    color: white
    font-size: 14px
    font-weight: 700
    line-height: 30px
    text-transform: uppercase
    letter-spacing: 1px

  clearfix
    clear: both
    display: table
`;
