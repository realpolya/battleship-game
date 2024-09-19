/* JUST TESTS, NOT NEEDED */

// REWRITE calculateAdjacent – Sep 19

// calculate cell options for the first click
const calculateAdjacent = (cell, size, sizeSquared, horArray2D, verArray2D, playerBoard) => {
    
    // initiate array to return
    let arr = [];

    // convert cell to number
    cell = +cell;

    let a; let b; let c; let d;

    // pick two values from horArray for hor (a, b)
    // pick two values from verArray for ver (c, d)
    


    // all numbers divisible by 6 are at the right border
    if (cell % size === 0) {
        // if 6
        if (cell == size) {
            b = cell - 1;
            d = cell + size;
        } // if 36
        else if (cell === squared) {
            b = cell - 1;
            c = cell - size;
        } else {
            b = cell - 1;
            c = cell - size; d = cell + size;
        }
    } // if first row
    else if (cell < size) {
        if (cell === 1) {
            a = cell + 1;
            d = cell + size;
        } else {
            a = cell + 1; b = cell - 1; 
            d = cell + size;
        }
    } //all numbers 1 and +6 are at the left border (remainder 1)
    else if (cell % size === 1) {
        // if the bottom right cell
        if (cell === squared - (size - 1)) {
            a = cell + 1;
            c = cell - size;
        } else {
            a = cell + 1;
            c = cell - size; d = cell + size;
        }
    } // between 36 through 31 are at the bottom
    else if (cell < squared && cell > squared - (size - 1)) {
        a = cell + 1; b = cell - 1; 
        c = cell - size;
    } // everything else – center
    else {
        a = cell + 1; b = cell - 1; // horizontal
        c = cell - size; d = cell + size; // vertical
    }

    arr.push(a, b, c, d);
    arr = arr.filter((el) => {
        return el !== undefined;
    })

    // exclude members of arr if they are in playerBoard array (either pass none, aGrid or bGrid)
    if (playerBoard) {
        for (let i = 0; i < playerBoard.length; i++) {
            // if not undefined, note its index + 1, save it to a variable, see if it is in arr array, remove it
            if (playerBoard[i] !== undefined) {
                let j = i + 1; // cell ID is index + 1
                arr = arr.filter((el) => {
                    return el !== j;
                });
            } 
        }
    }

    // sort in ascending order
    arr = arr.sort((a, b) => {
        return a - b;
    });

    // update arr array
    return arr;
}