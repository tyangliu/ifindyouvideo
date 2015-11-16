'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class MapHeaderSearchPopover extends Component {

  static defaultProps = {
    searchTerm: '',
    cities: [
      'Vancouver, BC',
      'Vatican City',
      'San Francisco, CA',
      'Virginia',
      'New York City, NY',
      'Seattle, WA'
    ]
  };

  render() {
    const {searchTerm, cities, year, month, initVideos} = this.props
        , st = searchTerm.trim().toLowerCase()
        , items = cities.filter(word =>
            st != '' && word.trim().toLowerCase().indexOf(st) >= 0
          ).map((word, index) =>
            <li style={styles.resultListItem}
                key={'searchResult' + index}
                onClick={() => initVideos(word, year, month)}>
              {word}
            </li>
          );

    const noResultsEl = <li style={{color: 'rgba(0,0,0,0.3)'}}>No results found</li>

    return (
      <div style={styles.popOver[st.length <= 0 ? 'hidden' : 'active']}>
        <ul style={styles.resultList}>
          {items.length <= 0 ? noResultsEl : items }
        </ul>
      </div>
    );
  }

}

const styles = styler`
  popOver
    position: absolute
    top: -7px
    left: 21px
    right: 38px
    padding-top: 64px
    padding-bottom: 4px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.75) 100%)
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.1)
    border-radius: 3px
    transition: opacity 0.08s ease-in-out
    &active
      opacity: 1
    &hidden
      opacity: 0
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
