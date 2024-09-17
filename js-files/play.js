/* this file has functions for the game logic of battleship */

export const analyzeAttack = (cell, aGrid, 
    ships, hitCount, missArr, hitArr, deadArr, score) => {
    
    let shipHasSunk = false;
    let sunkShip;

    console.log("Analyze attack is working");

    // check that the cell has not been hit yet
    if (missArr.includes(cell) || hitArr.includes(cell)) {
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
            return `${sunkShip} was sunk!`

        }
        console.log("Hit", ships)
        return "Hit!";


    } // if the cell is empty
    else {
        
        console.log("This was a miss")

        // push into missedArr
        missArr.push(cell)

        return "Miss!"

    }

}

const computerFires = () => {

}

export const winner = (ships) => {
    
    let answer = ships.every((ship) => {
        return !ship.alive;
    })

    return answer;

}