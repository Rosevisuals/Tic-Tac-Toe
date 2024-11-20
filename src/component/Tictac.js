import React, { useState, useEffect, useCallback } from 'react';
import './TicTac.css';
import { FaMoon, FaSun } from 'react-icons/fa'; // Importing icons for theme toggle

const Square = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Tictac = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [timer, setTimer] = useState(10);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [theme, setTheme] = useState('light');

  const handleNextTurn = useCallback(() => {
    if (winner) return;
    setIsXNext(!isXNext);
    setTimer(10);
  }, [winner, isXNext]);

  useEffect(() => {
    if (winner) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNextTurn();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [handleNextTurn, winner]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else {
      setIsXNext(!isXNext);
      setTimer(10);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setTimer(10);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const renderCelebration = () => {
    if (!winner) return null;
    return (
      <div className="celebration">
        <h1>🎉 {winner === 'X' ? playerX : playerO} Wins! 🎉</h1>
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      </div>
    );
  };

  const status = winner
    ? `Winner: ${winner === 'X' ? playerX : playerO}`
    : `Next Player: ${isXNext ? playerX : playerO}`;

  return (
    <div className={`game-container ${theme}`}>
      {renderCelebration()}
      <h1>Tic Tac Toe</h1>
      <div className="player-names">
        <input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Player X Name"
        />
        <input
          type="text"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          placeholder="Player O Name"
        />
      </div>
      <div className="status">{status}</div>
      <div className="timer">⏳ Timer: {timer}s</div>
      <div className="board">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            isWinningSquare={winningLine.includes(0)}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            isWinningSquare={winningLine.includes(1)}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            isWinningSquare={winningLine.includes(2)}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            isWinningSquare={winningLine.includes(3)}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            isWinningSquare={winningLine.includes(4)}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            isWinningSquare={winningLine.includes(5)}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            isWinningSquare={winningLine.includes(6)}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            isWinningSquare={winningLine.includes(7)}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            isWinningSquare={winningLine.includes(8)}
          />
        </div>
      </div>
      <div className="controls">
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <div className="theme-icon" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
};

export default Tictac;
