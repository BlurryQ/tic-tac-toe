function newGameboard() {
    const getGameboard = [["","",""],["","",""],["","",""]]
    const clearBoard = () => {
        for(const row in getGameboard) {
            for(const square in getGameboard[row]) {
                getGameboard[row][square] = ""
            }
        }
        
    }
    const isGameboardFull = (gameboard) => {
        let flatGameboard = gameboard.flat()
        return !flatGameboard.includes("")
    }
    return { getGameboard, clearBoard, isGameboardFull }
}

function newInterface() {
    const getPlayerName = (player) => {
        const playerNameToFind = "player-" + player + "-name"
        const playerName = document.getElementById(playerNameToFind).value
        return !playerName ? "player " + player : playerName
    }
    const setPlayerName = (player, playerName) => {
        const playerNameToFind = "player-" + player + "-name"
        const playerNameDiv = document.getElementById(playerNameToFind)
        return playerNameDiv.value = capitalisedFirstLetter(playerName)
    }
    const getPlayerMarker = (player) => {
        const playerMarkerToFind = "player-" + player + "-marker"
        let playerMarker = document.getElementById(playerMarkerToFind).value
        if(!playerMarker) { return player === "one" ? "O" : "x" } 
        if(playerMarker.length > 1) { playerMarker = playerMarker[0] }
        return playerMarker
    }
    const displayScores = (playerOne, playerTwo) => {
        const playerOneScoreDiv = document.getElementById("player-one-score")
        playerOneScoreDiv.textContent = "Score: " + playerOne.getScore()
        const playerTwoScoreDiv = document.getElementById("player-two-score")
        playerTwoScoreDiv.textContent = "Score: " + playerTwo.getScore()
        return
    }
    const displayTurn = (currentPlayer) => {
        const playerOneNameDiv = document.getElementById("player-one-name")
        const playerTwoNameDiv = document.getElementById("player-two-name")
        const playerOneTurn = document.getElementById("player-one-turn")
        const playerTwoTurn = document.getElementById("player-two-turn")
        const playerOnePlaceholder = playerOneNameDiv.placeholder
        const playerTwoPlaceholder = playerTwoNameDiv.placeholder
        const playerOneValue = playerOneNameDiv.value
        const playerTwoValue = playerTwoNameDiv.value
        const currentPlayerName = capitalisedFirstLetter(currentPlayer.getName())
        if(playerOnePlaceholder === currentPlayerName || playerOneValue === currentPlayerName) {
            playerOneTurn.style.cssText = "color: white;"
            playerTwoTurn.style.cssText = "color: black;"
        }
        if(playerTwoPlaceholder === currentPlayerName || playerTwoValue === currentPlayerName) {
            playerTwoTurn.style.cssText = "color: white;"
            playerOneTurn.style.cssText = "color: black;"
        }
    }
    const declareWinner = (player) => {
        const resultDisplay = document.getElementById("game-result")
        if(player === "tie") { return resultDisplay.textContent = "This was a draw, better luck next time." }
        return resultDisplay.textContent = "The winner is " + capitalisedFirstLetter(player) + "!! Well done!!"
    }
    const clearResults = () => {
        const resultDisplay = document.getElementById("game-result")
        return resultDisplay.textContent = ""
    }
    const capitalisedFirstLetter = (string) => {
        const newName = []
        let words = string.split(" ")
        for(const word in words) {
            let firstLetter = words[word][0],
            remainder = words[word].split("").splice(1)
            firstLetter = firstLetter.toUpperCase()
            newName.push(firstLetter + remainder.join(""))
        }
        return newName.join(" ")
    }
    return { getPlayerName, setPlayerName, getPlayerMarker, displayScores, displayTurn, declareWinner, clearResults }

}

function newPlayer(name, marker, score) {
    const getName = () => {
        return name
    }
    const getMarker = () => {
        return marker
    }
    const getScore = () => {
        return score
    }
    const increaseScore = () => {
        score++
    }
    return { getName, getMarker, getScore, increaseScore }
}

