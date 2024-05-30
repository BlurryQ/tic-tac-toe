function board() {
    let gameboard = [[0,0,0],[0,0,0],[0,0,0]]
    const getBoard = () => {
            const rowSpaces = Array.from( {length: 3} )
            const columnSpaces = Array.from( {length: 3} )
            rowSpaces.fill(columnSpaces)
            return rowSpaces
        }
    const clearBoard = () => { //not working as intended
        gameboard = [[0,0,0],[0,0,0],[0,0,0]]
    }
    return { gameboard, getBoard, clearBoard }
}

function Game (gameboard) {
    const selectSquare = (position) => {

    }
    const checkForWinner = () => {
        let weHaveWinner = false;
        for(let i = 0; i <= 2; i++) {
            weHaveWinner = checkRow(i)
            if(weHaveWinner) { break }
            weHaveWinner = checkColumn(i)
            if(weHaveWinner) { break }
        }
        if(!weHaveWinner) { weHaveWinner = checkHorizontal() }
        return weHaveWinner
    }
    const checkRow = (index) => {
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
    const checkColumn = (index) => {
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
    const checkHorizontal = () => {
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
    return { selectSquare, checkForWinner}
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
//////////////////////////////////////////////////////////////////////////////
const gridContent = (gameboard, newGame) => {
    const grid = document.getElementById("grid")
    const gameboardGrid = gameboard.gameboard,
    playerOne = newPlayer("Player 1", "X"),
    playerTwo = newPlayer("Player 2", "O")
    let round = 1
    let rowNumb = 0
    for(const row of gameboardGrid) {
        let columnNumb = 0
        for(const column of gameboardGrid) {
            const div = document.createElement("div")
            div.classList.add("square")
            div.setAttribute("id", (rowNumb + "" + columnNumb))
            grid.appendChild(div)
            div.addEventListener("click", () => {

            weHaveWinner = undefined;
            if(round % 2 === 1) {
                const marker = playerOne.getMarker()
                newGame.markPosition(marker, div.id)
                round++
            } else {
                const marker = playerTwo.getMarker()
                newGame.markPosition(marker, div.id)
                round++
            }
            weHaveWinner = newGame.checkForWinner()
            
            if(weHaveWinner) {
                const winner = weHaveWinner === playerOne.getMarker() ? playerOne : playerTwo
                winner.increaseScore()
                const playerOneScore = document.getElementById("player-one-score")
                const playertwoScore = document.getElementById("player-two-score")
                playerOneScore.textContent = "Score: " + playerOne.getScore()
                playertwoScore.textContent = "Score: " + playerTwo.getScore()
                //clear gameboard
            }

            if(round === 10) {
                console.log("This is a tie")
                weHaveWinner = "--- TIE ---"
                //clear gameboard
            }

            })
            columnNumb++
        }
        rowNumb++
    }
}
//////////////////////////////////////////////////////////////////////////////

const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
    console.log("--- NEW GAME ---")
    
    const newGameboard = board()
    const newGame = Game(newGameboard.gameboard)
    let display = render(newGameboard, newGame)
    display.gameboardUI()
})

function render(gameboard, game) {
    const gameboardUI = () => {
        const grid = document.getElementById("grid")
        const gameboardGrid = gameboard.gameboard;
        let rowNumb = 0
        for(const row of gameboardGrid) {
            let columnNumb = 0
            for(const column of gameboardGrid) {
                const div = document.createElement("div")
                div.classList.add("square")
                div.setAttribute("id", (rowNumb + "" + columnNumb))
                grid.appendChild(div)
                div.addEventListener("click", () => {
                    game.selectSquare(div.id)
                })
            }
        }
    }
    const markPosition = (marker, choice) => {
        const coordinates = choice.toString()
        const x = coordinates[0]
        const y = coordinates[1]
        gameboard[x][y] = marker
        const square = document.getElementById(choice)
        square.textContent = marker
        console.table(gameboard)
    }
    return { gameboardUI, markPosition }

}


/* gameFlow = creates players, controls rounds, checks winner (row, horiz & diag)
        needs:
    gameboard = checks (row, horiz & diag) winner? () = no return
    players
    render = grid (remove old), names, scores, positions 
    */