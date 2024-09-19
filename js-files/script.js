/* IMPORTS */
import { calculateAdjacent, updateAdjacent, orientationCheck, 
    gridColumnsCalculate, gridRowsCalculate, trackLength, 
    calcBlockedAdj, computerArray, randomIndex, 
    attackNext } from "./math.js"
import { updateBoard, fillWithIds, highlightCells, 
    unhighlightCells, blockCells, shipInCell, 
    renderScore } from "./board-setup.js"
import { goBack, removeShipIndex } from "./reset.js"
import { analyzeAttack, winner } from "./play.js";
import { callCell, generateAlphabet } from "./call-cell.js";

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
        emoji: "🚢", //🚢 ../assets/try.png
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
    block: "white",
    adjacent: "#415A77", //#415A77
    suggest: "mediumseagreen", // can't be the same as fire SOLVE GREEN COLORS
    board: "#E0E1DD",
    ship: "#778DA9", //778DA9 1B263B
    button: "indianred",
    fire: "mediumseagreen", //4DA167(shamrock green)
    hit: "indianred",
    miss: "#415A77", //415A77
    dead: "#0D1B2A",
    firebutton: "grey",
    disabled: "grey" // check with CSS
}

// score variable
const score = {
    player: 0,
    computer: 0
}



/*---------------------------- Variables (state) ----------------------------*/

// alphabet
let alphabet = [];

// use computer as additional value in some functions
let computer = true;
let session_computer; // once value is stored to Session storage, reloads won't affect it
let showComputer = false;

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
let goBackBlockedCells = []; // array for go Back button TESTING
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
let allShipsDoneBefore = false;

// store selected cell
let selectedCell;

// game specific variables
let missArr = []; // IDs of missed cells
let hitArr = []; // IDs of hit cells
let deadArr = []; // IDs of dead cells with revealed ships

let whoWon;

let timeDelay = 2000; // 1000 equals to 1 second
let emptyCells = []; // cells not to target for computer



/*------------------------ Cached Element References ------------------------*/

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
const goBackButton = document.getElementById('go-back')
const resetButton = document.getElementById('reset')
const reButton = document.getElementById('ready-restart');
const fireButton = document.getElementById('fire');
const setupCommandEl = document.getElementById('setup-play');
const showComputerButton = document.getElementById('show-ships');

// call cell
const computerTargetsEl = document.getElementById("computer-target-cell");
const playerTargetsEl = document.getElementById("player-target-cell");

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

        // place ship in cell
        shipInCell(aGrid, selectedCell, ships, gridSquared, shipIndex, cellsEl, unavailCells)

        // change color of goBack button and resetButton
        goBackButton.style.backgroundColor = colors.button
        resetButton.style.backgroundColor = colors.button

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
            
            // add to goBack 2D array
            // at index 0 would be blocked cells for 1 ship
            let cellsOccupied = blockedAdjCells.concat(ships[shipIndex].location)
            goBackBlockedCells.push(cellsOccupied); // has all of the blocked cells for this ship

            // concat with unavailableCells 
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
    allShipsDoneBefore = allShipsComplete();

    // update the instructions message if the ships aren't complete
    if (!allShipsComplete() && nextShip) {

        immediateEl.textContent = `Now build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

    }
   
}

// reset click, change ship
const shipIsComplete = () => {
    
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
        reButton.textContent = "Start Game";
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
        unavailCells.length = 0;

        return true;
    }

    return false;
}

/*-------------------------------- SETUP RESET Page Functions --------------------------------*/

// reset trackers if go back button was clicked
const goBackResetTrackers = () => {


    clickNumber = 0;
    adjacentCells = undefined;
    blockedAdjCells = undefined;
    
    // recalculate trackers
    shipIndex = 0;
    shipsOnBoard = 0;
    ships.forEach((ship) => {
        
        if (ship.location.length !== 0) {
            shipIndex++;
            shipsOnBoard++;
        }
        
    })

}

// disable ready button if go back button was clicked
const resetReadyButton = () => {
    
    // only run if ships were previously completed
    if (!allShipsComplete() && allShipsDoneBefore) {

        // activate ready button
        reButton.textContent = "Player Not Ready Yet";
        reButton.style.backgroundColor = colors.disabled;
        reButton.setAttribute('disabled', 'true');

        // remove event listener from board
        gameTableEl.addEventListener("click", handleClickSetup)

        // update instructions message
        immediateEl.textContent = `Now build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

        // reset allShipsDoneBefore
        allShipsDoneBefore = false;
    }

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
                shipInCell(aGrid, selectedCell, shipsComputer, gridSquared, shipIndex, cellsEl, unavailCells, bGrid);

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
            
            computerReady = true;
            console.log(aGrid);
            return true;

        } else {
            
            // recursive function (untill all ships are completed)
            computerBoard();

        }

    }
    
    computerBoard();
    
    if (computerReady) {
        
        console.log("computer is ready")

        // add computer Ready to JSON
        sessionStorage.setItem("computer", computerReady)
        session_computer = JSON.parse(sessionStorage.getItem("computer"));

        // reassign aGrid to the JSON variable so it is saved
        sessionStorage.setItem("aGrid", JSON.stringify(aGrid));

        // reset selectedCell
        selectedCell = undefined;

    } 

}

