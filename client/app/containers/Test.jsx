'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import VideoCardList from '../components/VideoCardList.jsx'

@Radium
export default class Test extends Component {

  render() {
    return (
        <VideoCardList></VideoCardList>
    );
  }

}

const styles = styler`
`;
