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

gridRowsCalculate(10);


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