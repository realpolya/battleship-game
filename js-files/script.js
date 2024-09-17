/* IMPORTS */
import { calculateAdjacent, updateAdjacent, orientationCheck, 
    gridColumnsCalculate, gridRowsCalculate, trackLength, 
    calcBlockedAdj, computerArray, randomIndex } from "./math.js"
import { updateBoard, fillWithIds, highlightCells, 
    unhighlightCells, blockCells, shipInCell, renderScore } from "./board-setup.js"
import { analyzeAttack, winner } from "./play.js";

/* BATTLESHIP

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
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "battleship",
        length: 4,
        emoji: "🛳️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "submarine",
        length: 3,
        emoji: "🛥️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "destroyer",
        length: 2,
        emoji: "⛵",
        location: [],
        hits: 0,
        alive: true
    }
]

// ships – computer setup
const shipsComputer = [
    {
        name: "carrier",
        length: 5,
        emoji: "🚢",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "battleship",
        length: 4,
        emoji: "🛳️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "submarine",
        length: 3,
        emoji: "🛥️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "cruiser",
        length: 3,
        emoji: "⛴️",
        location: [],
        hits: 0,
        alive: true
    },
    {
        name: "destroyer",
        length: 2,
        emoji: "⛵",
        location: [],
        hits: 0,
        alive: true
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
    button: "purple",
    fire: "hotpink",
    hit: "red",
    miss: "blue",
    dead: "black",
    firebutton: "grey"
}

// score variable
const score = {
    player: 0,
    computer: 0
}


/*---------------------------- Variables (state) ----------------------------*/

// use computer as additional value in some functions
let computer = true;
let session_computer; // once value is stored to Session storage, reloads won't affect it

// computer IDs array, human IDs array
let compArray = [];
let playerArray = [];

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

// game specific variables
let hitCount = 0; // human
let hitCountComp = 0; // computer
let missArr = []; // IDs of missed cells
let hitArr = []; // IDs of hit cells
let deadArr = []; // IDs of dead cells with revealed ships

let whoWon;

let timeDelay = 2000; // 1000 equals to 1 second



/*------------------------ Cached Element References ------------------------*/

// images of the ship
const battleshipEl = document.getElementById("battleship");
const cruiserEl = document.getElementById("cruiser");

// cells – player cells 1-100, computer 101-200 for 10x10
const cellsEl = document.querySelectorAll('.cell');

// board
const gameTableEl = document.querySelector('.game-table');
const compTableEl = document.getElementById('computer-table');

// instructions for the current ship, score-keeper for game
const immediateEl = document.getElementById('immediate-instruction');
const computerEl = document.getElementById('computer-move');
const scoreEl = document.getElementById('score');

// buttons
const reButton = document.getElementById('ready-restart');
const fireButton = document.getElementById('fire');
const setupCommandEl = document.getElementById('setup-play');

/*-------------------------------- SETUP Page Functions --------------------------------*/

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
        shipInCell(aGrid, selectedCell, ships, gridSquared, shipIndex, cellsEl, unavailCells)

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
        aGrid = JSON.parse(sessionStorage.getItem("aGrid"));
        console.log(aGrid);

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

/*-------------------------------- PLAY Page Functions --------------------------------*/

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

        if ((adjacentCells === undefined || adjacentCells.includes(selectedCell)) 
            && !unavailCells.includes(selectedCell)) {

                // ship in cell
                shipInCell(aGrid, selectedCell, shipsComputer, gridSquared, shipIndex, cellsEl, unavailCells, bGrid, true);

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
                    
                    // highlight suggested cells – COMPUTER  NOT NEEDED
                    //highlightCells(cellsEl, adjacentCells, unavailCells, colors.suggest);
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

                    // change the completed cells to the cell color – COMPUTER  NOT NEEDED
                    //blockCells(cellsEl, blockedAdjCells, colors.adjacent)
                    //blockCells(cellsEl, shipsComputer[shipIndex].location, colors.ship)

                    // set to session storage
                    sessionStorage.setItem(`shipsComputer-${shipsComputer[shipIndex].name}`, JSON.stringify(shipsComputer[shipIndex].location));
                    
                    // reset trackers
                    shipIsComplete();
                    unhighlightCells(cellsEl, colors.suggest, colors.board);
                }

            }
        
        if (shipsOnBoard === shipsComputer.length) {
            
            console.log("all ships are on board")
            computerReady = true;
            return true;

        } else {
            
            computerBoard();

        }

    }
    
    computerBoard();
    console.log("ComputerReady is ", computerReady)
    
    if (computerReady) {
        
        console.log("computer is ready")

        // add computer Ready to JSON
        sessionStorage.setItem("computer", computerReady)
        session_computer = JSON.parse(sessionStorage.getItem("computer"));

        // reassign aGrid to the JSON variable so it is saved
        sessionStorage.setItem("aGrid", JSON.stringify(aGrid));

    } 

}

