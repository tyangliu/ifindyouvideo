'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoModal extends Component {

    static defaultProps = {
        video: {
            title: 'Video Title',
            thumbnailUrl: "testURL",
            date: "09/09/15",
            views: 100,
            likes: 500,
            uploader: 'User',
            location: "location string",
            description: "description",
        }
    };

    render() {
    let video = this.props.video;
    return (
        <div style= styles.Modal>
            <div style={styles.heading}>
                <h2 style={styles.title}>{this.props.video.title}</h2>
                <div style={styles.idContainer}>
                    <div style={styles.mapIcon} />
                    <p style={styles.mapId}>{this.props.video.mapId}</p>
                </div>
            </div>
            <div style={styles.clearfix} />
            <div style={[styles.thumbnail, {
          backgroundImage: `url(${this.props.video.thumbnailUrl})`,
          backgroundSize: 'cover'
        }]} />
        </div>
    );
    }

}

const styles = styler`

    Modal
    video
    heading
    title
    date
    uploader
    location
    description


`;
