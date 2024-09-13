/* JUST TESTS, NOT NEEDED */

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

    console.log(array2D);
    return array2D;
}

gridColumnsCalculate(10);

/*

MOST RECENT
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

*/


/*
// function to exclude suggested cells based on the orientation
const updateAdjacent = (size, adjacentArr, orientation, p, c, length) => {
    // p - previous cell
    // c - current cell 
    // can use ships location array for this

    location.forEach((locID) => {
        
    })

    let newArr = [];
    let possible = [];

    if (orientation === "horizontal") {
        
        possible = [p + 1, p - 1, c + 1, c - 1] // horizontal options

        newArr = adjacentArr.filter((a) => {
            return possible.includes(a);
        })
        
        // add one more horizontal one but only if it doesn't cross the board
        possible.forEach((num) => {
            if (num !== c && num !== p && (num % size !== 0) && (num % size !== 1)){
                newArr.push(num);
            }
        })

    } // if vertical
    else if (orientation === "vertical") {
        
        console.log("updateAdjacent: orientation vertical")
        possible = [p + size, p - size, c + size, c - size] // vertical options

        console.log("possibles are: ", possible)
        newArr = adjacentArr.filter((a) => {
            return possible.includes(a);
        })
        console.log("updateAdjacent: filtered array ", newArr)

        possible.forEach((num) => {
            if (num !== c && num !== p){
                if (num <= (size * size) && num >= 1 && !newArr.includes(num)) {
                    newArr.push(num);
                }
            }
        })
    }

    return newArr;
} */