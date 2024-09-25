/* this file has functions for the game logic of battleship */

export const analyzeAttack = (cell, aGrid, 
    ships, missArr, hitArr, deadArr, score, computer) => {
    
    let shipHasSunk = false;
    let sunkShip;

    // check that the cell has not been hit yet (for human only)
    if (!computer && (missArr.includes(cell) || hitArr.includes(cell))) {
        return "This cell has already been hit";
    }

    // see if the cell is empty or not
    // FIXME: after updateBoard, array can have "" empty strings
    if (aGrid[cell - 1]) {

        // push to the hit array
        hitArr.push(cell)

            // see which ship was hit (but don't disclose)
            ships.forEach((ship) => {
                // do they overlap
                if (ship.location.includes(cell)) {

                    // update hit count of that specific ship
                    ship.hits++;

                    // if hit count equals to length
                    if (ship.hits === ship.length) {

                        // change alive boolean
                        ship.alive = false;

                        // push to dead cells array
                        deadArr.push(ship.location);

                        // assign to local variables
                        sunkShip = ship.name
                        shipHasSunk = true;

                    }

                }
            })
        
        if (shipHasSunk) {
            
            if (computer) {
                score.computer++;
                return `Computer sank your ${sunkShip}!`
            }

            score.player++;
            return `${sunkShip} was sunk!`

        }

        if (computer) {
            return "Computer hit!"
        }
        return "Hit!";


    } // if the cell is empty
    else {

        // push into missedArr
        missArr.push(cell)
        console.log("Missed cell is ", cell)

        if (computer) {
            return "Computer missed!"
        }
        return "Miss!"

    }

}

export const winner = (ships) => {
    
    let answer = ships.every((ship) => {
        return !ship.alive;
    })

    return answer;

}