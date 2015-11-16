'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = [2015, 2014, 2013, 2012, 2011, 2010];

function mkDateString(month, year) {
  month = parseInt(month); year = parseInt(year);

  if (!month || !year) { return 'All Time'; }

  let monthStr = monthNames[month - 1] || '';
  return monthStr + ' ' + year;
}

@Radium
export default class MapHeaderDateFilter extends Component {

  state = {
    open: false,
    selectedYear: null,
    selectedMonth: null
  };

  handleBaseClick = event => {
    this.setState({ open: !this.state.open, selectedYear: null, selectedMonth: null });
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

  handleChoiceClick = (year=null, month=null) => {
    let { city, initVideos } = this.props;
    let { selectedYear, selectedMonth } = this.state;

    if (year !== null && month !== null) {
      initVideos(city, year, month);
      this.setState({ open: false, selectedYear: null, selectedMonth: null });
      return;
    }

    if (year !== null && selectedMonth !== null) {
      initVideos(city, year, selectedMonth);
      this.setState({ open: false, selectedYear: null, selectedMonth: null });
      return;
    }

    if (month !== null && selectedYear !== null) {
      initVideos(city, selectedYear, month);
      this.setState({ open: false, selectedYear: null, selectedMonth: null });
      return;
    }

    if (year !== null) {
      this.setState({ selectedYear: year });
      return;
    }

    if (month !== null) {
      this.setState({ selectedMonth: month });
      return;
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOuterClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOuterClick);
  }

  render() {
    const { month, year, initVideos } = this.props;
    const { open, selectedYear, selectedMonth } = this.state;

    return (
      <div style={[styles.dropdown[open ? 'active' : 'normal'], {float: 'left'}]}>
        <div style={styles.dropdownBase} onClick={this.handleBaseClick}>
          <p style={styles.dropdownText}>{mkDateString(month, year)}</p>
          <i className='material-icons' style={styles.icon}>arrow_drop_down</i>
          <div style={styles.clearfix} />
        </div>

        <div style={styles.popover[open ? 'open' : 'hidden']} onClick={this.handlePopoverClick}>

          <p style={styles.popoverLabel}>Most Popular Videos of&hellip;</p>
          <div style={[styles.choice.normal, styles.allTime]} onClick={() => this.handleChoiceClick(0,0)}>
            All Time
          </div>

          <ul style={[styles.choiceList, {marginRight: '20px'}]}>
            {monthNames.map((month, index) =>
              <li key={'month' + index}
                  style={styles.choice[(index + 1 == selectedMonth) ? 'selected' : 'normal']}
                  onClick={() => this.handleChoiceClick(null, index + 1)}>

                <i className='material-icons'
                   style={styles.check[(index + 1 == selectedMonth) ? 'selected' : 'hidden']}>
                  check
                </i>

                {month}

              </li>
            )}
          </ul>

          <ul style={styles.choiceList}>
            {years.map((year, index) =>
              <li key={'year' + index}
                  style={styles.choice[(year == selectedYear) ? 'selected' : 'normal']}
                  onClick={() => this.handleChoiceClick(year, null)}>

                <i className='material-icons'
                   style={styles.check[(year == selectedYear) ? 'selected' : 'hidden']}>
                  check
                 </i>

                {year}

              </li>
            )}
          </ul>

        </div>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

const styles = styler`
  dropdown
    border-right: 1px solid rgba(0,0,0,0.15)
    position: relative
    user-select: none

    &normal
      background: rgba(255,255,255,1)

    &active
      background: linear-gradient(to bottom, rgba(240,240,240,1) 0%,rgba(240,240,240,1) 93%, rgba(225,225,225,1) 100%)

  dropdownBase
    padding: 0 14px
    cursor: pointer

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 20px
    line-height: 44px
    float: left

  dropdownText
    color: rgba(90,90,90,1)
    font-size: 13px
    float: left
    line-height: 42px
    margin: 2px 7px 0

  popover
    position: absolute
    top: 44px
    left: 0
    width: 230px
    background: linear-gradient(to top, rgba(255,255,255,.95) 0%,rgba(255,255,255,0.9) 100%)
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.1)
    border-radius: 3px
    padding: 14px 16px
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out

    &hidden
      opacity: 0
      pointer-events: none
      transform: translateY(-5%)

    &open
      opacity: 1
      pointer-events: auto
      transform: translateY(0)

  popoverLabel
    font-size: 10px
    font-weight: 700
    color: rgba(0,0,0,0.4)
    text-transform: uppercase
    letter-spacing: 1px
    padding-bottom: 4px
    border-bottom: 1px solid rgba(0,0,0,0.1)

  allTime
    padding-top: 5px
    padding-bottom: 4px
    border-bottom: 1px solid rgba(0,0,0,0.1)
    margin-bottom: 10px

  choiceList
    float: left

  choice
    font-size: 13px
    font-weight: 700
    line-height: 28px
    color: rgba(120,120,120,1)
    cursor: pointer
    position: relative
    transition: padding 0.1s ease-in-out, color 0.1s ease-in-out

    :hover
      color: rgba(255,72,40,0.8)

    &normal
      padding-right: 30px

    &selected
      color: rgba(255,72,40,0.8)
      padding-left: 20px
      padding-right: 10px

  check
    color: rgba(255,72,40,0.8)
    font-size: 16px
    position: absolute
    left: 0
    top: 5px
    transition: opacity 0.1s ease-in-out

    &selected
      opacity: 1

    &hidden
      opacity: 0


  clearfix
    clear: both
    display: table
`;
