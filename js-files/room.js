/* Room is a new file created to avoid maximum call stack error */
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

unavailCells = [ 23, 24, 25, 33, 34, 35, 43, 44, 45, 53, 54, 55, 62, 63, 64, 65, 66, 72, 73, 74, 75, 76, 82, 83, 84, 85, 86 ]

const checkRoom = (size, ships, shipIndex, shipsOnBoard, unavailCells, horArray2D, verArray2D, computer) => {

    let roomyCells;

    if (shipsOnBoard >= 1) {

        //let nextLength = ships[shipIndex].length;
        let nextLength = 4;
        let breakPattern = "break";

        // replace unavail cells with "break"
        let availHorCells = horArray2D.map((array) => {
            
            let newArray = array.map((cell) => {
                
                if (unavailCells.includes(cell)) {
                    return breakPattern;
                } else {
                    return cell;
                }

            }) 

            return newArray;

        })

        console.log(availHorCells);

        let experimentalArray = [];
        let madeItArray = [];
        let tracker = 0;

        availHorCells.forEach((array) => {
            
            for (let i = 0; i < array.length; i++) {
                
                // if number
                if (typeof(array[i]) === "number") {
                    
                    experimentalArray.push(array[i]);
                    tracker++;

                    console.log("tracker", tracker, "i=",  i)

                    // if tracker reaches or exceeds length of the ship AND (next item is string OR array is done) - maybe no string in array
                    if (tracker >= nextLength && (typeof(array[i+1]) === "string" || i === array.length - 1)) {
                        
                        console.log(tracker, nextLength, i)
                        // push to made it
                        madeItArray.push(Array.from(experimentalArray));
                        
                        // reset trackers
                        experimentalArray.length = 0;
                        tracker = 0;

                    } // reach the end of this array – must reset
                    else if (i === array.length - 1) {
                        
                        // reset trackers
                        experimentalArray.length = 0;
                        tracker = 0;
                        
                    }

                } else {
                    
                    // reset trackers
                    experimentalArray.length = 0;
                    tracker = 0;

                }
            }
            
        })

        console.log("made it array is ", madeItArray)

        /* SOLUTION

        let experimentalArray
        let counter

        Go through EACH array from horArray2D

        if (array[i] + 1 === array[i + 1]) {
            experimentalArray.push(array[i]);
            counter++;

            if (counter >= length && array[i + 2] === string) {
                potentialArray.push(...experimentalArray)

                // reset tracker
                experimentalArray.length = 0
                counter = 0
            }
        } else {

            experimentalArray.length = 0
            counter = 0

        } */

    }


}

checkRoom(0, 0, 0, 1, unavailCells, horArray);


        /*
        let availVerCells = verArray2D.filter((array) => {
            let newArray = array.filter((cell) => {
                return !unavailCells.includes(cell);
            }) 
            return newArray;
        })*/
        
        // based on the length of the ship, see if there is enough room for each ship
        // left and right, up and down

        /*
        let valuesTest = [];

        if (computer) {

        } else {

            // going through cells one by one (can this be an option?)
            
            availHorCells = availHorCells.map((array) => {
                // the cell passes a test if it has a number of consecutive cells nearby
                // as long as the length itself
                for (let i = 0; i < array.length; i++) {
                    if (array[i] + 1 === array [i + 1]) {
                        valuesTest.push(array[i]);
                    } else {
                        valuesTest.push(breakPattern);
                    }
                }
            });

            let experimentArr = [];
            let tracker = 0;
            // if an array piece lasts nextLength without a break, it is approved
            valuesTest

            // start counting from the first cell

            // if you count to Length, save these 4 cells

            // if you encounter a break before reaching Length, cells are out

            

            for (let i = 0; i < (size * size); i++) {

                availHorCells.forEach((array) => {
                    // the cell passes a test if it has a number of consecutive cells nearby
                    // as long as the length itself

                })

            }

        }



    }

    return roomyCells;*/

// if the first ship is completed – shipsOnBoard >= 1

// retrieve the locations of all previously set ships, push them into a single array


// update the adjacent cells to see if there is room in vertical and horizontal arrays
// before making the cell available to click on


// there needs to be room either in vertical or horizontal array for a cell to be available





/* SOLUTION

let experimentalArray
let counter

Go through EACH array from horArray2D

if (array[i] + 1 === array[i + 1]) {
    experimentalArray.push(array[i]);
    counter++;

    if (counter >= length && array[i + 2] === string) {
        potentialArray.push(...experimentalArray)

        // reset tracker
        experimentalArray.length = 0
        counter = 0
    }
} else {

    experimentalArray.length = 0
    counter = 0

} */
