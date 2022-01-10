import OBSWebSocket from 'obs-websocket-js';
import { ObsScene } from '../models/ObsScene';
import { RoundName } from '../models/RoundName';

const obs = new OBSWebSocket();

export function openConnection() {
    obs.connect({ address: 'localhost:4444' })
        .then(() => console.debug('Connected to OBS'))
        .catch(error => console.error('Couldn\'t connect to OBS'))
}

export function setScene(scene: RoundName | ObsScene) {
    console.debug('setting OBS scene to', scene)
    obs.send('SetCurrentScene', {
        'scene-name': scene
    }).catch(error => console.error('Couldn\'t send update to OBS'))

}
