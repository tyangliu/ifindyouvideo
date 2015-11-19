'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';
import MapHeaderSearchPopover from './MapHeaderSearchPopover.jsx';

@Radium
export default class MapHeaderSearch extends Component {

  state = {
    searchTerm: '',
    index: -1,
    enter: false
  };

  handleChange = event => this.setState({searchTerm: event.target.value});

  keyTyped = event => {
    var keyCode = event.keyCode | event.which;
    var oldIndex = this.state.index;

    if(keyCode == 38){
      if (oldIndex >= 0){
        this.setState({index: oldIndex-1});
      }
    }
    else if (keyCode == 40){
      this.setState({index: oldIndex + 1});
    }
    else if (keyCode == 13 && oldIndex > -1){
      this.setState({enter: true});
    }
  };

  reduceIndex = () => {
    var oldIndex = this.state.index;
    this.setState({index: oldIndex-1});
  };

  resetEnter = () => {
    this.setState({enter: false});
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.keyTyped, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.keyTyped);
  }

  componentDidUpdate = () => {
    var textbox = this.refs.citySearch;
    var length = textbox.value.length*2;
    if(this.state.index == -1){
      textbox.focus();
      setTimeout(() => {
        textbox.setSelectionRange(length,length);
      }, 0);
    }
    else {
      textbox.blur();
    }
  };

  render() {
    const { cities, year, month, initVideos } = this.props;

    return (
      <div style={styles.search}>
        <MapHeaderSearchPopover searchTerm={this.state.searchTerm}
                                cities={cities}
                                initVideos={initVideos}
                                year={year}
                                month={month}
                                index={this.state.index}
                                reduceIndex={this.reduceIndex}
                                enter={this.state.enter}
                                resetEnter={this.resetEnter}
                                history={this.props.history} />
        <i className='material-icons' style={[styles.icon,styles.searchIcon]}>search</i>
        <input type='text' style={styles.searchInput} ref='citySearch'
               placeholder='Search for a trendy city'
               onChange={this.handleChange}/>
        <i className='material-icons' style={styles.icon}>more_vert</i>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`
  search
    margin-left: 26px
    padding-right: 20px
    border-right: 1px solid rgba(0,0,0,0.15)
    float: left
    position: relative

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 20px
    line-height: 44px
    float: left

  searchInput
    background: none
    border: none
    outline: none
    float: left
    line-height: 44px
    padding: 0
    margin-left: 14px
    font-family: inherit
    font-size: 13px
    color: rgba(102,102,102,1)
    position: relative
    width: 240px
`;
