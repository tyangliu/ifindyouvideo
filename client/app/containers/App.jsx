'use strict';

import React, { Component, Children, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import styler from 'react-styling';
import { Router, Link } from 'react-router';
import Map from '../components/Map.jsx';
import UserWidget from '../components/UserWidget.jsx';

@Radium
export default class App extends Component {

  render() {
    return (
      <div style={styles.app}>
        <Style rules={styles.appRules} />
        <main style={styles.main}>
          <div style={styles.userContainer}><UserWidget /></div>
          <Map />
          {React.cloneElement(this.props.children || <div />, {
            key: this.props.location.pathname
          })}
        </main>
      </div>
    );
  }

}

const styles = styler`
  app
    font-family: "proxima-nova", sans-serif
    font-size: 15px
    line-height: 1.5em
    display: flex
    flex-direction: column
    min-height: 100vh

  appRules
    *
      box-sizing: border-box
    h1, h2, h3
      line-height: 1.5em
    h1
      font-size: 36px
      font-weight: 500
    h2
      font-size: 30px
    h3
      font-size: 24px
      font-weight: 500
    em
      font-style: italic
    a
      text-decoration: none
      font-weight: bold

    ::-webkit-input-placeholder
      color: rgba(153,153,153,1)

    main
      flex: 1 0 auto
      width: 100%

  main
    margin-top: 0px
    position: relative

  userContainer
    z-index: 1000
    position: absolute
    top: 20px
    left: 50%
    transform: translateX(-50%)
`;
