import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import './styles/app.css';
import zero from './audio/zero.mp3';
import cross from './audio/cross.mp3';
import win from './audio/win.mp3';
import tie from './audio/tie.mp3';
import undoSound from './audio/undo.mp3';
import resetSound from './audio/reset.mp3';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [movesCount, setMovesCount] = useState(0);
  const [undo, setUndo] = useState([]);
  const [winnerCells, setWinnerCells] = useState([]);
  const [audios, setAudios] = useState({
    zero,
    cross,
    win,
    tie,
    undoSound,
    resetSound,
  });

  useEffect(() => {
    Object.entries(audios).map((audio) => new Audio(audio[1]));
  });

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
      ) {
        const temp = [
          winningPositions[i][0],
          winningPositions[i][1],
          winningPositions[i][2],
        ];
        setWinnerCells(temp);
        new Audio(audios.win).play();
        return true;
      }

    return false;
  };

  const onCellClick = (position) => {
    if (gameState[position] !== null || winner) return;

    const gameStateCopy = [...gameState];
    const player = isX ? 'X' : 'O';
    gameStateCopy[position] = player;
    setGameState(gameStateCopy);

    if (player === 'X') {
      console.log('idhar x');
      new Audio(audios.cross).play();
    } else {
      new Audio(audios.zero).play();
    }

    if (checkWin(player, gameStateCopy)) {
      setWinner(player);
    } else {
      if (movesCount === 8) {
        setWinner('Draw');
        new Audio(audios.tie).play();
      }
    }

    setIsX(!isX);
    setMovesCount((prevState) => prevState + 1);
    const newUndo = [...undo];
    newUndo.push(position);
    setUndo(newUndo);
  };

  const resetGame = () => {
    if (movesCount === 0) return;
    const resetArray = Array(9).fill(null);
    console.log(movesCount);
    setGameState(resetArray);
    new Audio(audios.resetSound).play();
    setIsX('X');
    setWinner(null);
    setMovesCount(0);
    setWinnerCells([]);
    setUndo([]);
  };

  const handleUndo = () => {
    if (undo.length === 0) return;
    const gameStateCopy = [...gameState];
    gameStateCopy[undo.pop()] = null;
    setGameState(gameStateCopy);
    new Audio(audios.undoSound).play();
    setMovesCount((prevState) => prevState - 1);
    setIsX(!isX);
    setWinner(null);
    setWinnerCells([]);
  };

  return (
    <>
      <div className="mainContainer">
        <h1 className="heading">
          TIC &nbsp;<span className="tac"> TAC &nbsp;</span> TOE
        </h1>
        <p className="turn">{isX ? 'X' : 'O'}'s turn</p>
        <Board
          gameState={gameState}
          onClick={onCellClick}
          winnerCells={winnerCells}
        />
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
      </div>
    </>
  );
}

export default App;
