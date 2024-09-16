/* IMPORTS */
import { calculateAdjacent, updateAdjacent, orientationCheck, 
    gridColumnsCalculate, gridRowsCalculate, trackLength, 
    calcBlockedAdj, randomIndex } from "./math.js"
import { updateBoard, fillWithIds, highlightCells, 
    unhighlightCells, blockCells } from "./board-setup.js"

/* battleship

INSTRUCTIONS:
Start with 6 x 6 grid

// current ship is
// ships[shipIndex].name
// location of ship:
// ships[shipIndex].location.push()

/*-------------------------------- Constants --------------------------------*/
// aGrid - player A, bGrid - player B
const aGrid = []; // single grid
const bGrid = []; // computer grid

// grid dimensions
const gridSize = 10;

// ships and their length
const ships = [
    {
        name: "battleship",
        length: 4,
        emoji: "🛳️",
        location: []
    },
    {
        name: "submarine",
        length: 3,
        emoji: "🛥️",
        location: []
    }
]

// event tracker
const clickOrder = [];

// COLORS
const colors = {
    block: "lightgrey",
    adjacent: "honeydew",
    suggest: "hotpink",
    board: "thistle",
    ship: "blue",
    button: "purple"
}


/*---------------------------- Variables (state) ----------------------------*/

// storing in JSON session storage
let aGrid_session;

// two-dimensional arrays
let horArray2D = [];
let verArray2D = [];

// tracker of unavailable cells
let unavailCells = [];

// array of adjacent cells
let adjacentCells;

// array of blocked adjacent cells
let blockedAdjCells;

// setup – time for a new ship
let clickNumber = 0;
let shipIndex = 0; // to change once the first ship has been setup
let nextShip = false;
let shipOrientation;
let shipsOnBoard = 0;

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

// cells
const cellsEl = document.querySelectorAll('.cell');

// board
const gameTableEl = document.querySelector('.game-table');

// instructions for the current ship
const immediateEl = document.getElementById('immediate-instruction');

// buttons
const readyButton = document.getElementById('ready-to-play');

const setupCommandEl = document.getElementById('setup-play');

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
    if ((adjacentCells === undefined || adjacentCells.includes(selectedCell)) 
        && e.target.classList.contains("cell") 
        && !unavailCells.includes(selectedCell)) {

        // track click
        clickOrder.push(selectedCell)

        // uncolor the previous suggested color
        unhighlightCells(cellsEl, colors.suggest, colors.board);

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
            e.target.style.backgroundColor = colors.block;

            // update board
            updateBoard(cellsEl, aGrid);

            // update unavailable cells
            unavailCells.push(selectedCell);
        }
        
        shipInCell();

        // move click number
        clickNumber++;

        function orientationAdjacent() {
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
            highlightCells(cellsEl, adjacentCells, unavailCells, colors.suggest);
        }

        orientationAdjacent();

        // check for length of ship
        nextShip = trackLength(ships, shipIndex);
        
        // ship is complete
        if (nextShip) {

            // color the blocked cells
            blockedAdjCells = calcBlockedAdj(gridSize, shipOrientation, ships[shipIndex].location, horArray2D, verArray2D)
            unavailCells = unavailCells.concat(blockedAdjCells);

            blockCells(cellsEl, blockedAdjCells, colors.adjacent)

            // change the completed cells to the cell color
            blockCells(cellsEl, ships[shipIndex].location, colors.ship)
            
            // reset trackers
            shipIsComplete();
            unhighlightCells(cellsEl, colors.suggest, colors.board);
        }

    }

    // check if all ships are complete
    allShipsComplete();

    // update the instructions message if the ships aren't complete
    if (!allShipsComplete() && nextShip) {

        immediateEl.textContent = `Now build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

    }
   
}

// reset click, change ship
const shipIsComplete = () => {
    
    console.log("Ship is complete")
    adjacentCells = undefined;
    blockedAdjCells = undefined;
    clickNumber = 0;
    shipIndex++; // to change once the first ship has been setup
    shipsOnBoard++;

}

// all ships complete
const allShipsComplete = () => {
    if (shipsOnBoard === ships.length) {
        console.log("Player is ready to begin")
        console.log(aGrid);

        // store the grid in the JSON
        sessionStorage.setItem("aGrid", JSON.stringify(aGrid));

        // activate ready button
        readyButton.textContent = "Ready?";
        readyButton.style.backgroundColor = colors.button;
        readyButton.removeAttribute('disabled');

        // remove event listener from board
        gameTableEl.removeEventListener("click", handleClick)

        // update instructions message
        immediateEl.textContent = `All set. If you don't like positions of your ships, restart the process.`;

        return true;
    }

    return false;
}

const computerSetup = () => {
    // get all of the IDs
    
    // produce random number to start on the board


}

// render existing player's board onto the new page
const renderPlayerSetup = () => {
    // retrieving information from previous page
    aGrid_session = JSON.parse(sessionStorage.getItem("aGrid"));

    // update board
    updateBoard(cellsEl, aGrid_session);
    console.log(aGrid_session);
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
    
    // if setup page
    if (setupCommandEl.textContent === "Setup Instructions:") {
        console.log("this is setup page");
        immediateEl.textContent = `Build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;
    } // if play page
    else {
        renderPlayerSetup();
    }
    
    // 2D arrays are assigned
    horArray2D = gridRowsCalculate(gridSize);
    verArray2D = gridColumnsCalculate(gridSize);
};

// click on a cell
gameTableEl.addEventListener("click", handleClick)

// experimental numbers
cruiserEl.addEventListener("click", () => {
    fillWithIds(cellsEl)
    console.log(cellsEl)
});

/* drag and drop – DISABLED
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}) */