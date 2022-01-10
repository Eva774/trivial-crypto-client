import * as React from 'react';
import styled from 'styled-components';
import { getPlayVideoStream } from '../api/localServer';

type VideoProps = {
    src: string,
    onVideoEnd: () => void,
    hasPlayed: boolean,
    videoId: number,
    poster?: string,
}

type VideoState = {
    isPlaying: boolean,
    fullscreen: boolean,
}

const VideoElement = styled.video`
    ${(props: { hasPlayed: boolean, fullscreen: boolean }) => props.hasPlayed ? 'opacity: .2;' : null};
    ${(props: { fullscreen: boolean }) => props.fullscreen ? 'position: absolute; top:0; left:0; width: 100vw; height:100vh; background:black; z-index:10;' : 'width: 600px;'};
    
`

export class Video extends React.Component<VideoProps, VideoState> {

    state = {
        isPlaying: false,
        fullscreen: false,
    }

    videoRef?: HTMLVideoElement;

    componentDidMount() {
        getPlayVideoStream().subscribe((videoId: any) => {
            if (videoId === this.props.videoId) {
                this.start();
            }
        });
    }

    handleRef = (video: HTMLVideoElement) => {
        this.videoRef = video;
    };

    start = () => {
        if (this.videoRef !== null && this.videoRef && !this.props.hasPlayed) {
            this.videoRef.play();
            this.setState({ fullscreen: true });
            this.videoRef.addEventListener('ended', () => {
                this.setState({ fullscreen: false });
                this.props.onVideoEnd();
            }, false);
        }
    }

    render() {

        return (
            <VideoElement
                poster={this.props.poster}
                src={this.props.src}
                ref={this.handleRef}
                onClick={this.start}
                hasPlayed={this.props.hasPlayed}
                fullscreen={this.state.fullscreen}
            />
        );
    }
}
