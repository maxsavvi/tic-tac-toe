import React from 'react';
import './App.css'
import Game from './Game';
import NewGameSettings from './NewGameSettings';
import { PlayerType, Player } from '../Constants';

/* Main container for the web app,
switches between game settings and active games  */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameActive: false,
      playerX: PlayerType.Human.ID,
      playerO: PlayerType.Human.ID,
      pastGames: [],
      loadedGame: null,
    }
  }

  /* This method handles up data changess bubbled up from PlayerSelector */
  handlePlayerTypeChange(player, type) {
    if (player === Player.X.VAL) {
      this.setState({
        playerX: type,
      })
    } else { /*if (player === Player.O.VAL) */
      this.setState({
        playerO: type,
      })
    }
  }

  /* Load previously saved game */
  handleLoadGameClick(pastGame) {
    this.setState({
      isGameActive: true,
      loadedGame: pastGame,
    });
  }

  /* Saves game to be loaded and viewed again later */
  handleSaveGameClick(history) {
    let now = new Date();
    let date = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    let label = PlayerType.getLabel(this.state.playerX) + ' X vs. ';
    label += PlayerType.getLabel(this.state.playerO) + ' O ';
    let pastGames = this.state.pastGames.concat([{
      id: now.getTime() + '-' + this.state.playerX + '-' + this.state.playerO,
      date: date,
      label: label,
      history: history,
    }]);
    this.setState({
      pastGames: pastGames,
      isGameActive: false
    })
  }

  /* Start new game */
  handleStartGameClick() {
    this.setState({
      isGameActive: true,
    });
  }

  /* Called during active game, brings user back to settings screen */
  handleNewGameClick() {
    this.setState({
      loadedGame: null,
      isGameActive: false,
    });
  }

  renderPastGames() {
    if (this.state.pastGames.length) {
      const pastGamesList = this.state.pastGames.map((pastGame) => {
        return (
          <div className="past-games-list-item" key={pastGame.id}>
            <div>{pastGame.label}</div>
            <div>{pastGame.date}</div>
            <button className="past-games-load-button"
              onClick={() => this.handleLoadGameClick(pastGame)}
            >
              Load
            </button>
        </div>
        );
      });
      return (
        <div>
          <h2>Past Games</h2>
          <div>
            {pastGamesList}
          </div>
        </div>
      );
    }
    return null;
  }

  renderSettings() {
    return (
      <NewGameSettings
        playerX={this.state.playerX}
        playerO={this.state.playerO}
        onPlayerTypeChange={(p,type) => this.handlePlayerTypeChange(p,type)}
      />
    );
  }

  renderGame() {
    return (
      <div>
        <Game
          loadedGame={this.state.loadedGame}
          playerX={this.state.playerX}
          playerO={this.state.playerO}
          onSaveGameClick={(history) => this.handleSaveGameClick(history)}
        />
        <button
          className="new-game-button"
          onClick={() => this.handleNewGameClick()}
        >
          New Game
        </button>
      </div>
    );
  }

  renderGameSelect() {
    return (
      <div>
        <h2>New Game</h2>
        {this.renderSettings()}
        <button className="new-game-button"
          onClick={() => this.handleStartGameClick()}>
          Start
        </button>
        {this.renderPastGames()}
      </div>
    );
  }

  render() {
    let element;
    if (!this.state.isGameActive) {
      element = this.renderGameSelect();
    } else {
      element = this.renderGame();
    }
    return (
      <div className="app">
        <h1>Tic-Tac-Toe</h1>
        {element}
      </div>
    );
  }
}

export default App;
