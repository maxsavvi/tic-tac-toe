import React from 'react';
import './HistoryControls.css';

function HistoryControlsButton(props) {
  return (
    <button
      disabled={!props.active}
      className="material-icons history-controls-button"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

class HistoryControls extends React.Component {
  render() {
    let goBackEnabled = this.props.moveNumber > 0;
    let goForwardEnabled = this.props.moveNumber < this.props.lastMove;
    return (
      <div className="history-controls">
        <HistoryControlsButton
          name="fast_rewind"
          active={goBackEnabled}
          onClick={() => this.props.jumpTo(0)}
        />
        <HistoryControlsButton
          name="arrow_left"
          active={goBackEnabled}
          onClick={() => this.props.jumpTo(this.props.moveNumber - 1)}
        />
        <span className="move-counter">
          Move: {this.props.moveNumber}/{this.props.lastMove}
        </span>
        <HistoryControlsButton
          name="arrow_right"
          active={goForwardEnabled}
          onClick={() => this.props.jumpTo(this.props.moveNumber + 1)}
        />
        <HistoryControlsButton
          name="fast_forward"
          active={goForwardEnabled}
          onClick={() => this.props.jumpTo(this.props.lastMove)}
        />
      </div>
    );
  }
}

export default HistoryControls;
