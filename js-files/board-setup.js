/* BOARD SETUP RENDER FUNCTIONS */

// update board function – sizeSquared to hide computer
const updateBoard = (elArray, grid, sizeSquared) => {

    for (let x = 0; x < sizeSquared; x++) {
        elArray[x].textContent = grid[x];
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

// highlight blocked adjacent cells, arr for array of needed ids, sizeSquared is limit
const blockCells = (elArray, arr, color, sizeSquared) => {
    if (sizeSquared) {

        elArray.forEach((el) => {
            if (arr.includes(+el.id) && +el.id > sizeSquared) {
                el.style.backgroundColor = color;
            }
        })

    } else {

        elArray.forEach((el) => {
            if (arr.includes(+el.id)) {
                el.style.backgroundColor = color;
            }
        })

    }

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
        console.log("analyzing")
        if (toFreeCells.includes(cell)) {
            console.log("Cell overlap!", cell)
        }
        return !toFreeCells.includes(cell);
    })


    console.log(emojiToRemove)

    // remove emoji from grid
    let newGrid = grid.map((cell, i) => {
        if (cell === emojiToRemove) {
            console.log(i)
            cell = undefined;
        }
        return cell;
    })



    console.log("After go back button ships are ", ships);
    console.log("After go back button new grid is ", newGrid)

    let objectToReturn = [newGrid, unavailCellsUpdated]
    return objectToReturn;

}

export { updateBoard, fillWithIds, highlightCells, unhighlightCells, 
    blockCells, shipInCell, renderScore, goBack };