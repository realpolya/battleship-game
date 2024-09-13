import { calculateAdjacent, updateAdjacent, orientationCheck } from "./math.js"
import { updateBoard, fillWithIds } from "./board-setup.js"

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
const ships = [
    {
        name: "battleship",
        length: 4,
        emoji: "🛳️"
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️"
    }
]

/*
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
*/

// colors
const blockedColor = "lightgrey"
const adjacentColor = "honeydew"
const suggestiveColor = "hotpink"
const boardColor = "thistle" // coordinate with css
const completedShipColor = "blue"
const buttonColor = "purple"

/*---------------------------- Variables (state) ----------------------------*/

// array of adjacent cells
let adjacentCells = [];

// setup – time for a new ship
let clickNumber = 0;
let shipIndex = 0; // to change once the first ship has been setup
let nextShip = false;
let shipOrientation;
let shipsOnBoard = 0;

// store selected cell
let selectedCell;
let previousCell;

// drag and drop – used tutorial from Appwrite
let newX = 0
let newY = 0
let startX = 0
let startY = 0


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

// handle click on a cell
const handleClick = (e) => {

    // previous cell is assigned
    previousCell = selectedCell;

    // current cell is assigned
    selectedCell = +e.target.id;

    // if (first click (aka adjacentCells empty) OR if id belongs to the adjacentCells array) AND cell class
    if ((adjacentCells.length === 0 || adjacentCells.includes(selectedCell)) && e.target.classList.contains("cell")) {

        // uncolor the previous suggested color
        unhighlightCells();

        function shipInCell() {
            // assign shipEl to the selectedCell
            aGrid[selectedCell - 1] = ships[shipIndex].emoji;

            // change color of the blocked cell
            e.target.style.backgroundColor = blockedColor;

            // update board
            updateBoard(cellsEl, aGrid);
        }
        
        shipInCell();

        // move click number
        clickNumber++;
        console.log("click number ", clickNumber)

        // determine orientation for click 3
        if (clickNumber === 2) {
            shipOrientation = orientationCheck(aGrid, ships[shipIndex].emoji)
        } 

        // calculate cells for hte next move
        adjacentCells = calculateAdjacent(selectedCell, gridSize, aGrid);
        console.log("Adjacent cells are", adjacentCells);

        if (clickNumber >= 2) {
            // filter out the wrong direction from the suggested array
            /*excludeAdjacent(adjacentCells, shipOrientation)*/

        }

        // highlight suggested cells
        highlightCells(adjacentCells);

        // check for length of ship

            // if length has been reached, free up the adjacentCells array
    }

    // check if all ships are complete
    allShipsComplete();

}

// function to track length of each ship, shiptype for which ship, ships for obj
const trackLength = (shiptype, obj) => {
    let length = obj[shiptype];

    // once the length of the ship is completed, free up the arr array
}

// reset click, change ship
const shipIsComplete = () => {
    
    clickNumber = 0;
    shipIndex++; // to change once the first ship has been setup
    nextShip = true;
    shipsOnBoard++;

}

// all ships complete
const allShipsComplete = () => {
    if (shipsOnBoard === ships.length) {
        console.log("Player is ready to begin")

        // activate ready button
        readyButton.textContent = "Ready?";
        readyButton.style.backgroundColor = buttonColor;
        readyButton.removeAttribute('disabled');
    }
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
cruiserEl.addEventListener("click", () => {
    fillWithIds(cellsEl)
});

/* drag and drop – DISABLED
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}) */