// render existing player's (and computer's) board onto the new page
const renderPlayerSetup = () => {
    // populate human IDs array
    for (let i = 1; i <= gridSquared; i++) {
        playerArray.push(i);
    }
    console.log("human id array populated, ", playerArray)

    // retrieving information from previous page
    aGrid = JSON.parse(sessionStorage.getItem("aGrid"));

    updateBoard(cellsEl, aGrid, gridSquared);

    // update location of each ship from session storage
    ships.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`ships-${ship.name}`));
        blockCells(cellsEl, ship.location, colors.ship)
    })

}

// computer setup. render, dead = booleans
const renderComputer = (render, dead) => {
    
    // retrieve aGrid with computer info
    aGrid = JSON.parse(sessionStorage.getItem("aGrid")); 

    // update location of each computer's ship from session storage
    shipsComputer.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`shipsComputer-${ship.name}`));
        
        // if render
        if (render) {
            blockCells(cellsEl, ship.location, colors.ship)
        };

    })

    // only render dead ships
    if (dead) {

        shipsComputer.forEach((ship) => {
            if (!ship.alive) {
                ship.location = JSON.parse(sessionStorage.getItem(`shipsComputer-${ship.name}`));
                blockCells(cellsEl, ship.location, colors.dead)

                // place emoji into cellsEl for computer
                for (let x = gridSquared; x < aGrid.length; x++) {
                    if (ship.emoji === aGrid[x]) {
                        cellsEl[x].textContent = ship.emoji;
                    }
                }
            }
        })

    }

}

/*-------------------------------- ACTIVE ATTACK Functions --------------------------------*/

// click on cell
const gameClick = (e) => {

    // free up any previously selected cell
    unhighlightCells(cellsEl, colors.fire, colors.board)

    selectedCell = +e.target.id
    console.log(selectedCell);
    console.log(e);

    // can only click on the cell with ids more than 100
    if (selectedCell > 100 && e.target.classList.contains("cell")) {

        e.target.style.backgroundColor = colors.fire
        fireButton.style.backgroundColor = colors.hit

    }

}

const fireClick = (selectedCell) => {
    
    // avoid clicking the same button twice
    let clickResult;

    if (selectedCell > 100) {

        console.log("Fire button has been fired");

        // function that analyzes what happens after a fire click
        immediateEl.textContent = analyzeAttack(selectedCell, aGrid, shipsComputer, missArr, hitArr, deadArr, score)
        clickResult = immediateEl.textContent


        console.log("Missed array is ", missArr)
        console.log("Hit array is ", hitArr)
        console.log("Dead array is ", deadArr)

    } else {
        
        immediateEl.textContent = "Click on an opponent's grid cell"

    }

    // color the board
    blockCells(cellsEl, missArr, colors.miss);
    blockCells(cellsEl, hitArr, colors.hit);
    renderComputer(false, true);

    // check for winner
    let win = winner(shipsComputer)
    
    if (win) {
        
        console.log("We have a winner")

        // set the whoWon variable
        whoWon = "You";
        sessionStorage.setItem("whoWon", JSON.stringify(whoWon));
        
        // render win page
        window.location.href = "../templates/winloss.html";

        // reset session_computer for new game
        session_computer = false;
        sessionStorage.setItem("computer", session_computer)

    }

    fireButton.style.backgroundColor = colors.firebutton

    // update score on screen
    scoreEl.textContent = renderScore(score);

    // computer fires
    // only proceed if the player indeed made a move
    if (clickResult === "Hit!" || clickResult === "Miss!" ||
        clickResult.includes("was sunk!")) {
        
        computerFires();

    }

    // reset clickResult
    clickResult = undefined;

}

