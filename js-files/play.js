/* this file has functions for the game logic of battleship */

const analyzeAttack = (cell, aGrid, ships, hitCount) => {
    // see if the cell is empty or not

        // if the cell is empty

            // render "Miss" message

            // color the cell with the missed color

        // if the cell is occupied

            // update hitCount

            // update the color with the hit color

            // see which ship was hit (but don't disclose)

                // if the first hit

                // update hit count of that specific ship
            
            // if hit count equals to length

                // ship is out

                // render message that ship is out

                // reveal the ship

                // change alive boolean

            // render the message

        // check if there are any alive ships

            // if not, render winner
}

const computerFires = () => {

}