let text = "Hello my name is Komal.";
let noErrors = 5;

let binOutput;

/**
 * Called when convert is started
 */
function onSubmit() {
    //let text = document.getElementById("textToConvert").value;
    textToBinary(text);
    binOutput = textToBinary(text);
    console.log(binOutput);
    binaryToDNA(binOutput);
}

/**
 * Converting User Inputted Text into Binary using ASCII Table
 * @param {*} text
 */
function textToBinary(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join("");
}

/**
 * Converting Binary Output to DNA by Mapping 2 bits to A, G, C or T.
 * Mapping: A = 00, G = 01, C = 10, T = 11
 * @param {*} binOutput 
 */
function binaryToDNA(binOutput) {
    console.log(binOutput.length);
    let dnaArray = [];
    //redundancy (for arrays in an array)
    var twoBitsArray = []; //Array to hold binary elements, each element containing 2 bits
    var i = 0;
    var n = binOutput.length;

    while (i < n) {
        twoBitsArray.push(binOutput.slice(i, i += 2));
    }
    console.log(twoBitsArray);

    for (let i = 0; i < twoBitsArray.length; i++) {
        if (twoBitsArray[i] == "00") {
            dnaArray.push("A");
        }
        else if (twoBitsArray[i] == "01") {
            dnaArray.push("G");
        }
        else if (twoBitsArray[i] == "10") {
            dnaArray.push("C");
        }
        else if (twoBitsArray[i] == "11") {
            dnaArray.push("T");
        }
    }
    addPayload(dnaArray);
}

/**
 * Control 1: Remove Homopolymers and 'GC' repeats
 */
function removeHomopolymers() {

}

/**
 * Add a Payload
 * @param {*} dnaArray 
 */
function addPayload(dnaArray) {
    let stringed = dnaArray.join("");
    let primer = "AAAAA"; //Add Primer of 5 A's
    let dnaString = primer + stringed + primer;
    let textLength, dnaLength, binaryLength;
    redundantArr(dnaString);
    getComplement(dnaArray);
    //errorSimulator(dnaString); --> If redundant not called
}

/**
 * Add Redundancies (10-fold?)
 * Make Dynamic
 * @param {*} dnaString 
 */
function redundantArr(dnaString) {
    let cloneOne = dnaString.slice();
    let cloneError = errorSimulator(cloneOne);
    let cloneTwo = dnaString.slice();
    let cloneTwoError = errorSimulator(cloneTwo);
    let dnaStringError = errorSimulator(dnaString);
   // let comp = getComplement(dnaArray);
   // let errorComp = errorSimulator(comp);
    errorCorrection(cloneError, dnaStringError, cloneTwoError);

}

/**
 * Generate Complement of DNA String to be stored
 */
function getComplement() {

    let complement = [];
    for (let i = 0; i < dnaArray.length; i++) {
        if (dnaArray[i] == "A") {
            complement.push("T");
        }
        if (dnaArray[i] == "T") {
            complement.push("A");
        }
        if (dnaArray[i] == "C") {
            complement.push("G");
        }
        if (dnaArray[i] == "G") {
            complement.push("C");
        }
    }
    let comp = complement.join("");
    return comp;
}

// function fixedLengthString() {

// }

/**
 * Error Simulator to delete random information
 * Attempting to mimic sequencing and synthesis errors in practice 
 * @param {*} dnaString 
 */
function errorSimulator(dnaString) { //does this have to deal with a string?
    let errorRate = Math.round(dnaString.length * noErrors / 1000); //error rate user input
    dnaArray = dnaString.split("");
    console.log(dnaArray);

    let min = 0; //change if ends of string want to be cut

    for (let i = 0; i < errorRate; i++) { //for error rate
        let randomIndex = (Math.floor(Math.random() * dnaArray.length - min +1) + min) + 1; //generate random index
        console.log(randomIndex);
        //min = randomIndex; //set minimum for sequential errors
        console.log(dnaArray[randomIndex + 1]);
        dnaArray.splice(randomIndex, 1); //remove element from string here
        console.log(dnaArray);
    }
    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrection(cloneError, dnaStringError,cloneTwoError) {
   
    let a = [];
    let diff = [];

    //Put all elements into a
    for (let i = 0; i < dnaStringError.length; i++) {
        a[dnaStringError[i]] = true;
    }

    for (let i = 0; i < cloneError.length; i++) {
        if (a[cloneError[i]]) {
            delete a[cloneError[i]];
        }
        else {
            a[dnaStringError[i]] = true;
        }
    }

    for (let k in a) {
        diff.push(k);
    }

    console.log(diff);
    //get index
    //splice
    //return 

    diff.toString();
    let insert = diff.toString();
    let temp = [];
    let missing = [];

    for(let i=0; i < dnaStringError.length; i++) {
            if(dnaStringError[i] === cloneError[i] === cloneTwoError[i]) {
                temp.push(dnaStringError[i]);
            }
            else {
                missing.push(dnaStringError[i]);
                break;
            }
    }
    console.log(temp);
    console.log(missing);

    let indexToInsert = temp.length;
    //run this loop again and find second index for number missing


    let retrieved = dnaStringError.slice();
    retrieved.splice(indexToInsert,0,"A");

    console.log(dnaStringError);
    console.log(retrieved);

    //parity checks - cut long string with primers and check whether that position has 5 A's --> and calculate length - before removing primers ensure that it has recovered dat
    //check if something is not supposed to be in place
    dnaToBinary(dnaStringError);
    dnaToBinary(retrieved);
    //dnaToBinary(cloneError);
    //dnaToBinary(errorComp);
}

let retrieve = [];
function compareArray() {
    for (let i = 0; i < dnaArray.length; i++) {
        for (let j = -1; j < dnaArray.length; j--) {
            if (dnaArray[i] == complement[j]) {
                retrieve.push(dnaArray[i]);
            }
        }
    }
    console.log(retrieve);
}


/**
 * Convert error corrected string back to binary  
 * @param {*} dnaString 
 */
function dnaToBinary(dnaString) {
    let convertedOutput = [];

    for (let i = 0; i < dnaString.length; i++) {
        if (dnaString[i] == "A") {
            convertedOutput.push("00");
        }
        if (dnaString[i] == "G") {
            convertedOutput.push("01");
        }
        if (dnaString[i] == "C") {
            convertedOutput.push("10");
        }
        if (dnaString[i] == "T") {
            convertedOutput.push("11");
        }
    }
    // console.log(convertedOutput);
    convertedOutput.splice(0, 5); //remove primer from beginning
    convertedOutput.splice(-5, 5); //remove primer from end
    let conv = convertedOutput.join("");
    // console.log(conv);


    let temp = [];
    var i = 0;
    var n = conv.length;

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    // console.log(temp);
    temp = temp.join(" ");
    binaryToText(temp);
}

/**
 * Map Binary back to text using ASCII character codes
 * @param {*} str 
 */
function binaryToText(str) {
    // console.log(str);
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    console.log(binString);
    return binString;
}

