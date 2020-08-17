let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
console.log(text.length);
let noErrors = 2;
let binOutput;

/**
 * Called when convert is started
 */
function onSubmit() {

    //Add Length
    let input = addLength();
    binOutput = textToBinary(input);
    //binOutput = textToBinary(text);

    //ADDING ENCODING INFORMATION
    let dnaStringOutput = binaryToDNA(binOutput);

    //add Primers
    let addedPrimers = addPrimers(dnaStringOutput);

    //Add Redundancy and Complement
    let cloneOne = addedPrimers.slice();
    let cloneTwo = addedPrimers.slice();
    let comp = addComplement(addedPrimers); //or dnaString Output
    //let cloneOne = dnaStringOutput.slice();
    //let cloneTwo = dnaStringOutput.slice();
    //let comp = addComplement(dnaStringOutput);
    //let reverse = cloneTwo.reverse();

    //Add Blocks
    let blocks = addBlocks(addPrimers);
    //errorSimulator(blocks);

    //ERROR SIMULATOR
    let cloneError = errorSimulator(cloneOne);
    let cloneTwoError = errorSimulator(cloneTwo);
    let dnaStringError = errorSimulator(addedPrimers);
    console.log(dnaStringError);
    let errorComp = errorSimulator(comp);

    // let rem = removePrimers(errorDNA);
    // let extractedLength = getLength(removePrimers); //call getLength from here
    // errorCorrectLength(extractedLength);
    
    //Call Error Correcting for Redundant
    let errorCorrection = errorCorrectRedundant(cloneError, dnaStringError, cloneTwoError);
    let errorCorrectionResult = dnaToBinary(errorCorrection);
    let convertedOutput = removePrimers(errorCorrectionResult);
    let decoded = decode(convertedOutput);
    binaryToText(decoded);

    let extractedLength = getLength(errorCorrectionResult); //call getLength from here
    console.log(extractedLength);
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
    // console.log(binOutput.length);
    let dnaArray = [];
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
    return dnaArray;
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
function addPrimers(dnaArray) {
    let stringed = dnaArray.join("");
    let primer = "AAAAA"; //Add Primer of 5 A's
    let dnaString = primer + stringed + primer;
    let textLength, dnaLength, binaryLength;
    return dnaString;
}

/**
 * 
 */
function addLength() {
    let padding = "00000000";
    let textLength = text.length;
    let noNums = textLength.toString().length;
    let zeros = 8 - noNums;
    let zerosPadding = padding.slice(0, zeros);
    let final = zerosPadding + textLength;
    console.log(final);
    //length of DNA == 32 CHARACTERS AT THE END
    text = text + final;
    return text;
}

/**
 * 
 */
function addBlocks() {

}


/**
 * Generate Complement of DNA String to be stored
 */
function addComplement(dnaArray) {

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

/**
 * Error Simulator to delete random information
 * Attempting to mimic sequencing and synthesis errors in practice 
 * @param {*} dnaString 
 */
function errorSimulator(dnaString) { //does this have to deal with a string?
    let errorRate = Math.round(dnaString.length * noErrors / 1000); //error rate user input
    dnaArray = dnaString.split("");
    console.log(dnaArray);
    let min = 0; //change if errors should be concentrated at end
    for (let i = 0; i < errorRate; i++) { //for error rate
        let randomIndex = (Math.floor(Math.random() * dnaArray.length - min + 1) + min) + 1; //generate random index
        console.log(randomIndex);
        //min = randomIndex; //set minimum for sequential errors
        console.log(dnaArray[randomIndex + 1]);
        dnaArray.splice(randomIndex, 1); //remove element from string here
    }
    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrectRedundant(cloneOne, errorDNA, cloneTwo,len) {

    let temp = [];
    let missing = [];

    let majority;

       //remove primers
    //decode()
    //getLength()

    let getLenClone = errorDNA.slice();
    getLenClone.splice(-5, 5); //remove primer from end
    let bin = dnaToBinary(getLenClone);
    console.log(bin);
    let decodedLen = decode(bin);
    let ret = getLength(decodedLen);
    console.log(ret);

    let extractedLengthDiff = 45;

    while (extractedLengthDiff > 0) {
        //Identifies the index of where the error has occured 
        for (let j = 0; j < errorDNA.length; j++) {
            if (errorDNA[j] === cloneOne[j] && errorDNA[j] === cloneTwo[j]) {
                temp.push(errorDNA[j]);
            }
            else {
                missing.push({
                    original: errorDNA[j],
                    cloneOne: cloneOne[j],
                    cloneTwo: cloneTwo[j]
                })
                break;
            }
        }

        let indexToInsert = temp.length;
        //correct in missing 

        for (let i = 0; i < missing.length; i++) {
            if (missing[i].original === missing[i].cloneOne) {
                majority = missing[i].original;
                cloneTwo.splice(indexToInsert, 0, majority);
                //return errorDNA, cloneOne, cloneTwo;
                //dnaToBinary(cloneTwo);
            }
            else if (missing[i].original === missing[i].cloneTwo) {
                majority = missing[i].original;
                cloneOne.splice(indexToInsert, 0, majority);
                //return errorDNA, cloneOne, cloneTwo;
                //dnaToBinary(cloneOne);
            }
            else if (missing[i].cloneTwo === missing[i].cloneOne) {
                majority = missing[i].cloneTwo;
                errorDNA.splice(indexToInsert, 0, majority);
                //return errorDNA, cloneOne, cloneTwo;
                //dnaToBinary(errorDNA);
            }
        }
        missing = [];
        temp = [];
        majority = "";
        extractedLengthDiff--;
    }
    return errorDNA;

}


//Get Length of Binary --> must decode to get length
//decode original string
//remove primers
//call getLength
function getLength(decodedResult) {
    //decodedResult.splice(-5, 5); //remove primer from en
    let removeNum = decodedResult.length - 32;
    decodedResult.splice(0, removeNum);
    let extractedLength = decode(decodedResult);
    let finalNum = binaryToText(extractedLength);
    let num = finalNum.replace(/^0+/, '');
    let dnaLength = (num * 4) + 42;
    console.log(dnaLength);
    return dnaLength;
}

// function errorCorrectLength(len) {
//     let dnaLength = (len * 4) + 42;
//     console.log(dnaLength);
// }

/**
 * Convert error corrected string back to binary  
 * @param {*} dnaString 
 */
function dnaToBinary(dnaString) {
    let decodedResult = [];

    for (let i = 0; i < dnaString.length; i++) {
        if (dnaString[i] == "A") {
            decodedResult.push("00");
        }
        if (dnaString[i] == "G") {
            decodedResult.push("01");
        }
        if (dnaString[i] == "C") {
            decodedResult.push("10");
        }
        if (dnaString[i] == "T") {
            decodedResult.push("11");
        }
    }
    return decodedResult;
    console.log(decodedResult);
}




function removePrimers(convertedOutput) {
    //check if all A's and then splice
    convertedOutput.splice(0, 5); //remove primer from beginning
    convertedOutput.splice(-5, 5); //remove primer from end
    return convertedOutput;

}

function decode(convertedOutput) {
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
    return temp;
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
