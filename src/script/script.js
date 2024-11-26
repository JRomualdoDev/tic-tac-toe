const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6] //diagonals
];

function checkWinner() {
    for (let combination of winningConditions) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }
    if (!board.includes(null)) {
        gameActive = false;
        statusText.textContent = "It's a draw!";
    }
}

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetGame();