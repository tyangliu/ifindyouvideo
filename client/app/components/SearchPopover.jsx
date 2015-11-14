'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class SearchPopover extends Component {

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
    if(nextProps.searchTerm == this.props.searchTerm){
      if(nextProps.index > this.state.matches.length-1){
        this.props.reduceIndex();
      }
      return true;
    }

    const {searchTerm, cities} = nextProps
        , st = searchTerm.trim().toLowerCase()
        , items = cities.filter(word =>
            st != '' && word.trim().toLowerCase().indexOf(st) >= 0);
    this.setState({matches : items});
    if(nextProps.index > items.length-1){
      this.props.reduceIndex();
    }
    return true;
  };

  render() {
    var result = [];
    for (var i=0; i<this.state.matches.length; i++){
      var word = this.state.matches[i];

      result.push(<Link to={`/videos?city=${word}`} key={'searchResult' + i}>
                    <li style={styles.resultListItem[(i==this.props.index) ? 'active' : 'normal']}>{word}</li>
                  </Link>)
    }

    const noResultsEl = <li style={{color: 'rgba(0,0,0,0.3)'}}>No results found</li>
    return (
      <div style={styles.popOver[this.props.searchTerm.length <= 0 ? 'hidden' : 'active']}>
        <ul style={styles.resultList}>
          {this.state.matches.length <= 0 ? noResultsEl : result }
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
    margin-bottom: 8px

    &normal
      color: rgba(255,72,40,0.8)

    &active
      color: rgba(0,180,130,0.8)

  clearfix
    clear: both
    display: table
`;
