import React from 'react';
import './PlayerSelector.css';
import { PlayerType } from '../Constants';


class PlayerSelector extends React.Component {

  renderPlayerSelectorButton(playerType) {
    let className = "player-type-button";
    if (this.props.type === playerType.ID) {
      className += " selected";
    }
    return (
      <button
        className={className}
        onClick={() => this.props.onPlayerTypeChange(playerType.ID)}>
        {playerType.LABEL}
      </button>
    );
  }

  render() {
    return (
      <div className="player-selector">
        {this.renderPlayerSelectorButton(PlayerType.Human)}
        {this.renderPlayerSelectorButton(PlayerType.RandomCPU)}
        {this.renderPlayerSelectorButton(PlayerType.SmartCPU)}
      </div>
    );
  }
}

export default PlayerSelector;
