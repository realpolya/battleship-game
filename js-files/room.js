/* Room is a new file created to avoid maximum call stack error */

export const checkRoom = (ships, shipIndex, shipsOnBoard, unavailCells, horArray2D, verArray2D) => {

    let roomyCells = {
        horizontal: [],
        vertical: []
    };

    if (shipsOnBoard >= 1) {

        //let nextLength = ships[shipIndex].length;
        let nextLength = ships[shipIndex].length;
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

        // replace unavail cells with "break" in vertical array as well
        let availVerCells = verArray2D.map((array) => {
            
            let newArray = array.map((cell) => {
                
                if (unavailCells.includes(cell)) {
                    return breakPattern;
                } else {
                    return cell;
                }

            }) 

            return newArray;

        })

        let experimentalArray = [];
        let tracker = 0;
        let madeItArrayHor = []; // horizontal array reviewed
        let madeItArrayVer = [];

        availHorCells.forEach((array) => {
            
            for (let i = 0; i < array.length; i++) {
                
                // if number
                if (typeof(array[i]) === "number") {
                    
                    experimentalArray.push(array[i]);
                    tracker++;

                    //console.log("tracker", tracker, "i=",  i)

                    // if tracker reaches or exceeds length of the ship AND (next item is string OR array is done) - maybe no string in array
                    if (tracker >= nextLength && (typeof(array[i+1]) === "string" || i === array.length - 1)) {
                        
                        // push to made it
                        madeItArrayHor.push(Array.from(experimentalArray));
                        
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

        availVerCells.forEach((array) => {
            
            for (let i = 0; i < array.length; i++) {
                
                // if number
                if (typeof(array[i]) === "number") {
                    
                    experimentalArray.push(array[i]);
                    tracker++;

                    // if tracker reaches or exceeds length of the ship AND (next item is string OR array is done) - maybe no string in array
                    if (tracker >= nextLength && (typeof(array[i+1]) === "string" || i === array.length - 1)) {

                        // push to made it
                        madeItArrayVer.push(Array.from(experimentalArray));
                        
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

        roomyCells.horizontal = Array.from(madeItArrayHor);
        roomyCells.vertical = Array.from(madeItArrayVer);

    }

    return roomyCells;

}
