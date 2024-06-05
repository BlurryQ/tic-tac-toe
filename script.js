function newGameboard() {
    const getGameboard = [["","",""],["","",""],["","",""]]
    const clearBoard = () => {
        for(const row in getGameboard) {
            for(const square in getGameboard[row]) {
                getGameboard[row][square] = ""
            }
        }
        
    }
    return {getGameboard, clearBoard }
}

function newInterface() {
    const playGame = document.getElementById("play-game")
        playGame.addEventListener("click", () => {

        const gameboard = newGameboard()
        const interface = newInterface()
        const GAMEFLOW = gameFlow(gameboard, interface,)
        GAMEFLOW.playGame()

})
    const getName = (player) => {
        const playerNameToFind = "player-" + player + "-name"
        const playerName = document.getElementById(playerNameToFind).value
        return !playerName ? "Player " + player : playerName
    }
    const getMarker = (player) => {
        const playerMarkerToFind = "player-" + player + "-marker"
        const playerMarker = document.getElementById(playerMarkerToFind).value
        if(!playerMarker) { return player === "one" ? "X" : "0" } 
        return playerMarker
    }
    const displayScores = (playerOne, playerTwo) => {
        const playerOneScoreDiv = document.getElementById("player-one-score")
        playerOneScoreDiv.textContent = "Score: " + playerOne.getScore()
        const playerTwoScoreDiv = document.getElementById("player-two-score")
        playerTwoScoreDiv.textContent = "Score: " + playerTwo.getScore()
        return
    }
    const declareWinner = (player) => {
        const resultDisplay = document.getElementById("game-result")
        if(player === "tie") { return resultDisplay.textContent = "This was a draw, better luck next time." }
        return resultDisplay.textContent = "The winner is " + player + "!! Well done!!"
    }
    const clearResults = () => {
        const resultDisplay = document.getElementById("game-result")
        return resultDisplay.textContent = ""
    }
    return { getName, getMarker, displayScores, declareWinner, clearResults }

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
    const playerOne = newPlayer(interface.getName(one), interface.getMarker(one), playerOneScore)
    const playerTwo = newPlayer(interface.getName(two), interface.getMarker(two), playerTwoScore)
    interface.clearResults()
    let round = 1,
    currentPlayer = playerOne
    alreadyWonOrTied = false
    const playGame = () => {
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
                    currentRound = getRound() // might not need
                    if(alreadyWonOrTied) { return }
                    markSquare(button.id, currentPlayer.getMarker())
                    currentPlayer = changeTurn(currentPlayer)
                    let weHaveWinner = checkForWinner()
                    if(weHaveWinner === playerOne.getMarker()) { 
                        playerOne.increaseScore() 
                        interface.declareWinner(playerOne.getName(), "Player One")
                        alreadyWonOrTied = true
                    } 
                    if(weHaveWinner === playerTwo.getMarker()) { 
                        playerTwo.increaseScore() 
                        interface.declareWinner(playerTwo.getName(), "Player Two")
                        alreadyWonOrTied = true
                    }

                    interface.displayScores(playerOne, playerTwo)

                    if(round === 10) {
                        alreadyWonOrTied = true
                        interface.declareWinner("tie")
                    } 


                })
                columnNumb++
            }
            rowNumb++
        }
    }
    const increaseRound = () => {
        round++
    }
    const getRound = () => {
        return round
    }
    const markSquare = (choice, marker) => {
        choice = choice.toString()
        const x = choice[0]
        const y = choice[1]
        gameboard[x][y] = marker
        const square = document.getElementById(choice)
        if(!square.textContent) {
        square.textContent = marker
        increaseRound()
        } else {
            return
        }
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


/* running code */

newInterface()


