'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class SearchPopover extends Component {

  static defaultProps = {
    searchTerm: '',
    matchable: [
      'Vancouver, BC',
      'Vatican City',
      'San Francisco, CA',
      'Virginia',
      'New York City, NY',
      'Seattle, WA'
    ]
  };

  render() {
    const {searchTerm, matchable} = this.props
        , st = searchTerm.trim().toLowerCase()
        , items = matchable.filter(word =>
            st != '' && word.trim().toLowerCase().indexOf(st) >= 0
          ).map((word, index) =>
            <li key={'searchResult' + index}>{word}</li>
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
    top: -10px
    left: 126px
    right: 126px
    padding-top: 84px
    padding-bottom: 16px
    background: rgba(255,255,255,0.95)
    box-shadow: 0px 2px 3px 3px rgba(0,0,0,0.1)
    border-radius: 4px
    transition: opacity 0.08s ease-in-out

    &active
      opacity: 1

    &hidden
      opacity: 0
      pointer-events: none

  resultList
    margin-left: 24px
    color: rgba(255,72,40,0.8)
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: 700
    line-height: 36px

  clearfix
    clear: both
    display: table
`;
