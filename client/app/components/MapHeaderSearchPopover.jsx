'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
class MapHeaderSearchPopover extends Component {

  static defaultProps = {
    searchTerm: '',
    cities: []
  };

  render() {
    const {searchTerm, cities, year, month, initVideos} = this.props
        , st = searchTerm.trim().toLowerCase()
        , items = cities.filter(city =>
            st != '' && city.name.trim().toLowerCase().indexOf(st) >= 0
          ).map((city, index) =>
            <li style={styles.resultListItem}
                key={'searchResult' + index}
                onClick={() => initVideos(city.name, year, month)}>
              {city.name}
            </li>
          );

    const noResultsEl = <li style={{color: 'rgba(0,0,0,0.3)', marginBottom: '8px'}}>No results found</li>

    return (
      <div style={styles.popOver[st.length <= 0 ? 'hidden' : 'active']}>
        <ul style={styles.resultList}>
          {items.length <= 0 ? noResultsEl : items }
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
    color: rgba(255,72,40,0.8)
    margin-bottom: 8px
    cursor: pointer

  clearfix
    clear: both
    display: table
`;
