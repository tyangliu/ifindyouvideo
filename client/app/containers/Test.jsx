'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class Test extends Component {

  render() {
    return (
        <div>Testing</div>
    );
  }

}

const styles = styler`
`;
