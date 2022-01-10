import * as React from 'react';
import { getEventStream, getBaseUrl } from '../api/localServer';
import { GameEvent } from '../models/GameEvent';

const bumperAudio = new Audio('//' + getBaseUrl() + '/static/sound/bumper.mp3');
const applauseAudio = new Audio('//' + getBaseUrl() + '/static/sound/applause.mp3');

function stopAndPlayAudio(audio: HTMLAudioElement) {
    if (!audio.error) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}

export default class AudioPlayer extends React.Component<{}, {}> {

    componentDidMount() {
        getEventStream().subscribe((gameEvent: any) => {
            console.log(gameEvent)
            switch (gameEvent) {
                case GameEvent.NextRound:
                    stopAndPlayAudio(bumperAudio);
                    stopAndPlayAudio(applauseAudio);
                    break;
                case GameEvent.Applause:
                    stopAndPlayAudio(applauseAudio);
                    break;
            }
        });
    }

    render() {
        return null
    }
}
