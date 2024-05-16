console.log("JS running")

function Game () {
    const gameboard = [[0,0,0],[0,0,0],[0,0,0]]
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
        const x = coordinates[1]
        const y = coordinates[0]
        console.log("X: " + x + " | Y: " + y)
        gameboard[x-1][y-1] = marker
        console.log(gameboard)
    }
    function winGame () {
        console.warn("we have a winner")
    }

    const playerOne = makePlayer("Player 1", 0, "X")
    const playerTwo = makePlayer("Player 2", 0, "O")
    for(let round = 1; round <= 9; round++) {
        if(round % 2 === 0) {
            makeChoice(playerOne.marker)
        } else {
            makeChoice(playerTwo.marker)
        }
        
    }
    
}


/* player choice:

        11  12  13
        21  22  23
        31  32  33

 */


Game()