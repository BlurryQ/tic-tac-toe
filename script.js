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
    let choice = ""
    const selectSquare = (gameboard) => {

    }
    const displayName = () => {

    }
    const editName = () => {

    }
    const editMarker = () => {

    }
    const displayScores = (playerOne, playerTwo) => {
        const playerOneScoreDiv = document.getElementById("player-one-score")
        playerOneScoreDiv.textContent = "Score: " + playerOne.getScore()
        const playerTwoScoreDiv = document.getElementById("player-two-score")
        playerTwoScoreDiv.textContent = "Score: " + playerTwo.getScore()

    }
    const markPosition = (marker, choice) => {

    }
    return { selectSquare, displayName, editName, editMarker, displayScores, markPosition }

}

function newPlayer(name, marker) {
    let score = 0;
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
    gameboard = GAMEBOARD.getGameboard
    const playerOne = newPlayer("playerOne", "X")
    const playerTwo = newPlayer("playerTwo", "O")
    let round = 1,
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
                const div = document.createElement("div")
                div.classList.add("square")
                div.setAttribute("id", (rowNumb + "" + columnNumb))
                grid.appendChild(div)
                div.addEventListener("click", () => {
                    currentRound = getRound()
                    console.log("clicked " + div.id + " mothertrucker")
                    if(alreadyWonOrTied) { return }
                    if(round % 2 === 1) {
                        marker = playerOne.getMarker()
                    } else {
                        marker = playerTwo.getMarker()
                    }
                    markSquare(div.id, marker)
                    let weHaveWinner = checkForWinner()
                    console.warn("Winning marker: " + weHaveWinner)

                    if(weHaveWinner === playerOne.getMarker()) { 
                        playerOne.increaseScore() 
                        alreadyWonOrTied = true
                    } 
                    if(weHaveWinner === playerTwo.getMarker()) { 
                        playerTwo.increaseScore() 
                        alreadyWonOrTied = true
                    }

                    interface.displayScores(playerOne, playerTwo)

                    if(round === 10) {
                        alreadyWonOrTied = true
                        console.log("This is a tie")
                        weHaveWinner = "--- TIE ---"
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
        console.log("C: " + choice)
        console.log("M: " + marker)
        choice = choice.toString()
        const x = choice[0]
        const y = choice[1]
        gameboard[x][y] = marker
        const square = document.getElementById(choice)
        square.textContent = marker
        console.table(gameboard)
        increaseRound()
        console.warn(round)
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

const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
    console.log("--- NEW GAME ---")

    const gameboard = newGameboard()
    const interface = newInterface()
    const GAMEFLOW = gameFlow(gameboard, interface,)
    console.log(GAMEFLOW)
    GAMEFLOW.playGame()
})


