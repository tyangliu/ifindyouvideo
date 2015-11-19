'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';
import MapHeaderSearchPopover from './MapHeaderSearchPopover.jsx';

@Radium
class MapHeaderSearch extends Component {

  state = {
    searchTerm: ''
  };

  handleChange = event => this.setState({searchTerm: event.target.value});

  render() {
    const { cities, year, month, initVideos } = this.props;

    return (
      <div style={styles.search}>
        <MapHeaderSearchPopover searchTerm={this.state.searchTerm}
                                cities={cities}
                                initVideos={initVideos}
                                year={year}
                                month={month} />
        <i className='material-icons' style={[styles.icon,styles.searchIcon]}>search</i>
        <input type='text' style={styles.searchInput}
               placeholder='Search for a trendy city'
               onChange={this.handleChange}/>
        <i className='material-icons' style={styles.icon}>more_vert</i>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

export default Relay.createContainer(MapHeaderSearch, {
  fragments: {
    cities: () => Relay.QL`
      fragment on City @relay(plural: true) {
        ${MapHeaderSearchPopover.getFragment('cities')}
      }
    `
  }
});

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
