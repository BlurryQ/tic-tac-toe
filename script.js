/* function board() {
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
const gridContent = (gameboard, tester) => {newGameboard()
    console.log(tester.getBoard)
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

            weHaveWinner = ""; //was "undefined"
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

} */


function newGameboard() {
    const getGameboard = [["","",""],["","",""],["","",""]]
    const clearBoard = () => {
        for(const row in getGameboard) {
            for(const square in getGameboard[row]) {
                getGameboard[row][square] = ""
            }
        }
        
    }
    return {getGameboard, clearBoard}
}

/* let tester = newGameboard()
let board = tester.getBoard
board[0][0] = "X"
console.table(board)
tester.clearBoard()
console.table(board) */

function interface() {
    const buildUI = (gameboard) => {
        console.log("GAMEBOARD BABY")
        const grid = document.getElementById("grid")


        while(grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }


        let round = 1
        let rowNumb = 0
        for(const row of gameboard) {
            let columnNumb = 0
            for(const column of gameboard) {
                const div = document.createElement("div")
                div.classList.add("square")
                div.setAttribute("id", (rowNumb + "" + columnNumb))
                grid.appendChild(div)
                div.addEventListener("click", () => {
    
                
    
                })
                columnNumb++
            }
            rowNumb++
        }
    }
    const displayName = () => {

    }
    const editName = () => {

    }
    const editMarker = () => {

    }
    const displayRound = () => {

    }
    const displayScore = () => {

    }
    const markPosition = (marker, choice) => {

    }
    return { buildUI, displayName, editName, editMarker, displayScore, markPosition }

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

function gameFlow (gameboard, interface, playerOne, playerTwo) {
    const newGame = () => {
        console.log("aaaah")
        console.log(interface())
        interface.buildUI
        console.log("here")
    }
    const selectSquare = (position) => {
                                                    const coordinates = choice.toString()
                                                    const x = coordinates[0]
                                                    const y = coordinates[1]
                                                    gameboard[x][y] = marker
                                                    const square = document.getElementById(choice)
                                                    square.textContent = marker
                                                    console.table(gameboard)
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
        
        
        /* weHaveWinner = ""; //was "undefined" */

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
    return { newGame, selectSquare, checkForWinner}
}


/* running code */

const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
    console.log("--- NEW GAME ---")
    
    const GAMEBOARD = newGameboard()
    const gameboard = GAMEBOARD.getGameboard
    console.table(gameboard)
/*     const INTERFACE = interface()
    console.log(INTERFACE)
    const interface = INTERFACE.buildUI() */
    const playerOne = newPlayer()
    const playerTwo = newPlayer()
    const GAMEFLOW = gameFlow(gameboard, interface, playerOne, playerTwo)
    console.log(GAMEFLOW)
    GAMEFLOW.newGame()
})


function tester(foo) {
    const testerooni = (foo) => {
        console.warn(foo)
    }
    return { testerooni}
}

const go = tester(foo)
go.testerooni()

/* look into scope */