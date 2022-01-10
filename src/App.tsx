import * as React from 'react';
import { openConnection, getGameStateUpdateStream } from './api/localServer';
import PlayerView from './views/PlayerView';
import { GameState } from './models/GameState';

type AppState = {
  isPresenter: boolean,
  gameState?: GameState,
}

export default class Hello extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    const presenter = new URL(window.location.toString()).searchParams.get('presenter');
    this.state = {
      isPresenter: presenter !== null,
    }
  }

  componentDidMount() {
    openConnection();
    getGameStateUpdateStream().subscribe((gameState: any) => {
      console.log('gameStateUpdate', gameState)
      this.setState({
        gameState
      })
    })
  }

  render() {
    return (
      <>
        {<PlayerView gameState={this.state.gameState} />}
      </>
    );
  }
}
