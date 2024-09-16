/* IMPORTS */
import { calculateAdjacent, updateAdjacent, orientationCheck, 
    gridColumnsCalculate, gridRowsCalculate, trackLength, 
    calcBlockedAdj, computerArray, randomIndex } from "./math.js"
import { updateBoard, fillWithIds, highlightCells, 
    unhighlightCells, blockCells, shipInCell } from "./board-setup.js"

/* battleship

INSTRUCTIONS:
Start with 6 x 6 grid

// current ship is
// ships[shipIndex].name
// location of ship:
// ships[shipIndex].location.push()

/*-------------------------------- Constants --------------------------------*/
// aGrid – concatenated grid for all players
let aGrid = []; // single grid with ALL values
let bGrid = []; // only computer values

// grid dimensions
const gridSize = 10;
const gridSquared = gridSize * gridSize;

// ships – player setup
const ships = [
    {
        name: "carrier",
        length: 5,
        emoji: "🚢",
        location: []
    },
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
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️",
        location: []
    },
    {
        name: "destroyer",
        length: 2,
        emoji: "⛵",
        location: []
    }
]

// ships – computer setup
const shipsComputer = [
    {
        name: "carrier",
        length: 5,
        emoji: "🚢",
        location: []
    },
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
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️",
        location: []
    },
    {
        name: "destroyer",
        length: 2,
        emoji: "⛵",
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
    ship: "darkblue",
    button: "purple"
}


/*---------------------------- Variables (state) ----------------------------*/

// use computer as additional value in some functions
let computer = true;
let session_computer; // once value is stored to Session storage, reloads won't affect it


// computer IDs array
let compArray = [];

// two-dimensional arrays for human 1 through grid size squared
let horArray2D = [];
let verArray2D = [];

// two-dimensional arrays for computer grid-size squared - grid-size squared * 2
let comHorArray2D = [];
let comVerArray2D = []; 

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
let computerReady = false;

// store selected cell
let selectedCell;


/*------------------------ Cached Element References ------------------------*/

// images of the ship
const battleshipEl = document.getElementById("battleship");
const cruiserEl = document.getElementById("cruiser");

// cells – player cells 1-100, computer 101-200 for 10x10
const cellsEl = document.querySelectorAll('.cell');

// board
const gameTableEl = document.querySelector('.game-table');

// instructions for the current ship
const immediateEl = document.getElementById('immediate-instruction');

// buttons
const reButton = document.getElementById('ready-restart');
const setupCommandEl = document.getElementById('setup-play');

/*-------------------------------- Functions --------------------------------*/

// handle click on a cell
const handleClickSetup = (e) => {

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

        console.log(selectedCell)
        // place ship in cell
        shipInCell(aGrid, selectedCell, ships, shipIndex, cellsEl, unavailCells)

        // change color of the blocked cell
        e.target.style.backgroundColor = colors.block;

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

            // set to session storage
            sessionStorage.setItem(`ships-${ships[shipIndex].name}`, JSON.stringify(ships[shipIndex].location));
            
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

        // store the grid and ships in the JSON
        sessionStorage.setItem("aGrid", JSON.stringify(aGrid));

        // activate ready button
        reButton.textContent = "Ready?";
        reButton.style.backgroundColor = colors.button;
        reButton.removeAttribute('disabled');

        // remove event listener from board
        gameTableEl.removeEventListener("click", handleClickSetup)

        // update instructions message
        immediateEl.textContent = `All set. If you don't like positions of your ships, restart the process.`;

        // reset trackers for computer
        clickNumber = 0;
        shipIndex = 0;
        nextShip = false;
        shipsOnBoard = 0;
        adjacentCells = undefined;

        return true;
    }

    return false;
}

/* functions below – setup for play page ONLY */

