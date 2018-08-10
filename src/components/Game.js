import React from 'react';
import './Game.css';
import Board from './Board';
import HistoryControls from './HistoryControls';
import Util from '../Util';
import { PlayerType, CPU_DELAY } from '../Constants';

/* Game controls gameplay for active or archived game  */
class Game extends React.Component {
  constructor(props) {
    super(props);
    if (props.loadedGame) {
      const moveNumber = props.loadedGame.history.length - 1;
      const gameArr = props.loadedGame.history[moveNumber].squares;
      const [winner, winningLine] = Util.getWinner(gameArr);
      this.state = {
        history: props.loadedGame.history,
        xIsNext: moveNumber % 2 === 0,
        moveNumber: moveNumber,
        isGameOver: props.history != null,
        isLocked: true,
        winner: winner,
        winningLine: winningLine,
        isPastGame: true,
        gameTypeLabel: "Past Game: " + props.loadedGame.label,
      }
    } else {
      const gameTypeLabel = PlayerType.getLabel(this.props.playerX) + ' X vs. '
       + PlayerType.getLabel(this.props.playerO) + ' O';
      this.state = {
        history: [{ squares: Array(9).fill(0) }],
        xIsNext: true,
        moveNumber: (props.history && props.history.length - 1) || 0,
        isGameOver: props.history != null,
        isLocked: false,
        winner: null,
        winningLine: null,
        isPastGame: false,
        gameTypeLabel: gameTypeLabel,
      }
    }
  }

  componentDidMount() {
    /* Lock game board buttons and start move sequence
    when boths players are CPU */
    if (this.props.playerX !== 'human') {
      this.setState({isLocked: true});
      const moveIndex = Math.floor(Math.random()*9);
      window.setTimeout(() => this.moveAt(moveIndex), CPU_DELAY);
    }
  }

  /* Trigger moveAt() when a valid game square is click */
  handleSquareClick(i) {
    if (this.state.isLocked || this.state.isGameOver) return;
    this.moveAt(i);
  }

  /* Execute next move at game board index
     and schedule another call to moveAt if next player is CPU */
  moveAt(i) {
    let history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i]) return;
    squares[i] = this.state.xIsNext ? 1 : -1;
    history.push({squares: squares});
    const [winner, winningLine] = Util.getWinner(squares);
    const gameOver = winner != null || (history.length > 9);
    const xIsNext = !this.state.xIsNext;
    const playerType = xIsNext ? this.props.playerX : this.props.playerO;
    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
      moveNumber: history.length - 1,
      isGameOver: gameOver,
      isLocked: playerType !== 'human',
      winner: winner,
      winningLine: winningLine,
    });

    if (!gameOver && playerType !== 'human') {
      let moveIndex;
      if (playerType === 'rand') {
        moveIndex = Util.randomNextMove(squares);
      } else if (playerType === 'cpu') {
        moveIndex = Util.smartNextMove(squares, this.state.moveNumber);
        console.log('smart move', moveIndex);
      }
      window.setTimeout(() => this.moveAt(moveIndex), CPU_DELAY);
    }
  }

  /* Display game state at moveNumber */
  goToMove(moveNumber) {
    this.setState({
      moveNumber: moveNumber,
      xIsNext: (moveNumber % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const winningLine = (this.state.moveNumber === history.length - 1) ?
      this.state.winningLine : null;
    let status = this.state.isGameOver ? "Game Over, " : "";
    if (this.state.winner) {
      status += 'Winner: ' + ((this.state.winner === 1) ? 'X' : 'O');
    } else if (this.state.moveNumber === 9) {
      status += "Draw";
    } else {
      status = (this.state.xIsNext ? 'X' : 'O') + "'s Turn";
    }
    return (
      <div className="game">
        <div className="game-status">
          {status}
        </div>
        <div className="game-type">
          {this.state.gameTypeLabel}
        </div>
        <div className="game-date">
          {this.props.loadedGame && this.props.loadedGame.date}
        </div>
        <div className="game-board">
          <Board
            winningLine={winningLine}
            squares={current.squares}
            onClick={(i) => this.handleSquareClick(i)}
          />
        </div>
        <button
          disabled={this.state.loadedGame || !this.state.isGameOver}
          onClick={() => this.props.onSaveGameClick(history)}
        >Save Game
        </button>
        <HistoryControls
          moveNumber={this.state.moveNumber}
          lastMove={this.state.history.length - 1}
          jumpTo={(i) => this.goToMove(i)}
        />
      </div>
    );
  }
}

export default Game;
