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
            <Link to='/videos'>
              <li style={styles.resultListItem} key={'searchResult' + index}>{word}</li>
            </Link>
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
    left: 126px
    right: 126px
    padding-top: 81px
    padding-bottom: 10px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.75) 100%)
    box-shadow: 0px 2px 3px 3px rgba(0,0,0,0.1)
    border-radius: 3px
    transition: opacity 0.08s ease-in-out

    &active
      opacity: 1

    &hidden
      opacity: 0
      pointer-events: none

  resultList
    margin-left: 24px
    text-transform: uppercase
    letter-spacing: 1px
    font-weight: 700
    line-height: 28px

  resultListItem
    color: rgba(255,72,40,0.8)
    margin-bottom: 8px

  clearfix
    clear: both
    display: table
`;
