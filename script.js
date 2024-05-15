console.log("JS running")

const Gameboard = {
    gameboard: [[,,],[,,],[,,]],

}

const Players = {    
    playerOne: {
    name: "Player 1",
    score: 0,
    },

    playersTwo: {
        name: "Player 2",
        score: 0,
    }

}
const Game = {
    playRound: () => {

    },
    winGame: () => {
        console.warn("we have a winner")
    },
}

Game.winGame()