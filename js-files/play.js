/* this file has functions for the game logic of battleship */

export const analyzeAttack = (cell, aGrid, 
    ships, hitCount, missArr, hitArr, deadArr, score, computer) => {
    
    let shipHasSunk = false;
    let sunkShip;

    console.log("Analyze attack is working");

    // check that the cell has not been hit yet (for human only)
    if (!computer && (missArr.includes(cell) || hitArr.includes(cell))) {
        return "This cell has already been hit";
    }

    console.log("aGrid is ", aGrid)

    // see if the cell is empty or not
    if (aGrid[cell - 1]) {

        // update hitCount
        hitCount++;

        // push to the hit array
        hitArr.push(cell)

            // see which ship was hit (but don't disclose)
            ships.forEach((ship) => {
                // do they overlap
                if (ship.location.includes(cell)) {
                    
                    console.log(`${ship.name} was hit`)

                    // update hit count of that specific ship
                    ship.hits++;

                    // if hit count equals to length
                    if (ship.hits === ship.length) {
                        
                        console.log(`${ship.name} has sunk`)

                        // change alive boolean
                        ship.alive = false;

                        // update score
                        score++;

                        // push to dead cells array
                        deadArr.push(ship.location);

                        // assign to local variables
                        sunkShip = ship.name
                        shipHasSunk = true;

                    }

                }
            })
        
        if (shipHasSunk) {
            
            console.log(`${sunkShip} was sunk!`, ships)
            if (computer) {
                return `Computer sank your ${sunkShip}!`
            }
            return `${sunkShip} was sunk!`

        }
        console.log("Hit", ships)
        if (computer) {
            return "Computer hit!"
        }
        return "Hit!";


    } // if the cell is empty
    else {
        
        console.log("This was a miss")

        // push into missedArr
        missArr.push(cell)

        if (computer) {
            return "Computer missed!"
        }
        return "Miss!"

    }

}

const computerFires = () => {
    // if known number in hitArr between 1 and grid size squared
    // but it is not in deadArr

        // produce number from adjacent array

    // generate random number between 1 and grid size squared

    // assign that number to the cell

    // time delay

    // analyzeAttack button

    // if message equals to first hit, generate an adjacent array

    // if the following message is missed, go back to the hit cell

    // keep trying until ship is sunk

    // if ship is sunk

        // block out the cells around

    // check for winner
}

export const winner = (ships) => {
    
    let answer = ships.every((ship) => {
        return !ship.alive;
    })

    return answer;

}