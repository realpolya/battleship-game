/* battleship

INSTRUCTIONS:
Start with 5 x 5 grid
Pseudocode:
1) 

*/


/*-------------------------------- Constants --------------------------------*/
// aGrid - player A, bGrid - player B
const aGrid = [[]];
const bGrid = [[]];

// ships
const carrier = 5;
const battleship = 4;
const cruiser = 3;
const submarine = 3;
const destroyer = 2;

/*---------------------------- Variables (state) ----------------------------*/

// win/lose condition
let gameOver = false;
let winner;

// store selected cell
let selectedCell;




/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/

/*----------------------------- Event Listeners -----------------------------*/