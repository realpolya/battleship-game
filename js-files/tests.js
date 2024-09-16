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