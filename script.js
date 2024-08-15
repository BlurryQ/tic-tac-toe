function newGameboard() {
  const getGameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const clearBoard = (gameboard) => {
    for (let row in gameboard) {
      for (let square in gameboard[row]) {
        gameboard[row][square] = "";
      }
    }
  };
  const isGameboardFull = (gameboard) => {
    let flatGameboard = gameboard.flat();
    return !flatGameboard.includes("");
  };
  return { getGameboard, clearBoard, isGameboardFull };
}

/* ---------- ---------- ---------- ---------- */

function newInterface() {
  const playerOneNameDiv = document.getElementById("player-one-name");
  const playerTwoNameDiv = document.getElementById("player-two-name");
  const playerOneTurn = document.getElementById("player-one-turn");
  const playerTwoTurn = document.getElementById("player-two-turn");
  const playerOneScoreDiv = document.getElementById("player-one-score");
  const playerTwoScoreDiv = document.getElementById("player-two-score");
  const playGame = document.getElementById("play-game");
  const resultDisplay = document.getElementById("game-result");

  const getPlayerName = (player) => {
    const playerNameToFind = "player-" + player + "-name";
    const playerName = document.getElementById(playerNameToFind).value;
    return !playerName ? "player " + player : playerName;
  };
  const setPlayerName = (player, playerName) => {
    const playerNameToFind = "player-" + player + "-name";
    const playerNameDiv = document.getElementById(playerNameToFind);
    return (playerNameDiv.value = _capitalisedFirstLetter(playerName));
  };
  const getNameChanges = () => {
    playerOneNameDiv.addEventListener("change", _validateNames);
    playerTwoNameDiv.addEventListener("change", _validateNames);
  };
  const _validateNames = () => {
    const namesMatch =
      playerOneNameDiv.value.toLowerCase() ===
      playerTwoNameDiv.value.toLowerCase();
    if (namesMatch) {
      _disableNewGame();
    } else {
      _enableNewGame();
    }
  };
  const _disableNewGame = () => {
    playGame.setAttribute("disabled", true);
    playerOneNameDiv.setCustomValidity("Invalid field.");
    playerTwoNameDiv.setCustomValidity("Invalid field.");
    playerOneNameDiv.style.cssText =
      "background-color: var(--error-color-opacity);";
    playerTwoNameDiv.style.cssText =
      "background-color: var(--error-color-opacity);";
    playGame.style.cssText = "color: var(--error-color-opacity);";
    resultDisplay.textContent =
      "Names don't match, please make them unqiue to play :)";
  };
  const _enableNewGame = () => {
    playGame.removeAttribute("disabled");
    playerOneNameDiv.setCustomValidity("");
    playerTwoNameDiv.setCustomValidity("");
    playerOneNameDiv.style.cssText = "background-color: inherit";
    playerTwoNameDiv.style.cssText = "background-color: inherit";
    playGame.style.cssText = "color: white;";
    resultDisplay.textContent = "";
  };
  const getPlayerMarker = (player) => {
    const playerMarkerToFind = "player-" + player + "-marker";
    let playerMarker = document.getElementById(playerMarkerToFind).value;
    if (!playerMarker) {
      return player === "one" ? "O" : "x";
    }
    if (playerMarker.length > 1) {
      playerMarker = playerMarker[0];
    }
    return playerMarker;
  };
  const displayScores = (playerOne, playerTwo) => {
    playerOneScoreDiv.textContent = "Score: " + playerOne.getScore();
    playerTwoScoreDiv.textContent = "Score: " + playerTwo.getScore();
    return;
  };
  const displayTurn = (currentPlayer) => {
    const playerOnePlaceholder = playerOneNameDiv.placeholder;
    const playerTwoPlaceholder = playerTwoNameDiv.placeholder;
    const playerOneValue = playerOneNameDiv.value;
    const playerTwoValue = playerTwoNameDiv.value;
    const currentPlayerName = _capitalisedFirstLetter(currentPlayer.getName());
    if (
      playerOnePlaceholder === currentPlayerName ||
      playerOneValue === currentPlayerName
    ) {
      playerOneTurn.style.cssText = "color: white;";
      playerTwoTurn.style.cssText = "color: black;";
    }
    if (
      playerTwoPlaceholder === currentPlayerName ||
      playerTwoValue === currentPlayerName
    ) {
      playerTwoTurn.style.cssText = "color: white;";
      playerOneTurn.style.cssText = "color: black;";
    }
  };
  const declareWinner = (player) => {
    if (player === "tie") {
      return (resultDisplay.textContent =
        "This was a draw, better luck next time.");
    }
    return (resultDisplay.textContent =
      "The winner is " + _capitalisedFirstLetter(player) + "!! Well done!!");
  };
  const clearResults = () => {
    return (resultDisplay.textContent = "");
  };
  const _capitalisedFirstLetter = (string) => {
    const newName = [];
    let words = string.split(" ");
    for (const word in words) {
      let firstLetter = words[word][0],
        remainder = words[word].split("").splice(1);
      firstLetter = firstLetter.toUpperCase();
      newName.push(firstLetter + remainder.join(""));
    }
    return newName.join(" ");
  };
  return {
    getPlayerName,
    setPlayerName,
    getNameChanges,
    getPlayerMarker,
    displayScores,
    displayTurn,
    declareWinner,
    clearResults,
  };
}

