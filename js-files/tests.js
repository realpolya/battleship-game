/* JUST TESTS, NOT NEEDED */

/* DRAG AND DROP
// drag and drop – used tutorial from Appwrite
let newX = 0
let newY = 0
let startX = 0
let startY = 0

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


// TEST SEP 18 MORNING
// TESTING
// go back button function – erases the last ship
// button is enabled only if some ships are positioned (aka aGrid has a truthy value)
const goBack = (ships, grid, unavailCells) => {
    
    let unavailCellsUpdated = [];
    let toFreeCells = [];

    console.log("At the beginning, aGrid was ", grid[0])

    let emojiToRemove;

    // go through ships from last index to 0
    for (let i = ships.length - 1; i >= 0; i--) {

        // remove location at the first instance where it is there
        if (ships[i].location.length > 0) {
            
            // update toFreeCells
            toFreeCells = Array.from(ships[i].location);
            console.log("free us!", toFreeCells)

            ships[i].location.length = 0
            emojiToRemove = ships[i].emoji
            break;

        }

    }

    // update unavailCells

    unavailCellsUpdated = unavailCells.filter((cell) => {
        if (toFreeCells.includes(cell)) {
            console.log("Cell overlap!", cell)
        }
        return !toFreeCells.includes(cell);
    })


    console.log(emojiToRemove)

    // remove emoji from grid
    let newGrid = grid.map((cell, i) => {
        if (cell === emojiToRemove) {
            cell = undefined;
        }
        return cell;
    })



    console.log("After go back button ships are ", ships);
    console.log("After go back button new grid is ", newGrid)

    let objectToReturn = [newGrid, unavailCellsUpdated]
    return objectToReturn;

}



function shipInCell(grid, cell, ships, shipIndex, cellsEl, unavailCells) {
    // assign shipEl to the selectedCell
    grid[cell - 1] = ships[shipIndex].emoji;

    // update the location of the ship in the ships object
    ships[shipIndex].location.push(cell)

    // sort the order of the location (always ascending)
    ships[shipIndex].location = ships[shipIndex].location.sort((a, b) => {
        return a - b;
    });

    // update board
    updateBoard(cellsEl, grid);

    // update unavailable cells
    unavailCells.push(cell);
}

/* drag and drop – DISABLED
battleshipEl.addEventListener("mousedown", (e) => {
    startX = e.clientX // provides coordinates
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}) */