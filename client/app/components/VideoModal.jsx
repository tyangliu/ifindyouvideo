'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';

@Radium
export default class VideoModal extends Component {

    static defaultProps = {
        videoModal: {
            title: 'Video Title',
            youtubeplayerUrl: "testURL",
            date: "09/09/15",
            views: 100,
            likes: 500,
            uploader: 'User',
            location: "location string",
            description: "description",
            mapId: 101,
        }
    };

    render() {
    let video = this.props.video;
    return (
        <div style= styles.Modal>
            <div style={styles.heading}>
                <h2 style={styles.title}>{this.props.videoModal.title}</h2>
                <h3 style={styles.uploader}>{this.props.videoModal.uploader}</h3>
                <h3 style={styles.location}>{this.props.videoModal.location}</h3>
                <h3 style={styles.description}>{this.props.videoModal.description}</h3>
                <div style={styles.idContainer}>
                    <div style={styles.mapIcon} />
                    <p style={styles.mapId}>{this.props.videoModal.mapId}</p>
                </div>
            </div>
            <div style={styles.clearfix} />
            <div style={[styles.thumbnail, {
          youtubeplayer: `url(${this.props.video.youtubeplayerUrl})`,
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
    mapId
    clearfix
`;
