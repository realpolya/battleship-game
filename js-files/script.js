import { calculateAdjacent } from "./math.js"

/* battleship

INSTRUCTIONS:
Start with 6 x 6 grid

/*-------------------------------- Constants --------------------------------*/
// aGrid - player A, bGrid - player B
const aGrid = []; // single grid
const bGrid = [];

// grid dimensions
const gridSize = 6;

// ships and their length
const shipsLength = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
}

const ships = ["battleship", "cruiser"]

const battleshipEmoji = "🛳️";
const cruiserEmoji = "⛴️";

// array of adjacent cells
let adjacentCells = [];

/*---------------------------- Variables (state) ----------------------------*/

// win/lose condition
let gameOver = false;
let winner;

// store selected cell
let selectedCell;

// drag and drop – used tutorial from Appwrite
let newX = 0
let newY = 0
let startX = 0
let startY = 0

// colors
let blockedColor = "lightgrey"
let adjacentColor = "honeydew"
let suggestiveColor = "hotpink"
let boardColor = "thistle" // coordinate with css


/*------------------------ Cached Element References ------------------------*/

// images of the ship
const battleshipEl = document.getElementById("battleship");
const cruiserEl = document.getElementById("cruiser");

const playerSetupEl = document.getElementById("player-setup");

// cells
const cellsEl = document.querySelectorAll('.cell');

// board
const gameTableEl = document.querySelector('.game-table');

// instructions for the current ship
const immediateEl = document.getElementById('immediate-instruction');

// buttons
const readyButton = document.getElementById('#ready-to-play');

/*-------------------------------- Functions --------------------------------*/

/* drag and drop functions – for battleShip element - DISABLED
const mouseMove = (e) => {
    newX = startX - e.clientX
    newY = startY - e.clientY

    // dynamically updating current position
    startX = e.clientX
    startY = e.clientY

    battleshipEl.style.left = (battleshipEl.offsetLeft - newX) + 'px';
    battleshipEl.style.top = (battleshipEl.offsetTop - newY) + 'px';
}

const mouseUp = e => {
    document.removeEventListener('mousemove', mouseMove)
} */

// update board function
const updateBoard = () => {
    let i = 0;
    cellsEl.forEach((cell) => {
        cell.textContent = aGrid[i];
        i++;
    });
}

// handle click on a cell
const handleClick = (e) => {

    selectedCell = +e.target.id;

    // if (first click (aka adjacentCells empty) OR if id belongs to the adjacentCells array) AND cell class
    if ((adjacentCells.length === 0 || adjacentCells.includes(selectedCell)) && e.target.classList.contains("cell")) {

        // uncolor the previous suggested color
        unhighlightCells();

        // assign shipEl to the selectedCell
        aGrid[selectedCell - 1] = battleshipEmoji;

        // change color
        e.target.style.backgroundColor = blockedColor;

        // render board
        updateBoard();

        // calculate cells for hte next move
        adjacentCells = calculateAdjacent(selectedCell, gridSize);
        console.log("Adjacent cells are", adjacentCells);

        // highlight suggested cells
        highlightCells(adjacentCells);

        // check for length of ship

            // if length has been reached, free up the adjacentCells array
    }
}

// experimental fill cells with their number ids
const fillWithIds = (e) => {
    let i = 1;
    cellsEl.forEach((cell) => {
        cell.textContent = i;
        i++;
    });
}

// function to track length of each ship, shiptype for which ship, ships for obj
const trackLength = (shiptype, obj) => {
    let length = obj[shiptype];

    // once the length of the ship is completed, free up the arr array
}

// highlight adjacent cells
const highlightCells = (arr) => {
    let i = 1;
    cellsEl.forEach((cell) => {
        if (arr.includes(i) && cell.style.backgroundColor !== blockedColor) {
            cell.style.backgroundColor = suggestiveColor;
        }
        i++;
    });
}

const unhighlightCells = () => {
    cellsEl.forEach((cell) => {
        if (cell.style.backgroundColor === suggestiveColor){
            cell.style.backgroundColor = boardColor;
        };
    });
}


/*----------------------------- Event Listeners -----------------------------*/

// console log
battleshipEl.addEventListener("click", () => {
    console.log("Battleship clicked");
})

cruiserEl.addEventListener("click", () => {
    console.log("Cruiser clicked");
    handleClick;
})

// get instruction for the first ship to build
onload = () => {
    immediateEl.textContent = "Build a 4-cell battleship";
};

// click on a cell
gameTableEl.addEventListener("click", handleClick)

// experimental numbers
cruiserEl.addEventListener("click", fillWithIds);

/* drag and drop – DISABLED
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}) */