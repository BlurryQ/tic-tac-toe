console.log("JS running")

function Game () {
    const gameboard = [[0,0,0],[0,0,0],[0,0,0]]
    function makeChoice () {
        const choice = prompt("Choose your position")
        console.log(choice)
        markPosition(choice)
    }
    function makePlayer (name, score, marker) {
        player = {};
        player.name = name;
        player.score = score;
        player.marker = marker
        return player
    }
    function markPosition (choice) {
        const coordinates = choice.toString()
        console.log(coordinates)
        const x = coordinates[1]
        const y = coordinates[0]
        console.log("X: " + x + " | Y: " + y)
        gameboard[x-1][y-1] = "X"
        console.log(gameboard)
    }
    function winGame () {
        console.warn("we have a winner")
    }

    const playerOne = makePlayer("Player 1", 0, "X")
    const playerTwo = makePlayer("Player 2", 0, "O")
    console.log("playerOne")
    console.log(playerOne)
    console.log("playerTwo")
    console.log(playerTwo)
    makeChoice()
}


/* player choice:

        11  12  13
        21  22  23
        31  32  33

 */


Game()