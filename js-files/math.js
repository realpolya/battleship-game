/* ADDITIONAL MATH FUNCTIONS */

// calculate cell options for the first click
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
    if (playerBoard) {
        for (let i = 0; i < playerBoard.length; i++) {
            // if not undefined, note its index + 1, save it to a variable, see if it is in arr array, remove it
            if (playerBoard[i] !== undefined) {
                let j = i + 1;
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

// renders two-dimensional array split by rows
const gridRowsCalculate = (size, computer) => {
    let array = [];
    let array2D = [];

    let increment = 0;

    for (let i = 1; i <= size; i++) {

        // reassign i at increments of size
        for (let j = 1 + increment; j <= (size + increment); j++) {
            if (computer === undefined) {
                array.push(j);
            } else {
                array.push(j + (size * size));
            }
        }

        array2D.push(Array.from(array));

        array.length = 0;
        increment += size;
    }

    return array2D;
}

// renders two-dimensional array split by columns
const gridColumnsCalculate = (size, computer) => {
    let array = [];
    let array2D = [];

    let increment = 0;

    for (let i = 1; i <= size; i++) {

        // reassign i at increments of size
        for (let j = 1 + increment; j <= (size * size); j += size) {
            if (computer === undefined) {
                array.push(j);
            } else {
                array.push(j + (size * size));
            }
        }

        array2D.push(Array.from(array));

        array.length = 0;
        increment++;
    }
    return array2D;
}

// calculate cell options for 2nd and later clicks
const updateAdjacent = (size, orientation, location, hor2D, ver2D, length) => {

    const finalArr = location.map((locID, i, location) => {
        
        let newArrayMember;
        let possible = [];

        if (orientation === "horizontal") {
            
            possible = [locID + 1, locID - 1] // horizontal options

            // understand which sub-array in horArray corresponds to this locID 
            hor2D.forEach((subArray) => {
                
                // only 1 subArray will much so the loop will only run once
                if (subArray.includes(locID)) {
                    // overlap
                    possible.forEach((num) => {
                        if (!location.includes(num) && subArray.includes(num)) {
                            // assigning newArrayMember
                            newArrayMember = num;
                        }
                    })
                }
            })

        } // if vertical
        else if (orientation === "vertical") {
            
            possible = [locID + size, locID - size] // vertical options

            // understand which sub-array in horArray corresponds to this locID 
            ver2D.forEach((subArray) => {
                
                // only 1 subArray will much so the loop will only run once
                if (subArray.includes(locID)) {
                    // overlap
                    possible.forEach((num) => {
                        if (!location.includes(num) && subArray.includes(num)) {
                            // assigning newArrayMember
                            newArrayMember = num;
                        }
                    })
                }
            })

        }

        return newArrayMember;
    }).filter((a) => {
        return a !== undefined;
    })

    return finalArr;
}

// color blocked adjacent cells after ship is complete (obtain ids)
const calcBlockedAdj = (size, orientation, location, hor2D, ver2D, computer) => {
 
    let finalArr = [];

    // location is ship's location array
    if (orientation === "horizontal") {

        // new horizontal members -1 +1
        let smallest = location[0] - 1;
        let largest = location[location.length - 1] + 1;

        hor2D.forEach((subArray) => {
            // check if horizontal subArray matches the location array
            const foundArray = subArray.some((el) => {
                return location.includes(el);
            })

            // if yes
            if (foundArray) {

                // include largest and smallest
                if (subArray.includes(smallest)) {
                    finalArr.push(smallest);
                }
                if (subArray.includes(largest)) {
                    finalArr.push(largest);
                }

                // sort array
                const newRowArray = location.concat(finalArr).sort((a, b) => {
                    return a - b;
                })

                let rowLength = newRowArray.length

                // add all above
                let newMember = newRowArray[0] - size;

                if (newMember >= 1) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember++;
                    }
                }

                // add all below
                newMember = newRowArray[0] + size;
                if (newMember <= (size * size)) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember++;
                    }
                } else if (computer && newMember <= ((size * size) * 2)) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember++;
                    }
                }

            }
        })

    } else if (orientation === "vertical") {
        // new horizontal members -1 +1
        let smallest = location[0] - size;
        let largest = location[location.length - 1] + size;

        ver2D.forEach((subArray) => {
            // check if horizontal subArray matches the location array
            const foundArray = subArray.some((el) => {
                return location.includes(el);
            })

            // if yes
            if (foundArray) {
                if (subArray.includes(smallest)) {
                    finalArr.push(smallest);
                }

                if (subArray.includes(largest)) {
                    finalArr.push(largest);
                }

                const newColumnArray = location.concat(finalArr).sort((a, b) => {
                    return a - b;
                })

                let rowLength = newColumnArray.length

                // add all to the left
                let newMember = newColumnArray[0] - 1;

                if (newMember !== 0 && newMember % size !== 0) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember += size;
                    }
                }

                // add all to the right
                newMember = newColumnArray[0] + 1;
                if (newMember <= (size * size) && newMember % size !== 1) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember += size;
                    }
                } else if (computer && newMember <= ((size * size) * 2) && newMember % size !== 1) {
                    for (let i = 0; i < rowLength; i++) {
                        finalArr.push(newMember);
                        newMember += size;
                    }
                }
            }
        })
    }

    finalArr = finalArr.sort((a, b) => {
        return a - b;
    })

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
    return orientation;
}

// function to track length of each ship, shiptype for which ship, ships for obj
const trackLength = (obj, index) => {
    let currentLength = obj[index].location.length; // array length
    let requiredLength = obj[index].length; // ship's length

    if (currentLength === requiredLength) {
        return true;
    } else {
        return false;
    }
}

// calculate computer array
const computerArray = (size) => {
    
    const arr = [];

    // size squared will be size of human array, 
    // then the following size squared is computer array
    let sizeSquared = size * size;

    for (let i = 1; i <= sizeSquared; i++) {
        arr.push(i + sizeSquared)
    }

    return arr;
}

// produce random cell number from available array based on length
const randomIndex = (arr) => {

    let randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;

}

export { calculateAdjacent, updateAdjacent, orientationCheck, gridColumnsCalculate, gridRowsCalculate, trackLength, calcBlockedAdj, computerArray, randomIndex };