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

    console.log(array2D);
}

// function to exclude suggested cells based on the orientation
const updateAdjacent = (size, adjacentArr, orientation, location, length) => {
    // can use ships location array for this

    let newArr = [];

    const finalArr = location.map((locID, i, location) => {
        
        console.log("locID is ", locID)

        let possible = [];

        if (orientation === "horizontal") {
            
            possible = [locID + 1, locID - 1] // horizontal options

            console.log("possible are ", possible)

            console.log("adjacent are ", adjacentArr)

            newArr = adjacentArr.filter((a) => {
                return possible.includes(a);
            })
            console.log("array after filter is ", newArr)
            

            // add one more horizontal one but only if it doesn't cross the board
            possible.forEach((num) => {
                
                if (num !== locID) {
                    console.log("Check 1 pass", num)
                    if (!location.includes(num)) {
                        console.log("Check 2 pass", num)
                        if (num % size !== 0) {
                            console.log("Check 3 pass", num)
                            if ((num % size !== 1)) {
                                console.log("Check 4 pass", num)
                                if (!newArr.includes(num)) {
                                    console.log("Check 5 pass", num)
                                    newArr.push(num);
                                    console.log("newArr is ", newArr);
                                    locID = num; // for finalArray
                                }
                            }
                        }
                    }
                }
            })


        } // if vertical
        else if (orientation === "vertical") {
            
            console.log("updateAdjacent: orientation vertical")
            possible = [locID + size, locID - size] // vertical options

            console.log("possibles are: ", possible)
            newArr = adjacentArr.filter((a) => {
                return possible.includes(a);
            })
            console.log("updateAdjacent: filtered array ", newArr)

            possible.forEach((num) => {
                if (num !== locID){
                    if (num <= (size * size) && num >= 1 && !newArr.includes(num)) {
                        newArr.push(num);
                        locID = num;
                    }
                }
            })
        }

        return locID;
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

export { calculateAdjacent, updateAdjacent, orientationCheck };