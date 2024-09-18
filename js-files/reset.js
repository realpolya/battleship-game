/* File for Go Back and Reset functions for Setup stage */
// TESTING
// go back button function – erases the last ship
// button is enabled only if some ships are positioned (aka aGrid has a truthy value)
const goBack = (ships, grid) => {

    let emojiToRemove;

    // go through ships from last index to 0
    for (let i = ships.length - 1; i >= 0; i--) {

        // remove location at the first instance where it is there
        if (ships[i].location.length > 0) {
            
            ships[i].location.length = 0
            emojiToRemove = ships[i].emoji
            break;

        }

    }

    // remove emoji from grid
    let newGrid = grid.map((cell, i) => {
        if (cell === emojiToRemove) {
            cell = undefined;
        }
        return cell;
    })

    return newGrid;

}

// find the last ship with something in its location array
const removeShipIndex = (ships) => {

    let index;

    // go through ships from last index to 0
    for (let i = ships.length - 1; i >= 0; i--) {

        // remove location at the first instance where it is there
        if (ships[i].location.length > 0) {
            
            index = i;
            break;

        }

    }

    return index;

}

export {goBack, removeShipIndex};
