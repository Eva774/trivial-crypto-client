import * as React from 'react';
import styled from 'styled-components';
import { getConnectionStream } from '../api/localServer';
import { ConnectionState } from '../models/ConnectionState';

type AppState = {
    connectionState: ConnectionState
}

const Connected = styled.div`
    color: white;
    background-color: green;
`

const NotConnected = styled.div`
    color: white;
    background-color: red;
`

export default class SocketStatus extends React.Component<{}, AppState> {

    state = {
        connectionState: ConnectionState.Closed
    }

    componentDidMount() {
        // TODO fix the any type
        getConnectionStream().subscribe((connectionState: any) => {
            this.setState({ connectionState })
        })
    }

    render() {
        return (
            <>
                {this.state.connectionState === ConnectionState.Open && <Connected>Connected to server</Connected>}
                {this.state.connectionState === ConnectionState.Closed && <NotConnected>No connection to server</NotConnected>}
            </>
        );
    }
}