// render existing player's (and computer's) board onto the new page
const renderPlayerSetup = () => {
    // populate human IDs array
    for (let i = 1; i <= gridSquared; i++) {
        playerArray.push(i);
    }

    // retrieving information from previous page
    aGrid = JSON.parse(sessionStorage.getItem("aGrid"));

    updateBoard(cellsEl, aGrid, gridSquared);

    // update location of each ship from session storage
    ships.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`ships-${ship.name}`));
        blockCells(cellsEl, ship.location, colors.ship)
    })

}

// computer setup. render, dead, hide = booleans
const renderComputer = (render, dead, hide) => {
    
    // retrieve aGrid with computer info
    aGrid = JSON.parse(sessionStorage.getItem("aGrid")); 

    // update location of each computer's ship from session storage
    shipsComputer.forEach((ship) => {
        ship.location = JSON.parse(sessionStorage.getItem(`shipsComputer-${ship.name}`));
        
        // only render cells that haven't been hit
        let cellsToRender = ship.location.filter((cell) => {
            return (!hitArr.includes(cell) && cell !== selectedCell);
        })

        // if render
        if (render && ship.alive) {
            blockCells(cellsEl, cellsToRender, colors.ship)
        } // hide the ship
        else if (ship.alive && hide){
            blockCells(cellsEl, cellsToRender, colors.board)
        }

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

// click on cell to choose it
const gameClick = (e) => {

    // free up any previously selected cell
    unhighlightCells(cellsEl, colors.fire, colors.board)

    selectedCell = +e.target.id

    // can only click on the cell with ids more than 100
    if (selectedCell > 100 && e.target.classList.contains("cell")) {

        e.target.style.backgroundColor = colors.fire
        fireButton.style.backgroundColor = colors.hit

    }

}

// fireClick follows if the cell has been chosen
const fireClick = (selectedCell) => {


    // avoid clicking the same button twice
    let clickResult = "Not yet fired"; // avoid "undefined error"

    if (selectedCell > 100) {

        // function that analyzes what happens after a fire click
        immediateEl.textContent = analyzeAttack(selectedCell, aGrid, shipsComputer, missArr, hitArr, deadArr, score)
        clickResult = immediateEl.textContent
        playerTargetsEl.textContent = callCell(selectedCell, alphabet, horArray2D, verArray2D, comHorArray2D, comVerArray2D)

    } else {
        
        immediateEl.textContent = "Click on an opponent's grid cell"

    }

    // color the board – avoid coloring your board by adding gridSquared
    blockCells(cellsEl, missArr, colors.miss);
    blockCells(cellsEl, hitArr, colors.hit, gridSquared); // randomly colors computer
    renderComputer(false, true);

    // check for winner
    let win = winner(shipsComputer)
    
    if (win) {

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
    if (clickResult === "Hit!" || clickResult === "Miss!" || clickResult.includes("was sunk!")) {
        
        console.log("Computer's turn to fire")
        computerFires();

    }

    // reset clickResult
    clickResult = undefined;

}

// computer fires in response
const computerFires = () => {
    
    // set message
    computerEl.textContent = "Computer is thinking..."

    // hits by computer – below ID 100
    let compHits = hitArr.filter((a) => {
        return a <= gridSquared;
    })

    // concatenated deadArr
    let concDeadArr = [];
    concDeadArr = [].concat(...deadArr);

    // if ID compHits but NOT in dead, target it!
    let toTarget = compHits.filter((a) => {
        return !concDeadArr.includes(a);
    })

    // initialize ID
    let i;

    // if there is one cell that was hit
    if (toTarget.length === 1) {

        // produce number from adjacent array
        function firstHit() {
            
            adjacentCells = calculateAdjacent(toTarget[0], gridSize);

            //filter adjacent cells so they can't be above 100 and were not chosen before
            adjacentCells = adjacentCells.filter((cell) => {
                return (cell <= gridSquared 
                    && !missArr.includes(cell) 
                    && !hitArr.includes(cell)
                    && !emptyCells.includes(cell));
            })

            // highlight suggested cells – DELETE later
            //blockCells(cellsEl, adjacentCells, colors.suggest);
        }

        firstHit();

        function randomCell() {
            i = adjacentCells[randomIndex(adjacentCells)];
        }

        randomCell();

    } 
    
    // if two or more cells of the ship were discovered (not dead yet)
    else if (toTarget.length > 1) {
        
        function moreHits() {
            // determine orientation
            if (toTarget.length === 2) {
                shipOrientation = orientationCheck(toTarget, "noShipEmoji", "computerAttacks");
            }
            
            // calculate adjacent cells
            adjacentCells = attackNext(gridSize, shipOrientation, toTarget, horArray2D, verArray2D)

            //filter adjacent cells so they can't be above 100 and were not chosen before
            adjacentCells = adjacentCells.filter((cell) => {
                return (cell <= gridSquared 
                    && !missArr.includes(cell) 
                    && !hitArr.includes(cell)
                    && !emptyCells.includes(cell));
            })

            // highlight suggested cells – DELETE later
            //blockCells(cellsEl, adjacentCells, colors.suggest);
        }
        
        moreHits();

        function randomCell() {
            i = adjacentCells[randomIndex(adjacentCells)];
        }

        randomCell();

    }
    
    // produce random i if no hits before or if previous are dead
    else {


        let availableCells = Array.from(playerArray)
        
        availableCells = availableCells.filter((cell) => {
            return (!missArr.includes(cell) && !hitArr.includes(cell) && !emptyCells.includes(cell))
        })
        
        function randomCell() {
            i = availableCells[randomIndex(availableCells)];
        }

        randomCell();
    }

    // assign that ID to the cell
    selectedCell = i;

    // analyze attack
    let attackMessage = analyzeAttack(selectedCell, aGrid, ships, missArr, hitArr, deadArr, score, "computer");
    let calledCell = callCell(selectedCell, alphabet, horArray2D, verArray2D, comHorArray2D, comVerArray2D, "computer");

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

        // update turn message
        computerEl.textContent = "Player's turn"

        // update cell 
        computerTargetsEl.textContent = calledCell;


    }, timeDelay);

    if (attackMessage.includes("sank your")) {

        // do not target cells around dead cells
        deadArr.forEach((arr) => {
            
            let cells = calcBlockedAdj(gridSize, shipOrientation, arr, horArray2D, verArray2D);

            cells.forEach((id) => {
                if (!emptyCells.includes(id) && id <= gridSquared) {
                    emptyCells.push(id);
                }
            })

        })

        // color blocked cells
        //blockCells(cellsEl, emptyCells, colors.adjacent)

    }

    // update score on screen
    scoreEl.textContent = renderScore(score);

    // check for winner
    let win = winner(ships)
    
    if (win) {

        // set the whoWon variable
        whoWon = "Computer";
        sessionStorage.setItem("whoWon", JSON.stringify(whoWon));
        
        // render win page
        window.location.href = "../templates/winloss.html";

        // reset session_computer for new game
        session_computer = false;
        sessionStorage.setItem("computer", session_computer)

    }

}

// render message on a new page once game is over
const renderWinLossMsg = () => {

    // obtain whoWon variable
    whoWon = JSON.parse(sessionStorage.getItem("whoWon"));

    console.log("Who won? ", whoWon);
    
    if (whoWon === "You") {
        immediateEl.textContent = "You won! Congrats!"
    } else if (whoWon === "Computer") {
        immediateEl.textContent = "Computer won! Sorry. Try again?"
    }

    // clear who Won
    whoWon = "undefined";
    sessionStorage.setItem("whoWon", JSON.stringify(whoWon));
    
}

/*----------------------------- Event Listeners -----------------------------*/

/*----------------------------- onload & SETUP Event Listeners -----------------------------*/

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

        // every time you land on this page, computer's setup is gone
        session_computer = false;
        sessionStorage.setItem("computer", session_computer)

        // click on a cell for setup
        gameTableEl.addEventListener("click", handleClickSetup)

        immediateEl.textContent = `Build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`;

    } // if play page – render player setup and calculate computer setup
    else if (setupCommandEl?.textContent === "Board Instructions:") {
        
        // render player setup
        renderPlayerSetup();

        alphabet = generateAlphabet(gridSize);

        // add event listener to restart button (a way to erase the computer ship setup)
        reButton.addEventListener('click', () => {
            session_computer = false;
            sessionStorage.setItem("computer", session_computer)
        })

        // update whether the computer setup has been done
        session_computer = JSON.parse(sessionStorage.getItem("computer"));
        console.log(session_computer);
        
        // if the computer setup is not done, do it
        if (!session_computer) {
            computerSetup();
            console.log("a Grid", aGrid)
        }

        // render computer's setup – CHANGE TO FALSE FOR GAME
        renderComputer(false, false);

    }

    renderWinLossMsg();

};

