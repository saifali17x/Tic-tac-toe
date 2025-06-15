const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#game-status");
const playerDisplay = document.querySelector("#player-display");

let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

function Player(marker, name) {
  this.marker = marker;
  this.name = name;
}

let player1, player2;
let currentPlayer = null;
let gameActive = false;

function updateStatus(message) {
  gameStatus.textContent = message;
}

function updatePlayerDisplay() {
  const player1Info = document.querySelector("#player1-info");
  const player2Info = document.querySelector("#player2-info");

  player1Info.classList.remove("active");
  player2Info.classList.remove("active");

  if (currentPlayer === player1) {
    player1Info.classList.add("active");
  } else {
    player2Info.classList.add("active");
  }
}

function createPlayerDisplay() {
  playerDisplay.innerHTML = `
    <div class="player-info active" id="player1-info">
      <div class="player-name">${player1.name}</div>
      <div class="player-marker x">X</div>
    </div>
    <div class="player-info" id="player2-info">
      <div class="player-name">${player2.name}</div>
      <div class="player-marker o">O</div>
    </div>
  `;
}

document.querySelector("#start-button").addEventListener("click", () => {
  const name1 = document.querySelector("#player1").value.trim() || "Player 1";
  const name2 = document.querySelector("#player2").value.trim() || "Player 2";

  player1 = new Player("X", name1);
  player2 = new Player("O", name2);
  currentPlayer = player1;
  gameActive = true;

  board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
  });

  document.querySelector("#modal").classList.add("hidden");
  document.querySelector("#game-container").classList.remove("hidden");
  document.querySelector("#game-status").classList.remove("hidden");
  document.querySelector("#player-display").classList.remove("hidden");

  createPlayerDisplay();
  updateStatus(`${currentPlayer.name}'s turn`);
});

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "-" || !gameActive) return;

  board[index] = currentPlayer.marker;

  e.target.classList.add(currentPlayer.marker.toLowerCase());

  let winner = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    updateStatus(`🎉 ${winner.name} wins! 🎉`);
    document.querySelector("#player1-info").classList.remove("active");
    document.querySelector("#player2-info").classList.remove("active");
    return;
  }

  if (!board.includes("-")) {
    gameActive = false;
    updateStatus("🤝 Game is a Draw! 🤝");
    document.querySelector("#player1-info").classList.remove("active");
    document.querySelector("#player2-info").classList.remove("active");
    return;
  }

  currentPlayer = currentPlayer === player1 ? player2 : player1;
  updateStatus(`${currentPlayer.name}'s turn`);
  updatePlayerDisplay();
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return board[a] !== "-" && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
  });

  gameActive = true;
  currentPlayer = player1;

  updateStatus(`Game reset! ${currentPlayer.name}'s turn`);
  updatePlayerDisplay();
}

document.querySelector("#reset").addEventListener("click", resetGame);
