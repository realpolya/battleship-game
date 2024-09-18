// returns cell letter and number
export const callCell = (cell, size, alphabet, horArray2D, verArray2D, comHorArray2D, comVerArray2D, computer) => {
    
    let letter;
    let number;

    // computer attacks – search human array
    if (computer) {

        // get letter (verArray coincide with alphabet array)
        verArray2D.forEach((value, i) => {
            if (value.includes(cell)) {
                letter = alphabet[i]
            }
        })

        // get number
        horArray2D.forEach((value, i) => {
            if (value.includes(cell)) {
                number = i + 1; // index starts with 0
            }
        })

    } // if human attacks – search computer array
    else {

        // get letter (verArray coincide with alphabet array)
        comVerArray2D.forEach((value, i) => {
            if (value.includes(cell)) {
                letter = alphabet[i]
            }
        })

        // get number
        comHorArray2D.forEach((value, i) => {
            if (value.includes(cell)) {
                number = i + 1; // index starts with 0
            }
        })

    }

    let calledCell = letter + number;
    console.log("called cell is ", calledCell)
    console.log(typeof(calledCell));
    return calledCell;

}

export const generateAlphabet = (size) => {
    // letters array 
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let retainedAlphabet = [];

    for (let i = 0; i < size; i++) {
        retainedAlphabet.push(alphabet[i]);
    }

    console.log("Alphabet is ", retainedAlphabet)
    return retainedAlphabet;
}