/* ADDITIONAL MATH FUNCTIONS */

// pass cell for cell number, gridSize for size, playerBoard for array
const calculateAdjacent = (cell, size, playerBoard) => {
    let arr = [];

    // convert cell to number
    cell = +cell;

    let squared = size * size;
    let a; let b; let c; let d;

    // all numbers divisible by 6 are at the right border
    if (cell % size === 0) {
        // if 6
        if (cell == size) {
            b = cell - 1;
            d = cell + size;
            console.log(b, d)
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

    // exclude members of arr if they are in playerBoard array
    for (let i = 0; i < playerBoard.length; i++) {
        // if not undefined, note its index + 1, save it to a variable, see if it is in arr array, remove it
        if (playerBoard[i] !== undefined) {
            let j = i + 1;
            arr = arr.filter((el) => {
                return el !== j;
            });
        } 
    }

    // sort in ascending order
    arr = arr.sort((a, b) => {
        return a - b;
    });

    // update arr array
    return arr;
}

// renders two-dimensional array split by rows
const gridRowsCalculate = (size) => {
    let array = [];
    let array2D = [];

    let increment = 0;

    for (let i = 1; i <= size; i++) {

        // reassign i at increments of size
        for (let j = 1 + increment; j <= (size + increment); j++) {
            array.push(j);
        }

        array2D.push(Array.from(array));

        array.length = 0;
        increment += size;
    }

    return array2D;
}

// renders two-dimensional array split by columns
const gridColumnsCalculate = (size) => {
    let array = [];
    let array2D = [];

    let increment = 0;

    for (let i = 1; i <= size; i++) {

        // reassign i at increments of size
        for (let j = 1 + increment; j <= (size * size); j += size) {
            array.push(j);
        }

        array2D.push(Array.from(array));

        array.length = 0;
        increment++;
    }
    return array2D;
}


// function to exclude suggested cells based on the orientation
const updateAdjacent = (size, adjacentArr, orientation, location, hor2D, ver2D, length) => {
    // can use ships location array for this

    const finalArr = location.map((locID, i, location) => {
        
        let newArrayMember;

        console.log("locID is ", locID)
        let possible = [];

        if (orientation === "horizontal") {
            
            possible = [locID + 1, locID - 1] // horizontal options

            // understand which sub-array in horArray corresponds to this locID 
            hor2D.forEach((subArray) => {
                
                // only 1 subArray will much so the loop will only run once
                if (subArray.includes(locID)) {
                    console.log("This is the subarray ", subArray)
                    // overlap
                    possible.forEach((num) => {
                        if (!location.includes(num) && subArray.includes(num)) {
                            // assigning newArrayMember
                            newArrayMember = num;
                            console.log ("newArrayMember has been assigned to ", num)
                        }
                    })
                }
            })

        } // if vertical
        else if (orientation === "vertical") {
            
            console.log("updateAdjacent: orientation vertical")
            possible = [locID + size, locID - size] // vertical options
        }

        return newArrayMember;
    }).filter((a) => {
        return a !== undefined;
    })

    console.log("final Array ", finalArr)
    return finalArr;
}



// check for horizontal or vertical
const orientationCheck = (arr, shipEmoji) => {
    let orientation = "vertical";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === shipEmoji && arr[i+1] === shipEmoji) {
            orientation = "horizontal";
        } 
    }
    console.log("orientation is ", orientation);
    return orientation;
}

export { calculateAdjacent, updateAdjacent, orientationCheck, gridColumnsCalculate, gridRowsCalculate };