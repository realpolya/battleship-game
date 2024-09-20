/* JUST TESTS, NOT NEEDED */

// REWRITE calculateAdjacent – Sep 19


const horArray = [
    [
      1, 2, 3, 4,  5,
      6, 7, 8, 9, 10
    ],
    [
      11, 12, 13, 14, 15,
      16, 17, 18, 19, 20
    ],
    [
      21, 22, 23, 24, 25,
      26, 27, 28, 29, 30
    ],
    [
      31, 32, 33, 34, 35,
      36, 37, 38, 39, 40
    ],
    [
      41, 42, 43, 44, 45,
      46, 47, 48, 49, 50
    ],
    [
      51, 52, 53, 54, 55,
      56, 57, 58, 59, 60
    ],
    [
      61, 62, 63, 64, 65,
      66, 67, 68, 69, 70
    ],
    [
      71, 72, 73, 74, 75,
      76, 77, 78, 79, 80
    ],
    [
      81, 82, 83, 84, 85,
      86, 87, 88, 89, 90
    ],
    [
      91, 92, 93, 94,  95,
      96, 97, 98, 99, 100
    ]
  ]

const verArray = [
    [
       1, 11, 21, 31, 41,
      51, 61, 71, 81, 91
    ],
    [
       2, 12, 22, 32, 42,
      52, 62, 72, 82, 92
    ],
    [
       3, 13, 23, 33, 43,
      53, 63, 73, 83, 93
    ],
    [
       4, 14, 24, 34, 44,
      54, 64, 74, 84, 94
    ],
    [
       5, 15, 25, 35, 45,
      55, 65, 75, 85, 95
    ],
    [
       6, 16, 26, 36, 46,
      56, 66, 76, 86, 96
    ],
    [
       7, 17, 27, 37, 47,
      57, 67, 77, 87, 97
    ],
    [
       8, 18, 28, 38, 48,
      58, 68, 78, 88, 98
    ],
    [
       9, 19, 29, 39, 49,
      59, 69, 79, 89, 99
    ],
    [
      10, 20, 30, 40,  50,
      60, 70, 80, 90, 100
    ]
  ]

// calculate cell options for the first click
const calculateAdjacent = (cell, size, sizeSquared, horArray2D, verArray2D, playerBoard) => {
    
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

calculateAdjacent("45", 10, 100, horArray, verArray)