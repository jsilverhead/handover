const currentMove = document.querySelector('#currentMove');
const gameBoard = document.querySelector('#board');
const newGame = document.querySelector('#newGame');
const rows = document.querySelectorAll('td');
const cols = document.querySelectorAll('tr');

const boardColor = gameBoard.style.background;
const DISABLED_BOARD_COLOR = '#DCDCDC';

const players = {
  pl1: 'Игрок1',
  pl2: 'Игрок2',
};

let player1 = true;
let playerWon = 0;

const currentBoard = [
  // Вынес currentBoard в качестве глобальной переменной
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

newGame.addEventListener('click', startGame);

startGame();

function startGame() {
  gameBoard.style.background = boardColor;
  player1 = true;
  playerWon = 0;
  currentMove.textContent = players.pl1;

  for (let row of rows) {
    row.textContent = '';
  }

  for (let i = 0; i < currentBoard.length; i++) {
    for (let j = 0; j < currentBoard[i].length; j++) {
      currentBoard[i][j] = 0;
    }
  }

  game(currentBoard);
}

function gameOver() {
  if (playerWon < 3) {
    alert(`Выиграл игрок №${playerWon}!`);
  } else {
    alert('Ничья!');
  }
  gameBoard.style.background = DISABLED_BOARD_COLOR;
  gameBoard.removeEventListener('click', clickBoard);
}

function checkCombination(currentBoard) {
  const board = currentBoard.flat();
  let winner;

  if (board[0] === board[1] && board[1] === board[2]) winner = board[0]; // row1
  else if (board[3] === board[4] && board[4] === board[5])
    winner = board[3]; // row2
  else if (board[6] === board[7] && board[7] === board[8])
    winner = board[6]; // row3
  else if (board[0] === board[4] && board[4] === board[8])
    winner = board[0]; // diag1
  else if (board[6] === board[4] && board[4] === board[2])
    winner = board[6]; // diag2
  else if (board[0] === board[3] && board[3] === board[6])
    winner = board[0]; // col1
  else if (board[1] === board[4] && board[4] === board[7])
    winner = board[1]; // col2
  else if (board[2] === board[5] && board[5] === board[8])
    winner = board[2]; // col3
  else if (!board.includes(0)) {
    playerWon = 3;
    return gameOver();
  }

  if (winner === 'X') {
    playerWon = 1;
    return gameOver();
  }

  if (winner === 'O') {
    playerWon = 2;
    return gameOver();
  }
}

function game(currentBoard) {
  if (playerWon > 0) {
    gameBoard.removeEventListener('click', clickBoard); // !!!
    return; // !!!
  }

  gameBoard.addEventListener('click', clickBoard);
}

function clickBoard(e) {
  if (
    player1 === true &&
    e.target.id !== 'board' &&
    e.target.textContent !== 'X' &&
    e.target.textContent !== 'O'
  ) {
    e.target.textContent = 'X';
    if (e.target.id <= 2) currentBoard[0][e.target.id] = 'X';
    if (e.target.id > 2 && e.target.id <= 5)
      currentBoard[1][e.target.id - 3] = 'X';
    if (e.target.id > 5 && e.target.id <= 8)
      currentBoard[2][e.target.id - 6] = 'X';
    player1 = false;
    currentMove.textContent = players.pl2;

    checkCombination(currentBoard);
  } else if (
    player1 === false &&
    e.target.id !== 'board' &&
    e.target.textContent !== 'X' &&
    e.target.textContent !== 'O'
  ) {
    e.target.textContent = `O`;
    if (e.target.id <= 2) currentBoard[0][e.target.id] = `O`;
    if (e.target.id > 2 && e.target.id <= 5)
      currentBoard[1][e.target.id - 3] = `O`;
    if (e.target.id > 5 && e.target.id <= 8)
      currentBoard[2][e.target.id - 6] = `O`;
    console.table(currentBoard);
    player1 = true;
    currentMove.textContent = players.pl1;

    checkCombination(currentBoard);
  }
}
