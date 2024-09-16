/* BOARD SETUP RENDER FUNCTIONS */

// update board function
const updateBoard = (elArray, playerBoard) => {
    let i = 0;
    elArray.forEach((el) => {
        el.textContent = playerBoard[i];
        i++;
    });
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
                console.log("Coloring now")
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
            console.log("Blocked color is applied")
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

function shipInCell(grid, cell, ships, shipIndex, cellsEl, unavailCells, computerArray) {
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

    // update computer array - optional
    if (computerArray !== undefined) {
        computerArray[cell - 1] = ships[shipIndex].emoji;
    }
}


export { updateBoard, fillWithIds, highlightCells, unhighlightCells, blockCells, shipInCell };