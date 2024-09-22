/* ADDITIONAL MATH FUNCTIONS */

// calculate cell options for the first click
// calculate cell options for the first click
const calculateAdjacent = (cell, size, horArray2D, verArray2D, playerBoard) => {
    
    // initiate array to return
    let array = [];

    // convert cell to number
    cell = +cell;

    let hor; // horizontal cells
    let ver; // vertical cells

    // get horizontal adjacent values
    horArray2D.forEach((arr) => {
        if (arr.includes(cell)) {
            hor = arr.filter((num) => {
                return (num - cell === 1 || cell - num === 1);
            })
        }
    })

    // get vertical adjacent values
    verArray2D.forEach((arr) => {
        if (arr.includes(cell)) {
            ver = arr.filter((num) => {
                return (num - cell === size || cell - num === size);
            })
        }
    })

    // push into return array
    array.push(...hor)
    array.push(...ver)

    // exclude members of array if they are in playerBoard array (either pass none, aGrid or bGrid)
    if (playerBoard) {
        for (let i = 0; i < playerBoard.length; i++) {
            // if not undefined, note its index + 1, save it to a variable, see if it is in arr array, remove it
            if (playerBoard[i] !== undefined) {
                let j = i + 1; // cell ID is index + 1
                array = array.filter((el) => {
                    return el !== j;
                });
            } 
        }
    }

    // sort in ascending order
    array = array.sort((a, b) => {
        return a - b;
    });

    // update arr array
    return array;
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
const updateAdjacent = (size, orientation, location, hor2D, ver2D) => {

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
    }).sort((a, b) => {
        return a - b;
    });

    return finalArr;
}

// color blocked adjacent cells after ship is complete (obtain ids), computer is 
// a boolean to work on computer board
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

// check for horizontal or vertical, computerAttacks = bool value
const orientationCheck = (arr, shipEmoji, computerAttacks) => {
    let orientation = "vertical";
    
    if (!computerAttacks) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === shipEmoji && arr[i+1] === shipEmoji) {
                orientation = "horizontal";
            } 
        }
    }

    else if (computerAttacks) {

        // sort in ascending order
        arr = arr.sort((a, b) => {
            return a - b;
        });

        // if member at index 0 is 1 less than at index 1, horizontal
        if (arr[0] + 1 === arr[1]) {
            
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

// pass toTarget into arr
// calculate next cell for attack if orientation is clear
const attackNext = (size, orientation, arr, hor2D, ver2D) => {
    
    const finalArr = arr.map((locID, i, arr) => {
        
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
                        
                        if (!arr.includes(num) && subArray.includes(num)) {
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
                        if (!arr.includes(num) && subArray.includes(num)) {
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

export { calculateAdjacent, updateAdjacent, orientationCheck, gridColumnsCalculate, gridRowsCalculate, trackLength, calcBlockedAdj, computerArray, randomIndex, attackNext };