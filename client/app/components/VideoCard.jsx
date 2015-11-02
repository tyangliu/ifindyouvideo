'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';


@Radium
export default class VideoCard extends Component {

    static defaultProps = {
        title: "Vancouver",
        mapId: 35,
        thumbnailURL: "testURL",
        views: 100,
        likes: 500
    };

    render() {
        let video = this.props.video;
        return (
            <div>
                <div>(video.title)</div>
                <div>(video.mapId)</div>
                <div>(video.thumbnailUrl)</div>
                <div>(video.views)</div>
                <div>(video.likes)</div>
            </div>
        );
    }
}