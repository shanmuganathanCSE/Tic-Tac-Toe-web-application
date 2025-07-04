const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.dataset.index;

  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const winningCombo = checkWin();
  if (winningCombo) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;

    // Highlight the winning cells
    winningCombo.forEach(index => {
      const winCell = board.children[index];
      winCell.classList.add('win');
    });

  } else if (gameState.every(cell => cell !== '')) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}


function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return condition; // Return the winning indices
    }
  }
  return null;
}


resetBtn.addEventListener('click', () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  createBoard();
});

createBoard();
