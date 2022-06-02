import React, { useState } from 'react';
import Board from './components/Board';
import './styles/app.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [movesCount, setMovesCount] = useState(0);
  const [undo, setUndo] = useState([]);

  const winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ];

  const checkWin = (value, gameStateCopy) => {
    for (let i = 0; i < winningPositions.length; i++)
      if (
        gameStateCopy[winningPositions[i][0]] === value &&
        gameStateCopy[winningPositions[i][1]] === value &&
        gameStateCopy[winningPositions[i][2]] === value
      )
        return true;

    return false;
  };

  const onCellClick = (position) => {
    if (gameState[position] !== null || winner) return;

    const gameStateCopy = [...gameState];
    const player = isX ? 'X' : 'O';
    gameStateCopy[position] = player;
    setGameState(gameStateCopy);

    if (checkWin(player, gameStateCopy)) {
      setWinner(player);
    } else {
      if (movesCount === 8) {
        setWinner('Draw');
      }
    }

    setIsX(!isX);
    setMovesCount((prevState) => prevState + 1);
    undo.push(position);
    console.log('count:', movesCount);
  };

  const resetGame = () => {
    const resetArray = Array(9).fill(null);
    console.log(movesCount);
    setGameState(resetArray);
    setIsX(!isX);
    setWinner(null);
    setMovesCount(0);
  };

  const handleUndo = () => {
    const gameStateCopy = [...gameState];
    gameStateCopy[undo.pop()] = null;
    setGameState(gameStateCopy);
    setMovesCount((prevState) => prevState - 1);
    setIsX(!isX);
    setWinner(null);
  };

  return (
    <>
      <h1 className="heading">
        TIC &nbsp;<span className="tac"> TAC &nbsp;</span> TOE
      </h1>
      <p className="turn">{isX ? 'X' : 'O'}'s turn</p>
      <Board gameState={gameState} onClick={onCellClick} />
      <h1 className="gameProgress" style={{ textAlign: 'center' }}>
        {winner === null
          ? 'Game in Progress'
          : movesCount === 9 && winner === 'Draw'
          ? 'Match Draw'
          : `Winner: ${winner}`}
      </h1>
      <div class="controls">
        <button type="button" onClick={handleUndo}>
          Undo
        </button>
        <button type="button" onClick={resetGame}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
