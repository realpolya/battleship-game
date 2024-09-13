import { calculateAdjacent, updateAdjacent, orientationCheck, 
    gridColumnsCalculate, gridRowsCalculate, trackLength } from "./math.js"
import { updateBoard, fillWithIds, highlightCells, unhighlightCells } from "./board-setup.js"

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
        emoji: "🛳️",
        location: []
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️",
        location: []
    }
]

// event tracker
const clickOrder = [];

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

// two-dimensional arrays
let horArray2D = [];
let verArray2D = [];


// array of adjacent cells
let adjacentCells;

// setup – time for a new ship
let clickNumber = 0;
let shipIndex = 0; // to change once the first ship has been setup
let nextShip = false;
let shipOrientation;
let shipsOnBoard = 0;

// current ship is
// ships[shipIndex].name
// location of ship:
// ships[shipIndex].location.push()

// store selected cell
let selectedCell;

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
const readyButton = document.getElementById('ready-to-play');

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

    // current cell is assigned
    selectedCell = +e.target.id;

    // if (first click (aka adjacentCells empty) OR if id belongs to the adjacentCells array) AND cell class AND not assigned yet
    if ((adjacentCells === undefined || adjacentCells.includes(selectedCell)) && e.target.classList.contains("cell") && e.target.style.backgroundColor !== blockedColor) {

        // track click
        clickOrder.push(selectedCell)

        // uncolor the previous suggested color
        unhighlightCells(cellsEl, suggestiveColor, boardColor);

        function shipInCell() {
            // assign shipEl to the selectedCell
            aGrid[selectedCell - 1] = ships[shipIndex].emoji;

            // update the location of the ship in the ships object
            ships[shipIndex].location.push(selectedCell)
            console.log(ships)

            // sort the order of the location (always ascending)
            ships[shipIndex].location = ships[shipIndex].location.sort((a, b) => {
                return a - b;
            });

            // change color of the blocked cell
            e.target.style.backgroundColor = blockedColor;

            // update board
            updateBoard(cellsEl, aGrid);
        }
        
        shipInCell();

        // move click number
        clickNumber++;

        // determine orientation
        if (clickNumber === 2) {
            shipOrientation = orientationCheck(aGrid, ships[shipIndex].emoji)
        } 

        // calculate adjacent cells
        if (clickNumber >= 2) {
            adjacentCells = updateAdjacent(gridSize, shipOrientation, ships[shipIndex].location, horArray2D, verArray2D)
        } else {
            adjacentCells = calculateAdjacent(selectedCell, gridSize, aGrid);
        }

        // highlight suggested cells
        highlightCells(cellsEl, adjacentCells, blockedColor, suggestiveColor);

        // check for length of ship
        nextShip = trackLength(ships, shipIndex);
        
        // ship is complete
        if (nextShip) {
            shipIsComplete();
            unhighlightCells(cellsEl, suggestiveColor, boardColor);
        }

    }

    // check if all ships are complete
    allShipsComplete();

}

// reset click, change ship
const shipIsComplete = () => {
    
    console.log("Ship is complete")
    adjacentCells = undefined;
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
    
    // 2D arrays are assigned
    horArray2D = gridRowsCalculate(gridSize);
    verArray2D = gridColumnsCalculate(gridSize);
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