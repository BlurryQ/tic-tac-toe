console.log("JS running")

function Game () {
    let gameboard = [[0,0,0],[0,0,0],[0,0,0]]
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

        //while loop?
        for(let i = 0; i <= 2; i++) {
            
            weHaveWinner = checkRow(i)
            if(weHaveWinner) { continue }
            weHaveWinner = checkColumn(i)
            if(weHaveWinner) { continue }
        }
        console.log("marker: " + weHaveWinner)
        if(weHaveWinner) {
            winGame(weHaveWinner)
        } else {
            return;
        }
    }
    function checkRow(index) {
        (console.log("GI" + gameboard[index][0]))
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
    function checkColumn(index) {
        const columnPositionOne = gameboard[0][index],
        columnPositionTwo = gameboard[1][index],
        columnPositionThree = gameboard[2][index]
        if(!columnPositionOne || !columnPositionTwo || !columnPositionThree) { return false } ;
        console.log("1: " + columnPositionOne + "| 2: " + columnPositionTwo + "| 3: " + columnPositionThree)
        if(columnPositionOne === columnPositionTwo && columnPositionTwo === columnPositionThree){
            console.log("COLUMN WINNER")
            return columnPositionOne
        } else {
            return false
        }
    }
    function checkHorizontal() {
        const topLeft = gameboard[0][0],
        topRight = gameboard[0][2],
        middleMiddle = gameboard[1][1],
        bottomLeft = gameboard[2][0],
        bottomRight = gameboard[2][2];
        
        console.log("(TL: " + topLeft + "| MM: " + middleMiddle + "| BR: " + bottomRight)
        console.log("| BL: " + bottomLeft + "| MM: " + middleMiddle +  " | TR: " + topRight)
        if((!topLeft &&  !bottomRight)||(!bottomLeft &&  !topRight)) { 
            console.log("kick")
            return false } ;
        console.log(success)
        if((topLeft === middleMiddle && middleMiddle === bottomRight )|| (topRight === middleMiddle && middleMiddle === bottomLeft)){
            console.log("DIAGONAL WINNER")
            return middleMiddle
        } else {
            return false
        }
    }

    function winGame (marker) {
        console.log("HERE")
        const player = playerOne.marker ? playerOne.name : playerTwo.name
        console.warn("---WINNER IS " + player + " ---")
        return marker ===  playerOne.marker ? playerOne.name : playerTwo.name
    }

    const playerOne = makePlayer("Player 1", 0, "X")
    const playerTwo = makePlayer("Player 2", 0, "O")
    for(let round = 1; round <= 3/* 9 */; round++) {
/*         if(round % 2 === 1) {
            makeChoice(playerOne.marker)
        } else {
            makeChoice(playerTwo.marker)
        } */
        makeChoice(playerOne.marker)
        checkForWinner()
    }
    
}


/* player choice:

        00  01  02
        10  11  12
        20  21  22

        11  12  13
        21  22  23
        31  32  33

 */


Game()