// TESTING
// go back on a setup page
goBackButton?.addEventListener("click", () => {
    
    // only work if available
    if (goBackButton.style.backgroundColor === colors.button) {
        
        // save ships on board to temporary variable
        let goBackShipsOnBoard = shipsOnBoard

        // find out the index of the last ship – before goBack function
        let lastID = removeShipIndex(ships)

        // remove from unavail cells
        unavailCells = unavailCells.filter((cell) => {
            return !ships[lastID].location.includes(cell);
        })

        // remove color from ships[lastID].location
        blockCells(cellsEl, ships[lastID].location, colors.board)

        // remove the last ship that was built – free up its location
        aGrid = goBack(ships, aGrid)

        // reset trackers – shipsOnBoard might change
        goBackResetTrackers();

        // render new message
        immediateEl.textContent = `Now build a ${ships[shipIndex].length}-cell ${ships[shipIndex].name}`

        // if shipsOnBoard differs, then free up the unavail cells
        if (goBackShipsOnBoard !== shipsOnBoard) {
            
            // cycle through the arr
            let freeArr = goBackBlockedCells.pop()

            // filter freeArr to make sure it doesn't have overlapping elements with goBackBlockedCells
            goBackBlockedCells.forEach((blockedArr) => {
                for (let i = 0; i < freeArr.length; i++) {
                    if (blockedArr.includes(freeArr[i])) {
                        // remove 
                        freeArr.splice(i, 1)
                        // reset to -1 to make sure not to skip elements (as the index shifts once els are removed)
                        i = -1; // i++ will return it to 0
                    }
                }
            })

            // remove from unavail cells
            unavailCells = unavailCells.filter((cell) => {
                return !freeArr.includes(cell);
            })

            // uncolor freeArr
            blockCells(cellsEl, freeArr, colors.board)
        } 

        // disable the ready button if needed
        resetReadyButton();

        // colors
        function colorReset() {
            // update board and render ships
            updateBoard(cellsEl, aGrid, gridSquared)

            // unhighlight suggested color
            unhighlightCells(cellsEl, colors.suggest, colors.board);
        }

        colorReset();


        // if grid is totally empty
        let gridCheck = aGrid.filter((i) => {
            return i !== undefined;
        })
        if (gridCheck.length === 0) {
            goBackButton.style.backgroundColor = colors.disabled
            resetButton.style.backgroundColor = colors.disabled
        }
    }

})

resetButton?.addEventListener("click", () => {
    if (resetButton.style.backgroundColor === colors.button) {
        location.reload();
    }
})

/*----------------------------- PLAY Event Listeners -----------------------------*/


showComputerButton?.addEventListener("click", () => {
    
    // change showComputer to the opposite (at the load, showComputer = false)
    if (showComputer) {
        showComputer = false;
    } else {
        showComputer = true;
    }

    // change text of the button & render cells
    if (showComputer) {
        renderComputer(showComputer, false);
        showComputerButton.textContent = "Hide computer setup";
    } else {
        renderComputer(showComputer, false, "hide");
        showComputerButton.textContent = "Show computer setup";
    }

})

// click on a cell to pick for attack
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

// space bar to fire – only on the setup play page
document.addEventListener('keyup', e => {
    if ((e.key == " " || e.code == "Space") && setupCommandEl?.textContent === "Board Instructions:") {

        fireClick(selectedCell)
        selectedCell = undefined;

    }
})