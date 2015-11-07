'use strict';

import React, { Component, Children, PropTypes } from 'react';
import Relay from 'react-relay';
import Radium, { Style } from 'radium';
import styler from 'react-styling';
import { Router, Link } from 'react-router';
import Map from '../components/Map.jsx';
import Videos from './Videos.jsx';
import UserWidget from '../components/UserWidget.jsx';

@Radium
class App extends Component {

  state = {
    showOverlays: false
  };

  render() {
    const {viewer, children} = this.props;

    return (
      <div style={styles.app}>
        <Style rules={styles.appRules} />
        <main style={styles.main}>
          <div style={styles.userContainer}><UserWidget /></div>
          <Map showOverlays={this.state.showOverlays} videos={viewer.videos} />
          {React.cloneElement(children || <div />, {
            key: this.props.location.pathname,
            setShowOverlays: show => this.setState({showOverlays: !!show}),
            videos: viewer.videos
          })}
        </main>
      </div>
    );
  }

}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        videos: videosByLocation(
          latitude: 59.1293, longitude: -129.3984, radius: "200km"
        ) {
          ${Map.getFragment('videos')}
          ${Videos.getFragment('videos')}
        }
      }
    `
  }
});

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
