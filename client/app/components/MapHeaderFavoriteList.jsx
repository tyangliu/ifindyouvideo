'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
class MapHeaderFavoriteList extends Component {

  handleBaseClick = event => {
    this.setState({ open: !this.state.open });
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleOuterClick = event => {
    this.setState({ open: false, selectedYear: null, selectedMonth: null });
  };

  handlePopoverClick = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  handleChoiceClick = nextCity => {
    const { city, year, month, initVideos } = this.props;
    if (nextCity != city) {
      initVideos(nextCity, year, month);
    }
    this.setState({open: false});
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOuterClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOuterClick);
  }

  render() {
    const { viewer, city } = this.props
        , { open } = this.state
        , favoriteCities = viewer ? viewer.favoriteCities : []
        , favoritesContainsCurrent = favoriteCities.filter(favCity =>
            city == favCity
          ).length > 0;

    let items = favoriteCities.map((city, index) =>
      <li style={styles.popoverItem}
          key={'favoriteCity' + index}
          onClick={() => this.handleChoiceClick(city)}>
        <span>{city}</span>
        <button style={styles.deleteButton}>
          <i className='material-icons' style={styles.iconSmall}>remove</i>
        </button>
      </li>
    );

    return (
      <div style={styles.dropdown[open ? 'active' : 'normal']}>
        <div style={styles.dropdownBase} onClick={this.handleBaseClick}>
          <i className='material-icons' style={[styles.icon, {marginRight: '7px'}]}>favorite</i>
          <p style={styles.dropdownText}>My Locations</p>
          <i className='material-icons' style={styles.icon}>arrow_drop_down</i>
          <div style={styles.clearfix} />
        </div>
        <div style={styles.popover[open ? 'open' : 'hidden']}
             onClick={this.handlePopoverClick}>
          <ul>{items}</ul>
          { favoritesContainsCurrent ? null :
            <div style={[styles.popoverItem, styles.currCityItem]}>
              <span>{city}</span>
              <button style={styles.deleteButton}>
                <i className='material-icons' style={styles.iconSmallGray}>add</i>
              </button>
            </div>
          }
        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

export default Relay.createContainer(MapHeaderFavoriteList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        favoriteCities
      }
    `
  }
});

const styles = styler`
  dropdown
    float: right
    position: relative
    border-left: 1px solid rgba(0,0,0,0.15)
    user-select: none

    &normal
      background: rgba(255,255,255,0)

    &active
      background: linear-gradient(to bottom, rgba(240,240,240,1) 0%,rgba(240,240,240,1) 93%, rgba(225,225,225,1) 100%)

  dropdownBase
    cursor: pointer
    padding: 0 20px 0 14px

  dropdownText
    color: rgba(90,90,90,1)
    font-size: 13px
    float: left
    line-height: 42px
    margin: 2px 7px 0

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 20px
    line-height: 44px
    float: left

  popover
    position: absolute
    top: 100%
    right: 0
    width: 260px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.9) 100%)
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.1)
    border-radius: 3px
    padding: 12px 16px 10px
    transform-origin: 100% 0%
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out

    &hidden
      opacity: 0
      pointer-events: none
      transform: translateY(-5%) scale(0.85)

    &open
      opacity: 1
      pointer-events: auto
      transform: translateY(0) scale(1)

  popoverItem
    font-size: 12px
    font-weight: 700
    line-height: 21px
    margin-top: 2px
    padding: 2px 0 4px
    text-transform: uppercase
    letter-spacing: 1px
    cursor: pointer
    color: rgba(255,72,40,0.8)

  deleteButton
    outline: none
    background: none
    border-top: none
    border-bottom: none
    border-right: none
    border-left: 1px solid rgba(0,0,0,0.1)
    float: right
    cursor: pointer
    padding: 0 0 0 12px

  iconSmall
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 16px
    line-height: 21px

  iconSmallGray
    font-size: 16px
    line-height: 21px
    color: rgba(0,0,0,0.3)

  currCityItem
    color: rgba(0,0,0,0.3)
    border-top: 1px solid rgba(0,0,0,0.1)
    margin-top: 4px
    padding: 10px 0 4px

  clearfix
    clear: both
    display: table
`;
