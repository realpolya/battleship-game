/* battleship

INSTRUCTIONS:
Start with 5 x 5 grid
Pseudocode:
1) 

*/


/*-------------------------------- Constants --------------------------------*/
// aGrid - player A, bGrid - player B
const aGrid = [[]]; // double grid
const bGrid = [[]];

// ships and their length
const carrierCells = 5;
const battleshipCells = 4;
const cruiserCells = 3;
const submarineCells = 3;
const destroyerCells = 2;

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


/*------------------------ Cached Element References ------------------------*/

// images of the ship
const battleshipEl = document.getElementById("battleship");
const cruiserEl = document.getElementById("cruiser");

const playerSetupEl = document.getElementById("player-setup");

// cells
const cellsEl = document.querySelectorAll('.cell');


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

}

// handle click on a cell
const handleClick = (e) => {
    console.log(e);
    selectedCell = e.target.id;
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


// drag and drop
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
})