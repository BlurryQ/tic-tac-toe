console.log("JS running")

const newBoard = () => {
        const rowSpaces = Array.from( {length: 3} )
        const columnSpaces = Array.from( {length: 3} )
        rowSpaces.fill(columnSpaces)
        return rowSpaces
    }


const gameboard = [[0,0,0],[0,0,0],[0,0,0]]

function Game () {
/* 
    const makeChoice = (marker) => {
        const choice = prompt("Choose your position")
        markPosition(marker, choice)
    } */
    const makePlayer = (name, score, marker) => {
        player = {};
        player.name = name;
        player.score = score;
        player.marker = marker
        return player
    }
    
    const markPosition = (marker, choice) => {
        const coordinates = choice.toString()
        const x = coordinates[0]
        const y = coordinates[1]
        gameboard[x][y] = marker
        console.table(gameboard)
        const square = document.getElementById(choice)
        square.textContent = marker
    }
    const checkForWinner = (playerOneMarker) => {
        let weHaveWinner = false;
        for(let i = 0; i <= 2; i++) {
            weHaveWinner = checkRow(i)
            if(weHaveWinner) { break }
            weHaveWinner = checkColumn(i)
            if(weHaveWinner) { break }
        }
        if(!weHaveWinner) { weHaveWinner = checkHorizontal() }
        console.log("marker: " + weHaveWinner)
        if(weHaveWinner) {
            return winGame(weHaveWinner, playerOneMarker)
        } else {
            return;
        }
    }
    const checkRow = (index) => {
        const rowPositionOne = gameboard[index][0],
        rowPositionTwo = gameboard[index][1],
        rowPositionThree = gameboard[index][2];
        if(!rowPositionOne || !rowPositionTwo || !rowPositionThree) { return false } ;
        if(rowPositionOne === rowPositionTwo && rowPositionTwo === rowPositionThree){
            console.log("ROW WINNER")
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
            console.log("COLUMN WINNER")
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
            console.log("DIAGONAL WINNER")
            return middleMiddle
        } else {
            return false
        }
    }

    const winGame = (marker, playerOneMarker) => {
        const player = marker === playerOneMarker ? "Player One" : "Player One"
        console.warn("---WINNER IS " + player + " ---")
        //reset gameboard
        return player
    }

    const play = () => {
        const playerOne = makePlayer("Player 1", 0, "X")
        const playerTwo = makePlayer("Player 2", 0, "O")

    }
    
    return { /* makeChoice */makePlayer, markPosition, checkForWinner, checkRow, checkColumn, checkHorizontal, winGame, play }
}


/* player choice:

        00  01  02
        10  11  12
        20  21  22

        11  12  13
        21  22  23
        31  32  33

 */

const grid = document.getElementById("grid")
const playGame = document.getElementById("play-game")


const gridContent = (arr, newGame) => {
    let round = 1
    let rowNumb = 0
    for(const row of arr) {
        let columnNumb = 0
        for(const column of arr) {
            const div = document.createElement("div")
            div.classList.add("square")
            div.setAttribute("id", (rowNumb + "" + columnNumb))
            grid.appendChild(div)
            div.addEventListener("click", () => {
            console.warn(div.id)

            weHaveWinner = undefined;
            console.log("round " + round)
            if(round % 2 === 1) {
                newGame.markPosition("X", div.id)
                round++
            } else {
                newGame.markPosition("O", div.id)
                round++
            }
            weHaveWinner = newGame.checkForWinner("X")
            
            if(round === 10) {
                console.log("This is a tie")
                weHaveWinner = "--- TIE ---"
                //reset gameboard
            }

            })
            columnNumb++
        }
        rowNumb++
    }
}

playGame.addEventListener("click", () => {
    console.log("--- NEW GAME ---")
    const newGame = Game()
    newGame.play()
    gridContent(gameboard, newGame)
})

