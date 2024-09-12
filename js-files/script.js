/* import calculateAdjacent from "./math.js" */

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
const ships = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    csubmarine: 3,
    destroyer: 2,
}

const shipEl = "○";

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

// drag and drop functions – for battleShip element
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
}

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
    console.log(e);
    console.log(e.target.id)
    selectedCell = e.target.id;

    // if first click (aka adjacentCells empty) or if id belongs to the adjacentCells array

    // only if the cell is clicked
    if (e.target.classList.contains("cell")) {
        // assign shipEl to the selectedCell
        aGrid[selectedCell - 1] = shipEl;

        // change color
        e.target.style.backgroundColor = blockedColor;

        // render board
        updateBoard();

        // calculate cells for hte next move
        adjacentCells = calculateAdjacent(selectedCell, gridSize);
        console.log("Adjacent cells are", adjacentCells);

        // highlight suggested cells
        highlightCells(adjacentCells);
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


// pass cell for cell number, gridSize for size
const calculateAdjacent = (cell, size) => {
    let arr = [];

    // convert cell to number
    cell = +cell;

    let squared = size * size;
    let a; let b; let c; let d;

    console.log("remainder", cell % size)
    // all numbers divisible by 6 are at the right border
    if (cell % size === 0) {
        // if 6
        if (cell == size) {
            b = cell - 1;
            d = cell + size;
            console.log(b, d)
        } // if 36
        else if (cell === squared) {
            b = cell - 1;
            c = cell - size;
        } else {
            b = cell - 1;
            c = cell - size; d = cell + size;
        }
    } // if first row
    else if (cell < size) {
        if (cell === 1) {
            a = cell + 1;
            d = cell + size;
        } else {
            a = cell + 1; b = cell - 1; 
            d = cell + size;
        }
    } //all numbers 1 and +6 are at the left border (remainder 1)
    else if (cell % size === 1) {
        // if the bottom right cell
        if (cell === squared - (size - 1)) {
            a = cell + 1;
            c = cell - size;
        } else {
            a = cell + 1;
            c = cell - size; d = cell + size;
        }
    } // between 36 through 31 are at the bottom
    else if (cell < squared && cell > squared - (size - 1)) {
        a = cell + 1; b = cell - 1; 
        c = cell - size;
    } // everything else – center
    else {
        a = cell + 1; b = cell - 1; // horizontal
        c = cell - size; d = cell + size; // vertical
    }

    arr.push(a, b, c, d);
    arr = arr.filter((el) => {
        return el !== undefined;
    })

    // update arr array
    return arr;
}

const highlightCells = (arr) => {
    let i = 1;
    cellsEl.forEach((cell) => {
        if (arr.includes(i)) {
            cell.style.backgroundColor = suggestiveColor;
        }
        i++;
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

// drag and drop
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
})

// click on a cell
gameTableEl.addEventListener("click", handleClick)

// experimental numbers
cruiserEl.addEventListener("click", fillWithIds);