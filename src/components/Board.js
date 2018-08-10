import React from 'react';
import './Board.css';
import Square from './Square';


/* Board holds the 9 buttons that are used for gameplay */
class Board extends React.Component {

  renderSquare(i, position) {
    const win = this.props.winningLine && this.props.winningLine.includes(i);
    return (
      <Square
        winning={win}
        position={position}
        value={(this.props.squares && this.props.squares[i]) || 0}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 'top left')}
          {this.renderSquare(1, 'top')}
          {this.renderSquare(2, 'top right')}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 'left')}
          {this.renderSquare(4, '')}
          {this.renderSquare(5, 'right')}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 'bottom left')}
          {this.renderSquare(7, 'bottom')}
          {this.renderSquare(8, 'bottom right')}
        </div>
      </div>
    );
  }
}

export default Board;
