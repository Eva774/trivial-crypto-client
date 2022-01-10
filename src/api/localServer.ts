import { Subject, ReplaySubject } from 'rxjs';
import { ConnectionState } from '../models/ConnectionState';
import { SocketEvent } from '../models/SocketEvent';
import { SocketCommand } from '../models/SocketCommand';

const gameStateUpdate = new ReplaySubject();
const connection = new ReplaySubject();
const eventSubject = new Subject();
const playVideoSubject = new Subject();

let socket: WebSocket;

let baseUrl: string;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.debug("Running client in debug mode. Connecting to default localhost:8080")
    baseUrl = 'localhost:8080'
} else {
    console.debug("Running client in production mode. Connecting to same hostname and port as the webpage")
    baseUrl = window.location.host;
}

export function getBaseUrl() {
    return baseUrl;
};

export function openConnection() {
    socket = new WebSocket(`ws://${getBaseUrl()}`);
    socket.addEventListener('open', (e) => {
        console.log('opened connection')
        connection.next(ConnectionState.Open);
    });
    socket.addEventListener('close', (event) => {
        console.log('The connection was lost. Retrying in 1 second.');
        connection.next(ConnectionState.Closed);
        setTimeout(openConnection(), 1000)
    });
    socket.addEventListener('message', (e) => {
        try {
            const data = JSON.parse(e.data)
            console.debug('received socket data', data);
            if (data.event === SocketEvent.GameStateUpdate) {
                gameStateUpdate.next(data.data);
            } else if (data.event === SocketEvent.GameEvent) {
                eventSubject.next(data.data)
            } else if (data.event === SocketEvent.PlayVideo) {
                playVideoSubject.next(data.data)
            } else if (data.event === SocketEvent.Version) {
                console.info("Connected with Trival server version " + data.data);
            }
        } catch (e) {
            console.error('couldn\'t parse JSON')
        }
    });
}

export function getGameStateUpdateStream() {
    return gameStateUpdate;
}

export function getConnectionStream() {
    return connection;
}

export function getEventStream() {
    return eventSubject;
}

export function getPlayVideoStream() {
    return playVideoSubject;
}

export function previousQuestion() { sendCommand(SocketCommand.PreviousQuestion) };
export function nextQuestion() { sendCommand(SocketCommand.NextQuestion) };
export function setCurrentQuestion(currentQuestion: number) { sendCommand(SocketCommand.SetCurrentQuestion, { currentQuestion }) };
export function previousRound() { sendCommand(SocketCommand.PreviousRound) };
export function nextRound() { sendCommand(SocketCommand.NextRound) };
export function setPauseTargetTime(targetTime: string) { sendCommand(SocketCommand.SetPauseTargetTime, { targetTime }) };
export function setWelcomeTargetTime(targetTime: string) { sendCommand(SocketCommand.SetWelcomeTargetTime, { targetTime }) };
export function setInputRanking(inputRanking: string) { sendCommand(SocketCommand.SetInputRanking, { inputRanking })};
export function playVideo() { sendCommand(SocketCommand.PlayVideo) };
export function displayQuestion() {sendCommand(SocketCommand.DisplayQuestion) };
export function hideQuestion() {sendCommand(SocketCommand.HideQuestion) }

function sendCommand(command: string, extraData = {}) {
    if (socket) {
        socket.send(JSON.stringify({ command, ...extraData }));
    }
}
