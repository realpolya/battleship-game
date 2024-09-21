/* Room is a new file created to avoid maximum call stack error */

const checkRoom = (size, ships, shipIndex, shipsOnBoard, unavailCells, horArray2D, verArray2D, computer) => {

    let roomyCells;

    if (shipsOnBoard >= 1) {

        let nextLength = ships[shipIndex].length;

        // filter out unavail cells array with horArray and verArray
        let availHorCells = horArray2D.filter((array) => {
            let newArray = array.filter((cell) => {
                return !unavailCells.includes(cell);
            }) 
            return newArray;
        })

        let availVerCells = verArray2D.filter((array) => {
            let newArray = array.filter((cell) => {
                return !unavailCells.includes(cell);
            }) 
            return newArray;
        })
        
        // based on the length of the ship, see if there is enough room for each ship
        // left and right, up and down

        let breakPattern = "break";
        let valuesTest = [];

        if (computer) {

        } else {

            // going through cells one by one (can this be an option?)
            /*
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
            });*/

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

    return roomyCells;

}
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

}

*/