# Battleship

## Setup Logic
1. Player is presented with 10x10 grid and has a fleet of 5 ships:
    * carrier – 5 cells
    * battleship - 4 cells
    * cruiser – 3 cells
    * submarine – 3 cells
    * destroyer – 2 cells
2. Following the instructions, player clicks on the grid to start the setup.
3. Player clicks on the one of the suggested grid cells to continue positioning the first ship.
4. Playes keep clicking until the first ship is positioned.
5. When ship is positioned, occupied cells are greyed out, adjacent cells are also disabled (blocked out).
6. Player has the option to return the ship back to the marina with the "Go back" button.
7. Player repeats steps 2-5 for each ship.
8. The player is not allowed to position new ships into the occupied cells.
9. Player can press the button "Start Game" only when all of the ships are positioned.

## Computer Setup Logic
1. Once "Start Game" button has been clicked, computer randomly generates its own setup and stores ships' location data in an object.

## Game Logic
1. Page with 2 boards is displayed:
    * One is player's with positioned ships visible
    * One is opponent's with empty grid (hidden ships)
2. It is player's turn.
3. Player clicks on a cell in a 10x10 opponent's grid. To fire, player follows his first click with clicking the "Fire!" button or pressing SPACE bar.
4. A message is rendered (either "Hit!" or "Miss!"). "Fire" button greys out. The clicked cell is assigned a color (one for "Miss", another for "Hit").
5. It is opponent's turn.
6. Computer randomly chooses one cell to attack on the player's field. Computer has a built-in logic to target adjacent cells once it records a "Hit" on player's board until player's ship sinks.
7. A message is rendered (either "Hit!" or "Miss!"). Once player clicks on the next cell, "Fire" button is activated again.
8. Repeat steps 2-7.
9. If a computer's ship is completely out, it is revealed, all of its cells are assigned a color.
10. Once all of the ships are out for one of the players, "You won" or "Computer won" message is rendered.
11. Player can press "Restart game" button at any point in the game.
12. Player can't click on disabled cells to fire.
13. Player can click "Show computer setup" to see computer's hidden ships. Player can then hide their positions.