// computer setup
const computerSetup = () => {

    // get all of the IDs 101-200
    compArray = computerArray(gridSize);

    // render ships for computer
    function computerBoard() {

        // computer index
        let i;

        // after the first move, selected cell is one of the available ones from adjacent cells
        if (nextShip || clickNumber === 0) {
            i = compArray[randomIndex(compArray)];
        } else {
            i = adjacentCells[randomIndex(adjacentCells)];
        }

        selectedCell = i;
        console.log("Selected cell is ", selectedCell)

        if ((adjacentCells === undefined || adjacentCells.includes(selectedCell)) 
            && !unavailCells.includes(selectedCell)) {

                // ship in cell
                shipInCell(aGrid, selectedCell, shipsComputer, shipIndex, cellsEl, unavailCells, bGrid);

                // move click number
                clickNumber++;

                // orientation check
                function orientationAdjacent() {
                    // determine orientation
                    if (clickNumber === 2) {
                        shipOrientation = orientationCheck(bGrid, ships[shipIndex].emoji)
                    } 
        
                    // calculate adjacent cells
                    if (clickNumber >= 2) {
                        adjacentCells = updateAdjacent(gridSize, shipOrientation, shipsComputer[shipIndex].location, comHorArray2D, comVerArray2D)
                    } else {
                        adjacentCells = calculateAdjacent(selectedCell, gridSize, bGrid);
                    }

                    //filter adjacent cells so they can't be below 100
                    adjacentCells = adjacentCells.filter((cell) => {
                        return cell > gridSquared && cell <= (gridSquared + gridSquared);
                    })
        
                    // highlight suggested cells
                    highlightCells(cellsEl, adjacentCells, unavailCells, colors.suggest);
                }

                orientationAdjacent();

                // check for length of ship
                nextShip = trackLength(shipsComputer, shipIndex);

                // ship is complete
                if (nextShip) {

                    // color the blocked cells
                    blockedAdjCells = calcBlockedAdj(gridSize, shipOrientation, shipsComputer[shipIndex].location, comHorArray2D, comVerArray2D, computer)
                    
                    //filter blocked cells so they can't be below 100
                    blockedAdjCells = blockedAdjCells.filter((cell) => {
                        return cell > gridSquared && cell <= (gridSquared + gridSquared);
                    })

                    unavailCells = unavailCells.concat(blockedAdjCells);

                    blockCells(cellsEl, blockedAdjCells, colors.adjacent)

                    // change the completed cells to the cell color
                    blockCells(cellsEl, shipsComputer[shipIndex].location, colors.ship)

                    // set to session storage
                    sessionStorage.setItem(`shipsComputer-${shipsComputer[shipIndex].name}`, JSON.stringify(shipsComputer[shipIndex].location));
                    
                    // reset trackers
                    shipIsComplete();
                    unhighlightCells(cellsEl, colors.suggest, colors.board);
                }

            }
        
        if (shipsOnBoard === shipsComputer.length) {
            computerReady = true;
            return true;
        } else {
            computerBoard();
        }

    }
    
    computerBoard();
    
    if (computerReady) {
        console.log("computer is ready")
        console.log(shipsComputer)

        console.log(aGrid)

        // add computer Ready to JSON
        sessionStorage.setItem("computer", computerReady)
        session_computer = JSON.parse(sessionStorage.getItem("computer"));
        console.log(session_computer);

        // reassign aGrid to the JSON variable so it is saved
        sessionStorage.setItem("aGrid", JSON.stringify(aGrid));
        aGrid = JSON.parse(sessionStorage.getItem("aGrid"));

    } 

}

// render existing player's board onto the new page
const renderPlayerSetup = () => {
    // retrieving information from previous page
    aGrid = JSON.parse(sessionStorage.getItem("aGrid"));

    updateBoard(cellsEl, aGrid);

    // update location of each ship from session storage
    ships.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`ships-${ship.name}`));
        blockCells(cellsEl, ship.location, colors.ship)
    })
}

const renderComputer = () => {
    
    // update location of each ship from session storage
    shipsComputer.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`shipsComputer-${ship.name}`));
        blockCells(cellsEl, ship.location, colors.ship)
    })

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

    function arrays2D () {
        // 2D arrays are assigned
        horArray2D = gridRowsCalculate(gridSize);
        verArray2D = gridColumnsCalculate(gridSize);

        // 2D arrays for computer set
        comHorArray2D = gridRowsCalculate(gridSize, computer)
        comVerArray2D = gridColumnsCalculate(gridSize, computer)
    }

    arrays2D();
    
    // if setup page
    if (setupCommandEl.textContent === "Setup Instructions:") {

        console.log("this is setup page");
        immediateEl.textContent = `Build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

    } // if play page – render player setup and calculate computer setup
    else {
        
        // add event listener to restart button (a way to erase the computer ship setup)
        reButton.addEventListener('click', () => {
            session_computer = false;
            sessionStorage.setItem("computer", session_computer)
        })

        // render player setup
        renderPlayerSetup();

        // update whether the computer setup has been done
        session_computer = JSON.parse(sessionStorage.getItem("computer"));
        
        // if the computer setup is not done, do it
        if (!session_computer) {
            computerSetup();
        }

    }

    // render computer's setup
    renderComputer();

};

// click on a cell
gameTableEl.addEventListener("click", handleClickSetup)

// experimental numbers
cruiserEl.addEventListener("click", () => {
    fillWithIds(cellsEl)
    console.log(cellsEl)
});