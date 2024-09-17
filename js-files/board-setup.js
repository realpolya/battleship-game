/* BOARD SETUP RENDER FUNCTIONS */

// update board function – sizeSquared to hide computer
const updateBoard = (elArray, playerBoard, sizeSquared) => {

    for (let x = 0; x < sizeSquared; x++) {
        elArray[x].textContent = playerBoard[x];
    }

}

// experimental fill cells with their number ids
const fillWithIds = (elArray) => {
    let i = 1;
    elArray.forEach((el) => {
        el.textContent = i;
        i++;
    });
}

// highlight adjacent cells
const highlightCells = (elArray, arr, unavailArr, suggestiveColor) => {
    
    // remove cells that are already blocked out
    let i = 1;
    elArray.forEach((el) => {
        if (arr.includes(i) 
            && !unavailArr.includes(i)) {
                el.style.backgroundColor = suggestiveColor;
        }
        i++;
    });
}

// highlight blocked adjacent cells, arr for array of needed ids
const blockCells = (elArray, arr, color) => {
    elArray.forEach((el) => {
        if (arr.includes(+el.id)) {
            el.style.backgroundColor = color;
        }
    })
}

const unhighlightCells = (elArray, suggestiveColor, boardColor) => {
    elArray.forEach((el) => {
        if (el.style.backgroundColor === suggestiveColor){
            el.style.backgroundColor = boardColor;
        };
    });
}

function shipInCell(grid, cell, ships, sizeSquared, shipIndex, cellsEl, unavailCells, computerArray) {
    // assign shipEl to the selectedCell
    grid[cell - 1] = ships[shipIndex].emoji;

    // update the location of the ship in the ships object
    ships[shipIndex].location.push(cell)

    // sort the order of the location (always ascending)
    ships[shipIndex].location = ships[shipIndex].location.sort((a, b) => {
        return a - b;
    });

    // update board if not computer
    updateBoard(cellsEl, grid, sizeSquared);

    // update unavailable cells
    unavailCells.push(cell);

    // update computer array - optional
    if (computerArray !== undefined) {
        computerArray[cell - 1] = ships[shipIndex].emoji;
    }
}

const renderScore = (score) => {
    return `Score: ${score.player} / ${score.computer}`;
}

export { updateBoard, fillWithIds, highlightCells, unhighlightCells, 
    blockCells, shipInCell, renderScore };