function gameFlow (GAMEBOARD, interface) {
    const gameboard = GAMEBOARD.getGameboard,
    one = "one", two = "two",
    playerOneScoreDiv = document.getElementById("player-one-score").textContent,
    playerTwoScoreDiv = document.getElementById("player-two-score").textContent,
    playerOneScoreArr = playerOneScoreDiv.split(" "),
    playerTwoScoreArr = playerTwoScoreDiv.split(" "),
    playerOneScore = playerOneScoreArr[1],
    playerTwoScore = playerTwoScoreArr[1]
    const playerOne = newPlayer(interface.getPlayerName(one), interface.getPlayerMarker(one), playerOneScore)
    const playerTwo = newPlayer(interface.getPlayerName(two), interface.getPlayerMarker(two), playerTwoScore)
    interface.setPlayerName(one, playerOne.getName())
    interface.setPlayerName(two, playerTwo.getName())
    interface.clearResults()

    const playGame = (playerOneStarts) => {
        currentPlayer = playerOneStarts ? playerOne : playerTwo
        interface.displayTurn(currentPlayer)
        alreadyWonOrTied = false
        const grid = document.getElementById("grid")
        while(grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }

        let rowNumb = 0
        for(const row of gameboard) {
            let columnNumb = 0
            for(const column of gameboard) {
                const button = document.createElement("button")
                button.classList.add("square")
                button.setAttribute("id", (rowNumb + "" + columnNumb))
                grid.appendChild(button)
                button.addEventListener("click", () => {
                    if(alreadyWonOrTied) { return }
                    let squareMarked = markSquare(button.id, currentPlayer.getMarker())
                    if(!squareMarked) { return }
                    currentPlayer = changeTurn(currentPlayer)
                    interface.displayTurn(currentPlayer)
                    let weHaveWinner = checkForWinner()
                    if(weHaveWinner === playerOne.getMarker()) { 
                        playerOne.increaseScore() 
                        interface.declareWinner(playerOne.getName())
                        alreadyWonOrTied = true
                    } 
                    if(weHaveWinner === playerTwo.getMarker()) { 
                        playerTwo.increaseScore() 
                        interface.declareWinner(playerTwo.getName())
                        alreadyWonOrTied = true
                    }

                    interface.displayScores(playerOne, playerTwo)
                    if(GAMEBOARD.isGameboardFull(gameboard)) {
                        alreadyWonOrTied = true
                        interface.declareWinner("tie")
                    } 

                })
                columnNumb++
            }
            rowNumb++
        }
    }
    const markSquare = (choice, marker) => {
        choice = choice.toString()
        const x = choice[0]
        const y = choice[1]
        const square = document.getElementById(choice)
        if(!square.textContent) {
        gameboard[x][y] = marker
        square.textContent = marker
        return true
        }
        return false
    }
    const changeTurn = (player) => {
        return player === playerOne ? playerTwo : playerOne
    }
    const checkForWinner = () => {
        let weHaveWinner = false;
        for(let i = 0; i <= 2; i++) {
            weHaveWinner = checkRow(gameboard, i)
            if(weHaveWinner) { break }
            weHaveWinner = checkColumn(gameboard, i)
            if(weHaveWinner) { break }
        }
        if(!weHaveWinner) { weHaveWinner = checkHorizontal(gameboard) }
        return weHaveWinner
    }
    const checkRow = (gameboard, index) => {
        const rowPositionOne = gameboard[index][0],
        rowPositionTwo = gameboard[index][1],
        rowPositionThree = gameboard[index][2];
        if(!rowPositionOne || !rowPositionTwo || !rowPositionThree) { return false } ;
        if(rowPositionOne === rowPositionTwo && rowPositionTwo === rowPositionThree){
            return rowPositionOne
        } else {
            return false
        }
    }
    const checkColumn = (gameboard, index) => {
        const columnPositionOne = gameboard[0][index],
        columnPositionTwo = gameboard[1][index],
        columnPositionThree = gameboard[2][index]
        if(!columnPositionOne || !columnPositionTwo || !columnPositionThree) { return false } ;
        if(columnPositionOne === columnPositionTwo && columnPositionTwo === columnPositionThree){
            return columnPositionOne
        } else {
            return false
        }
    }
    const checkHorizontal = (gameboard) => {
        const topLeft = gameboard[0][0],
        topRight = gameboard[0][2],
        middleMiddle = gameboard[1][1],
        bottomLeft = gameboard[2][0],
        bottomRight = gameboard[2][2];
        
        if(!middleMiddle) { return false }
        if((topLeft === middleMiddle && middleMiddle === bottomRight ) || (topRight === middleMiddle && middleMiddle === bottomLeft)){
            return middleMiddle
        } else {
            return false
        }
    }
    return { playGame }
}

let playerOneStarts = true
function loadPage() {

    const playerOneTurn = document.getElementById("player-one-turn")
    const playerTwoTurn = document.getElementById("player-two-turn")
    playerOneTurn.style.cssText = "color: black;"
    playerTwoTurn.style.cssText = "color: black;"

    const playGame = document.getElementById("play-game")
        playGame.addEventListener("click", () => {
            
        const gameboard = newGameboard()
        const interface = newInterface()
        const GAMEFLOW = gameFlow(gameboard, interface,)
        GAMEFLOW.playGame(playerOneStarts)
        playerOneStarts = !playerOneStarts

    })
}

/* running code */

loadPage()


/* const oneMarkerLimiter = document.getElementById("player-one-marker")
oneMarkerLimiter.addEventListener("change", () => {
    let enteredMarker = oneMarkerLimiter.value
    console.log("Marker: " + enteredMarker + " and is " + enteredMarker.length + " chars long")
    if(enteredMarker.length > 1) { 
        console.log("here")
        let firstChar = enteredMarker[0] 
        enteredMarker = firstChar
    }
    console.warn(enteredMarker)
}) */