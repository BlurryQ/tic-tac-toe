console.log("JS running")

function Game () {
    let gameboard = [[,,],[,,],[,,]]
    function makeChoice (marker) {
        const choice = prompt("Choose your position")
        console.log(choice)
        markPosition(marker, choice)
    }
    function makePlayer (name, score, marker) {
        player = {};
        player.name = name;
        player.score = score;
        player.marker = marker
        return player
    }
    function markPosition (marker, choice) {
        const coordinates = choice.toString()
        console.log(coordinates)
        const x = coordinates[0]
        const y = coordinates[1]
        console.log("X: " + x + " | Y: " + y)
        gameboard[x-1][y-1] = marker
        console.log(gameboard)
    }
    function checkForWinner () {
        let weHaveWinner = false;
        checkRow(1)

/*         checkColumn(i)

        checkHorizontal() */


        if(weHaveWinner) {
            winGame(player)
        } else {
            return;
        }
    }
    function checkRow(index) {
        const rowPositionOne = gameboard[index][0],
        rowPositionTwo = gameboard[index][1],
        rowPositionThree = gameboard[index][2]
        if(rowPositionOne && (rowPositionOne === rowPositionTwo && rowPositionTwo === rowPositionThree)){
            console.log("ROW WINNER")
            return rowPositionOne
        } else {
            return false
        }
    }
    function checkColumn(index) {
        const columnPositionOne = gameboard[0][index],
        columnPositionTwo = gameboard[1][index],
        columnPositionThree = gameboard[2][index]
        if(columnPositionOne && (columnPositionOne === columnPositionTwo && columnPositionTwo === columnPositionThree)){
            console.log("COLUMN WINNER")
            return columnPositionOne
        } else {
            return false
        }
    }
    function checkHorizontal() {

    }

    function winGame (player) {
        console.warn("we have a winner")
    }

    const playerOne = makePlayer("Player 1", 0, "X")
    const playerTwo = makePlayer("Player 2", 0, "O")
    for(let round = 1; round <= 9; round++) {
        if(round % 2 === 1) {
            makeChoice(playerOne.marker)
        } else {
            makeChoice(playerTwo.marker)
        }
        checkForWinner()
    }
    
}


/* player choice:

        11  12  13
        21  22  23
        31  32  33

 */


Game()