/* ---------- ---------- ---------- ---------- */

function newPlayer(name, marker, score) {
  const getName = () => {
    return name;
  };
  const getMarker = () => {
    return marker;
  };
  const getScore = () => {
    return score;
  };
  const increaseScore = () => {
    score++;
  };
  return { getName, getMarker, getScore, increaseScore };
}

/* ---------- ---------- ---------- ---------- */

function newgameFlow(GAMEBOARD, interface) {
  const gameboard = GAMEBOARD.getGameboard,
    one = "one",
    two = "two",
    playerOneScoreDiv = document.getElementById("player-one-score").textContent,
    playerTwoScoreDiv = document.getElementById("player-two-score").textContent,
    grid = document.getElementById("grid");
  (playerOneScoreArr = playerOneScoreDiv.split(" ")),
    (playerTwoScoreArr = playerTwoScoreDiv.split(" ")),
    (playerOneScore = playerOneScoreArr[1]),
    (playerTwoScore = playerTwoScoreArr[1]);
  const playerOne = newPlayer(
    interface.getPlayerName(one),
    interface.getPlayerMarker(one),
    playerOneScore
  );
  const playerTwo = newPlayer(
    interface.getPlayerName(two),
    interface.getPlayerMarker(two),
    playerTwoScore
  );
  interface.setPlayerName(one, playerOne.getName());
  interface.setPlayerName(two, playerTwo.getName());
  interface.clearResults();

  GAMEBOARD.clearBoard(gameboard);
  const playGame = (playerOneStarts) => {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    let alreadyWonOrTied = false,
      rowNumb = 0,
      currentPlayer = playerOneStarts ? playerOne : playerTwo;
    interface.displayTurn(currentPlayer);
    for (let row of gameboard) {
      let columnNumb = 0;
      for (let column of gameboard) {
        const button = document.createElement("button");
        button.classList.add("square");
        button.setAttribute("id", rowNumb + "" + columnNumb);
        grid.appendChild(button);
        button.addEventListener("click", () => {
          if (alreadyWonOrTied) return;
          let squareMarked = _markSquare(button.id, currentPlayer.getMarker());
          if (!squareMarked) return;
          let weHaveWinner = _checkForWinner();
          if (weHaveWinner) {
            _winGame(weHaveWinner);
            alreadyWonOrTied = true;
          }
          interface.displayScores(playerOne, playerTwo);
          currentPlayer = _changeTurn(currentPlayer);
          interface.displayTurn(currentPlayer);
          if (GAMEBOARD.isGameboardFull(gameboard) && !weHaveWinner) {
            interface.declareWinner("tie");
            alreadyWonOrTied = true;
          }
        });
        columnNumb++;
      }
      rowNumb++;
    }
  };
  const _markSquare = (choice, marker) => {
    choice = choice.toString();
    const x = choice[0];
    const y = choice[1];
    const square = document.getElementById(choice);
    if (!square.textContent) {
      gameboard[x][y] = marker;
      square.textContent = marker;
      return true;
    }
    return false;
  };
  const _changeTurn = (player) => {
    return player === playerOne ? playerTwo : playerOne;
  };
  const _checkForWinner = () => {
    let weHaveWinner = false;
    for (let i = 0; i <= 2; i++) {
      weHaveWinner = _checkRow(gameboard, i);
      if (weHaveWinner) {
        break;
      }
      weHaveWinner = _checkColumn(gameboard, i);
      if (weHaveWinner) {
        break;
      }
    }
    if (!weHaveWinner) {
      weHaveWinner = _checkHorizontal(gameboard);
    }
    return weHaveWinner;
  };
  const _checkRow = (gameboard, index) => {
    const rowPositionOne = gameboard[index][0],
      rowPositionTwo = gameboard[index][1],
      rowPositionThree = gameboard[index][2];
    if (!rowPositionOne || !rowPositionTwo || !rowPositionThree) {
      return false;
    }
    if (
      rowPositionOne === rowPositionTwo &&
      rowPositionTwo === rowPositionThree
    ) {
      return rowPositionOne;
    } else {
      return false;
    }
  };
  const _checkColumn = (gameboard, index) => {
    const columnPositionOne = gameboard[0][index],
      columnPositionTwo = gameboard[1][index],
      columnPositionThree = gameboard[2][index];
    if (!columnPositionOne || !columnPositionTwo || !columnPositionThree) {
      return false;
    }
    if (
      columnPositionOne === columnPositionTwo &&
      columnPositionTwo === columnPositionThree
    ) {
      return columnPositionOne;
    } else {
      return false;
    }
  };
  const _checkHorizontal = (gameboard) => {
    const topLeft = gameboard[0][0],
      topRight = gameboard[0][2],
      middleMiddle = gameboard[1][1],
      bottomLeft = gameboard[2][0],
      bottomRight = gameboard[2][2];

    if (!middleMiddle) {
      return false;
    }
    if (
      (topLeft === middleMiddle && middleMiddle === bottomRight) ||
      (topRight === middleMiddle && middleMiddle === bottomLeft)
    ) {
      return middleMiddle;
    } else {
      return false;
    }
  };
  const _winGame = (winningMarker) => {
    if (winningMarker === playerOne.getMarker()) {
      playerOne.increaseScore();
      interface.declareWinner(playerOne.getName());
    }
    if (winningMarker === playerTwo.getMarker()) {
      playerTwo.increaseScore();
      interface.declareWinner(playerTwo.getName());
    }
  };
  return { playGame };
}

/* ---------- ---------- ---------- ---------- */

let playerOneStarts = true;
function loadPage() {
  const playerOneTurn = document.getElementById("player-one-turn");
  const playerTwoTurn = document.getElementById("player-two-turn");
  playerOneTurn.style.cssText = "color: black;";
  playerTwoTurn.style.cssText = "color: black;";

  const gameboard = newGameboard();
  const interface = newInterface();
  interface.getNameChanges();

  const playGame = document.getElementById("play-game");
  playGame.addEventListener("click", () => {
    const gameFlow = newgameFlow(gameboard, interface);
    gameFlow.playGame(playerOneStarts);
    playerOneStarts = !playerOneStarts;
  });
}

/* ---------- running code ---------- */

loadPage();
