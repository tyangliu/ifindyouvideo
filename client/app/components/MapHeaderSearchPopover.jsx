'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
class MapHeaderSearchPopover extends Component {

  static defaultProps = {
    searchTerm: '',
    cities: [
      'Vancouver, BC',
      'Vatican City',
      'San Francisco, CA',
      'Virginia',
      'New York City, NY',
      'Seattle, WA'
    ],
    index: -1
  };

  componentWillMount = () => this.setState({matches: []});

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.enter == true){
      this.props.resetEnter();
      var city = this.state.matches[this.props.index];
      this.props.history.replaceState({city},
          (city && city.length > 0) ? `/videos?city=${city}` : '/videos'
      )
      return;
    }

    var searchTerm = nextProps.searchTerm
        , cities = nextProps.cities
        , st = searchTerm.trim().toLowerCase()
        , items = cities.filter(city =>
            st != '' && city.name.trim().toLowerCase().indexOf(st) >= 0
        ).map(city => city.name);

    this.setState({matches: items});

    if(nextProps.index > this.state.matches.length-1){
      this.props.reduceIndex();
    }
  };

  render() {
    var year = this.props.year
      , month = this.props.month
      , initVideos = this.props.initVideos
      , result = this.state.matches.map((word, index) =>
          <li style={styles.resultListItem[index==this.props.index ? 'active' : 'normal']}
              key={'searchResult' + index}
              onClick={() => initVideos(word, year, month)}>
            {word}
          </li>
        );

    const noResultsEl = <li style={{color: 'rgba(0,0,0,0.3)', marginBottom: '8px'}}>No results found</li>

    return (
      <div style={styles.popOver[this.props.searchTerm.length <= 0 ? 'hidden' : 'active']}>
        <ul style={styles.resultList}>
          {this.state.matches.length <= 0 ? noResultsEl : result }
        </ul>
      </div>
    );
  }

}

export default Relay.createContainer(MapHeaderSearchPopover, {
  fragments: {
    cities: () => Relay.QL`
      fragment on City @relay(plural: true) {
        name
      }
    `
  }
});

const styles = styler`
  popOver
    position: absolute
    top: -5px
    left: 21px
    right: 38px
    padding-top: 64px
    padding-bottom: 4px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.75) 100%)
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.1)
    border-radius: 3px
    transform-origin: 50% 0%
    transition: opacity 0.08s ease-in-out, transform 0.08s ease-in-out

    &active
      opacity: 1
      transform: scale(1)

    &hidden
      opacity: 0
      transform: scale(0.95)
      pointer-events: none

  resultList
    margin-left: 14px
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: 700
    font-size: 12px
    line-height: 21px

  resultListItem
    margin-bottom: 8px
    cursor: pointer

    &normal
      color: rgba(255,72,40,0.8)

    &active
      color: rgba(0,180,130,0.8)

  clearfix
    clear: both
    display: table
`;
