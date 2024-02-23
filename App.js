import React, { useState } from 'react';
import './App.css';


const GameMessage = ({ winner, playAgain }) => {
  let message;
  if (winner === 'X') {
    message = 'X wins!';
  } else if (winner === 'O') {
    message = 'O wins!';
  } else {
    message = 'It\'s a draw!';
  }

  return (
    <div className="game-message">
      <div>{message}</div>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  return (
    <div>
      {winner || board.every((square) => square !== null) ? (
        <GameMessage winner={winner} playAgain={playAgain} />
      ) : (
        <div className="board1">
          
          <div className="status">Player's Turn: {xIsNext ? 'X' : 'O'}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          </div>
        
      )}
    </div>
  );
};
export default App;
