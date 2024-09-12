# Battleship

## Setup Logic
1. Player is presented with 10x10 grid and has a fleet of 5 ships:
    * carrier – 5 cells
    * battleship - 4 cells
    * cruiser – 3 cells
    * submarine – 3 cells
    * destroyer – 2 cells
2. Player clicks on the ship of choice.
3. Player places the ship on the grid.
4. Playes has the option to rotate the ship horizontally via "Rotate" button.
5. When ship is positioned, occupied cells are greyed out, adjacent cells are also disabled (blocked out).
6. Player has the option to return the ship back to the marina with the "Return" button.
7. Player repeats steps 2-5 for each ship.
8. The player is not allowed to position new ships into the occupied cells.
9. Player can press the button "Ready" only once all of the ships are positioned.

## Computer Setup Logic
1. Once "Ready" button has been clicked, computer randomly generates and stores ships' location data in an object.

## Game Logic
1. Page with 2 boards is displayed:
    * One is player's with positioned ships visible
    * One is opponent's with empty grid (hidden ships)
2. It is player's turn.
3. Player clicks on a cell in a 10x10 opponent's grid. To fire, player follows his first click with clicking the "Fire!" button.
4. A message is rendered (either "Hit!" or "Miss!"). "Fire" button greys out. The clicked cell is assigned a color (grey for "Miss", red for "Hit")
5. It is opponent's turn.
6. Computer randomly chooses one cell to attack on the player's field.
7. A message is rendered (either "Hit!" or "Miss!"). "Fire" button is red again.
8. Repeat steps 2-7.
9. If a ship is completely out, it is moved into the graveyard space, all of its cells and adjacent cells are assigned a color.
10. Once all of the ships are out for one of the players, "You won" or "You lost" message is rendered.
11. Player can press "Restart game" button at any point in the game.
12. Player can't click on disabled cells to fire.