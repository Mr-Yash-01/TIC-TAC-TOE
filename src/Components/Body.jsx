import React, { useState } from 'react';

const Body = () => {
  // State for the board, turn, winning cells, and score
  const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [turn, setTurn] = useState(true);
  const [winningCells, setWinningCells] = useState([]);
  const [score, setScore] = useState({ player1: 0, player2: 0, draws: 0 });

  // Function to add mark on the board
  const addMark = (row, col) => {
    if (board[row][col] !== '' || winningCells.length > 0) return; // Prevent overriding marks or marking after win

    const newBoard = [...board];
    newBoard[row][col] = turn ? 'X' : 'O';
    setBoard(newBoard);
    setTurn(!turn);

    const winner = checkWinner(newBoard);

    if (winner) {
      setWinningCells(winner.cells);
      setTimeout(() => {
        const newScore = { ...score };
        if (winner.player === 'Draw') {
          newScore.draws += 1;
        } else {
          newScore[winner.player === 'X' ? 'player1' : 'player2'] += 1;
        }
        setScore(newScore);

        setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
        setTurn(true);
        setWinningCells([]);
      }, 2000); // Wait for the animation to complete
    }
  };

  const checkWinner = (board) => {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
        return { player: board[a[0]][a[1]], cells: line.map(([r, c]) => `${r}${c}`) };
      }
    }

    // Check for a draw
    if (board.every(row => row.every(cell => cell !== ''))) {
      return { player: 'Draw', cells: board.flat().map((_, idx) => `${Math.floor(idx / 3)}${idx % 3}`) };
    }

    return null;
  };

  return (
    <div className='flex flex-auto min-w-fit justify-center align-middle min-h-80'>
      <div className='flex flex-col w-full justify-center items-center'>
        {/* Custom CSS for the Tic Tac Toe board grid */}
        <style>
          {`
            .custom-grid {
              display: grid;
              grid-template-columns: repeat(3, 100px); /* Fixed button width */
              grid-template-rows: repeat(3, 100px); /* Fixed button height */
              gap: 0;
            }

            /* Add borders to create a grid like # */
            .custom-grid > button {
              padding: 1rem;
              color: white;
              font-size: 3rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid white; /* Default border */
              position: relative;
              background-color: transparent; /* Make background transparent initially */
              transition: background-color 0.3s;
              width: 100%; /* Ensure button takes up entire cell width */
              height: 100%; /* Ensure button takes up entire cell height */
            }

            /* Remove outer borders to create inner grid lines */
            .custom-grid > button:nth-child(1),
            .custom-grid > button:nth-child(2),
            .custom-grid > button:nth-child(3) {
              border-top: none;
            }
            .custom-grid > button:nth-child(1),
            .custom-grid > button:nth-child(4),
            .custom-grid > button:nth-child(7) {
              border-left: none;
            }
            .custom-grid > button:nth-child(3),
            .custom-grid > button:nth-child(6),
            .custom-grid > button:nth-child(9) {
              border-right: none;
            }
            .custom-grid > button:nth-child(7),
            .custom-grid > button:nth-child(8),
            .custom-grid > button:nth-child(9) {
              border-bottom: none;
            }

            /* Blinking animation for winning cells */
            @keyframes blink {
              0% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 1; }
            }

            .winning-cell {
              animation: blink 1s infinite;
            }
          `}
        </style>

        {/* Tic Tac Toe board grid */}
        <div className='custom-grid'>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`${winningCells.includes(`${rowIndex}${colIndex}`) ? 'winning-cell' : ''}`}
                onClick={() => addMark(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))
          )}
        </div>

        <div className='flex flex-wrap gap-8 w-full justify-center items-center mt-20 max-w-5xl'>
          <div className='flex flex-col text-center'>
            <h3>PLAYER 1</h3>
            <h3 id="player1" className='text-2xl md:text-4xl lg:text-4xl'>{score.player1}</h3>
          </div>
          <div className='flex flex-col text-center'>
            <h3>PLAYER 2</h3>
            <h3 id="player2" className='text-2xl md:text-4xl lg:text-4xl'>{score.player2}</h3>
          </div>
          <div className='flex flex-col text-center'>
            <h3>DRAWS</h3>
            <h3 id="draws" className='text-2xl md:text-4xl lg:text-4xl'>{score.draws}</h3>
          </div>
          <div className='flex flex-col gap-1 text-center items-center'>
            <h1 >
              RESET
            </h1>
            <div className='flex gap-4 justify-around'>
              <button
                className='py-1 px-1 w-8 h-8 bg-blue-500 text-white rounded-full'
                onClick={() => {
                  setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
                  setTurn(true);
                  setWinningCells([]);
                }}>
                <img className='px-0.5' src='./src/assets/icons8-grid-96.png'></img>
              </button>
              <button
                className='py-1 px-1 w-8 h-8 bg-blue-500 text-white rounded-full'
                onClick={() => {
                  setScore({ player1: 0, player2: 0, draws: 0 });
                }}>
                <img className='px-0.5' src='./src/assets/icons8-score-64.png'></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
