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
const highlightCells = (elArray, arr, blockedColor, suggestiveColor) => {
    let i = 1;
    elArray.forEach((el) => {
        if (arr.includes(i) && el.style.backgroundColor !== blockedColor) {
            el.style.backgroundColor = suggestiveColor;
        }
        i++;
    });
}

const unhighlightCells = (elArray, suggestiveColor, boardColor) => {
    elArray.forEach((el) => {
        if (el.style.backgroundColor === suggestiveColor){
            el.style.backgroundColor = boardColor;
        };
    });
}


export { updateBoard, fillWithIds, highlightCells, unhighlightCells };