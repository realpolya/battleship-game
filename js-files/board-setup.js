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


export { updateBoard, fillWithIds };