import React from 'react';
import './Square.css';
import circle from '../assets/circle.svg';
import cross from '../assets/cross.svg';

function Square(props) {
  let piece;
  if (props.value === 1) {
    piece = <img className="game-piece" src={cross} alt="cross" />;
  } else if (props.value === -1) {
    piece = <img className="game-piece" src={circle} alt="circle" />;
  }
  let className = "square";
  if (props.position) className += " " + props.position;
  if (props.winning) className += " winning";
  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      {piece}
    </button>
  );
}

export default Square;