const computerFires = () => {
    // set message
    computerEl.textContent = "Computer is thinking..."

    // hits by computer – below ID 100
    let compHits = hitArr.filter((a) => {
        return a <= gridSquared;
    })

    // concatenated deadArr
    let concDeadArr = [];
    concDeadArr = deadArr.map((arr) => {
        return concDeadArr.concat(arr);
    })

    // if ID compHits but NOT in dead, target it!
    // toTarget is an array initialized every time from nothing
    let toTarget = compHits.filter((a) => {
        return !concDeadArr.includes(a);
    })
    
    console.log("Current toTarget array is...", toTarget)

    // initialize ID
    let i;

    // if time to target
    if (toTarget.length === 1) {
        
        console.log("Attack is on! ID to target is ", toTarget)
        console.log("Type of toTarget", typeof(toTarget))

        // produce number from adjacent array
        function firstHit() {
            
            adjacentCells = calculateAdjacent(toTarget[0], gridSize);

            //filter adjacent cells so they can't be above 100 and were not chosen before
            adjacentCells = adjacentCells.filter((cell) => {
                return (cell <= gridSquared && !missArr.includes(cell) && !hitArr.includes(cell));
            })
            
            console.log("Hit 1: Adjacent cells to target after filter ", adjacentCells)

            // highlight suggested cells – DELETE later
            blockCells(cellsEl, adjacentCells, colors.suggest);
        }

        firstHit();

        function randomCell() {
            i = adjacentCells[randomIndex(adjacentCells)];
        }

        randomCell();

    } // if two or more cells of the ship were discovered (not dead yet)
    else if (toTarget.length > 1) {
        
        // determine orientation
        if (toTarget.length === 2) {
            shipOrientation = orientationCheck(toTarget, "noShipEmoji", "computerAttacks");
            console.log("Attacked ship's orientation is ", shipOrientation)
        }
        
        // calculate adjacent cells
            /*if (hitCountComp >= 2) {
                adjacentCells = updateAdjacent(gridSize, shipOrientation, shipsComputer[shipIndex].location, horArray2D, verArray2D)
            }  else {} */
    }
    // produce random i if no hits before or if previous are dead
    else {

        // generate random number between 1 and grid size squared (recursive to avoid picking the same cell twice)
        // can't choose the same cell twice – recursive function
        function randomCell() {
            i = playerArray[randomIndex(playerArray)];
            
            if (missArr.includes(i) || hitArr.includes(i)) {
                console.log("regenerating ID");
                randomCell();
            }
        }

        randomCell();
    }


    console.log("ID chosen by computer is ", i)

    // assign that ID to the cell
    selectedCell = i;

    // analyze attack
    let attackMessage = analyzeAttack(selectedCell, aGrid, ships, missArr, hitArr, deadArr, score, "computer");
    console.log("Missed array is ", missArr)
    console.log("Hit array is ", hitArr) 
    console.log("Dead array is ", deadArr)
    console.log("User's ships ", ships)

    // time delay to reveal the result
    setTimeout(() => {
        
        // reset computerEl
        computerEl.textContent = "";
        
        // analyzeAttack button
        immediateEl.textContent = attackMessage;

        // color
        blockCells(cellsEl, missArr, colors.miss);
        blockCells(cellsEl, hitArr, colors.hit);
        deadArr.forEach((arr) => {
            blockCells(cellsEl, arr, colors.dead);
        })

    }, timeDelay);

    // if hit – count up, if dead – reset hitCount
    if (attackMessage === "Computer hit!") {
        hitCountComp++;
        console.log("Hit! hit count is ", hitCountComp)
    } else if (attackMessage.includes("sank your")) {
        hitCountComp = 0;
    }

    // update score on screen
    scoreEl.textContent = renderScore(score);


    // if the following message is missed, go back to the hit cell

    // keep trying until ship is sunk

    // if ship is sunk

        // block out the cells around

    // check for winner

}

const renderWinLossMsg = () => {

    // obtain whoWon variable
    whoWon = JSON.parse(sessionStorage.getItem("whoWon"));

    console.log("Who won? ", whoWon);
    
    if (whoWon === "You") {
        immediateEl.textContent = "You won! Congrats!"
    }

    // clear who Won
    whoWon = "undefined";
    sessionStorage.setItem("whoWon", JSON.stringify(whoWon));
    
}











/*----------------------------- Event Listeners -----------------------------*/


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
    if (setupCommandEl?.textContent === "Setup Instructions:") {

        // click on a cell for setup
        gameTableEl.addEventListener("click", handleClickSetup)

        console.log("this is setup page");
        immediateEl.textContent = `Build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

    } // if play page – render player setup and calculate computer setup
    else if (setupCommandEl?.textContent === "Board Instructions:") {
        
        // render player setup
        renderPlayerSetup();

        // add event listener to restart button (a way to erase the computer ship setup)
        reButton.addEventListener('click', () => {
            session_computer = false;
            sessionStorage.setItem("computer", session_computer)
        })

        // update whether the computer setup has been done
        session_computer = JSON.parse(sessionStorage.getItem("computer"));
        console.log("session_computer ", session_computer)
        
        // if the computer setup is not done, do it
        if (!session_computer) {
            computerSetup();
        }

        // render computer's setup – CHANGE TO FALSE FOR GAME
        renderComputer(true, false);

        console.log(aGrid);

    }

    renderWinLossMsg();

};



// click on a cell for setup
compTableEl?.addEventListener("click", gameClick)

// fire button functionality
fireButton?.addEventListener('click', () => {
    fireClick(selectedCell);
    selectedCell = undefined;
})

// add the same funcitonality with the space bar click
// prevent HTML page from scrolling
window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};

// space bar to fire
document.addEventListener('keyup', e => {
    if (e.key == " " || e.code == "Space") {

        console.log("Space BAR!")
        fireClick(selectedCell)
        selectedCell = undefined;

    }
})

//TESTS
// experimental numbers
cruiserEl?.addEventListener("click", () => {
    fillWithIds(cellsEl)
    console.log(cellsEl)
});