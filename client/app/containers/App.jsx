'use strict';

import React, { Component, Children, PropTypes } from 'react';
import Relay from 'react-relay';
import Radium, { Style } from 'radium';
import styler from 'react-styling';
import { Router, Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Map from '../components/Map.jsx';
import Videos from './Videos.jsx';
import UserWidget from '../components/UserWidget.jsx';

@Radium
class App extends Component {

  state = {
    showOverlays: false,
    activeVideo: null,
    openVideo: null
  };

  setActiveVideo  = index => this.setState({activeVideo: index});
  setOpenVideo    = index => this.setState({openVideo: index});
  setShowOverlays = show  => this.setState({showOverlays: !!show});

  render() {
    const {viewer, children} = this.props
        , {showOverlays, activeVideo, openVideo} = this.state;

    return (
      <div style={styles.app}>
        <Style rules={styles.appRules} />
        <main style={styles.main}>
          <div style={styles.userContainer}><UserWidget /></div>
          <Map showOverlays={showOverlays}
               activeVideo={activeVideo}
               setActiveVideo={this.setActiveVideo}
               setOpenVideo={this.setOpenVideo}
               viewer={viewer} />
          <ReactCSSTransitionGroup transitionName='main'
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300} >
            {React.cloneElement(children || <div />, {
              key: this.props.location.pathname,
              activeVideo,
              openVideo,
              setShowOverlays: this.setShowOverlays,
              setActiveVideo: this.setActiveVideo,
              setOpenVideo: this.setOpenVideo,
              videos: viewer.videos
            })}
          </ReactCSSTransitionGroup>
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
          ${Videos.getFragment('videos')}
        }
        ${Map.getFragment('viewer')}
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

    ::-webkit-scrollbar
      width: 10px
      height: 10px
      position: absolute
      bottom: 0
      left: 0
      background-color: rgba(230,230,230,1)

    ::-webkit-scrollbar-thumb
      border: 3px solid rgba(230,230,230,1)
      background-color: rgba(240,53,78,0.5)
      border-radius: 5px

    main
      flex: 1 0 auto
      width: 100%
      overflow: hidden

    div.main-enter
      opacity: 0.01
      transform: scale(2)

    div.main-enter.main-enter-active
      opacity: 1
      transition: opacity 300ms ease-in-out, transform 300ms ease-in-out
      transform: scale(1)

    div.main-leave
      opacity: 1
      transform: scale(1)

    div.main-leave.main-leave-active
      opacity: 0.01
      transform: scale(2)
      transition: opacity 300ms ease-in-out, transform 300ms ease-in-out

  main
    margin-top: 0px
    position: relative

  userContainer
    z-index: 15
    position: absolute
    top: 24px
    right: 20px
`;
