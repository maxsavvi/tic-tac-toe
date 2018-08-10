import React from 'react';
import './NewGameSettings.css';
import circle from '../assets/circle.svg';
import cross from '../assets/cross.svg';
import PlayerSelector from './PlayerSelector';


class NewGameSettings extends React.Component {

  onPlayerTypeChange(player, type) {
    this.props.onPlayerTypeChange(player, type);
  }

  render() {
    return (
      <div className="settings">
        <div className="player-selector-container">
          <img className="player" src={cross} alt="cross" />
          <PlayerSelector value={1}
            type={this.props.playerX}
            onPlayerTypeChange={(newType) => {
              this.props.onPlayerTypeChange(1, newType)
            }}
          />
        </div>

        <div className="player-selector-container">
          <img className="player" src={circle} alt="circle" />
          <PlayerSelector value={-1}
            type={this.props.playerO}
            onPlayerTypeChange={(newType) => {
              this.props.onPlayerTypeChange(-1, newType)
            }}
          />
      </div>
      </div>
    );
  }
}

export default NewGameSettings;
