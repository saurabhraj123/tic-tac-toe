import React, { useEffect, useState } from 'react';
import '../styles/board.css';

const Board = ({ gameState, onClick, isX, winner, winnerCells }) => {
  const [hoverState, setHoverState] = useState(Array(9).fill(null));
  const [hoverEffect, setHoverEffect] = useState('');
  const [hoverContent, setHoverContent] = useState('');

  const mouseHoverIn = (position) => {
    if (!winner) {
      // if (hover === true) {
      //   const arrayCopy = Array(9).fill(null);
      //   arrayCopy[position] = 1;
      //   setHoverState(arrayCopy);
      // }
      if (isX) {
        setHoverContent('X');
      } else {
        setHoverContent('O');
      }
      if (!gameState[position]) setHoverEffect('hover');
      const stateCopy = Array(9).fill(null);
      stateCopy[position] = 1;
      setHoverState(stateCopy);
    }
  };

  const mouseHoverOut = (position) => {
    setHoverEffect('');
    setHoverContent('');
    setHoverState(Array(9).fill(null));
  };

  function getHoverEffect() {
    return hoverEffect;
  }

  function getColStyle(position) {
    let winner = '';
    if (winnerCells.includes(position)) winner = 'winner';
    return `column ${gameState[position]} ${winner} ${
      hoverState[position] ? getHoverEffect() : ''
    } ${gameState[position] ? 'resetHover' : ''}`;
  }

  function getColumn(position) {
    return (
      <div
        className={[getColStyle(position)]}
        onClick={() => onClick(position, setHoverContent, setHoverEffect)}
        onMouseEnter={() => mouseHoverIn(position)}
        onMouseLeave={() => mouseHoverOut(position)}
      >
        {gameState[position]}
        {!gameState[position] && hoverState[position] && hoverContent}
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
