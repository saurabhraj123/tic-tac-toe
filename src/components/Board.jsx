import React from 'react';
import '../styles/board.css';

const Board = ({ gameState, onClick, winnerCells }) => {
  function getColStyle(position) {
    let winner = '';
    if (winnerCells.includes(position)) winner = 'winner';
    return `column ${gameState[position]} ${winner}`;
  }

  function getColumn(position) {
    return (
      <div className={getColStyle(position)} onClick={() => onClick(position)}>
        {gameState[position]}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="board">
        <div className="row">
          {getColumn(0)}
          {getColumn(1)}
          {getColumn(2)}
        </div>
        <div className="row">
          {getColumn(3)}
          {getColumn(4)}
          {getColumn(5)}
        </div>
        <div className="row">
          {getColumn(6)}
          {getColumn(7)}
          {getColumn(8)}
        </div>
      </div>
    </div>
  );
};

export default Board;
