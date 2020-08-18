let text = "Hello my name is Komal and I like the colour yellow."
console.log(text.length);
//let noErrors = 2;
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
let noErrors;

output.innerHTML = slider.value; // Display the default slider value
slider.oninput = function () {
    output.innerHTML = this.value;
    noErrors = this.value;
}
let binOutput;


/**
 * Called when convert is started
 */
function onConvert() {

    let blocks = document.getElementById("fixed").checked;
    if (blocks) {

        //Add Length to String
        //let input = addLength();
        binOutput = textToBinary(text); //returns length + text

        //Add Encoding Information
        let dnaArray = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaArray);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //STORE IN DNA?
        let lengthOfBlock = 5;

        console.log(dnaArray);
        let addBlock = addBlocks(dnaArray, lengthOfBlock);
        let blockArr = Array.from(addBlock).join("");
        console.log(blockArr);
        console.log(addBlock);
        //let primedOriginal = addPrimers(blockArr);

        //Create Clones
        let cloneOneString = blockArr.slice();
        let cloneTwoString = blockArr.slice();

        //Error Simulator
        let corruptClone = errorSimulator(cloneOneString);
        let corruptCloneTwo = errorSimulator(cloneTwoString);
        let corruptOriginal = errorSimulator(blockArr);

        let l = corruptClone.length;

        let block = [];
        // for (let i = 5; i < l; i += 9) {
        //     corruptClone.splice(i, 4);
        //     corruptCloneTwo.splice(i, 4);
        //     corruptOriginal.splice(i, 4);
        // }

        for (let i = 5; i < corruptClone.length; i += 6) {
            corruptClone.splice(i, 4);
            corruptCloneTwo.splice(i, 4);
            corruptOriginal.splice(i, 4);
        }
        console.log(corruptClone);

        //Remove Primers
        // removePrimers(corruptClone);
        // removePrimers(corruptCloneTwo);
        // removePrimers(corruptOriginal);

        errorCorrectBlock(corruptClone, corruptCloneTwo, corruptOriginal);
    }

    let original = document.getElementById("original").checked;
    if (original) {


        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);

        //Add Redundancy
        let cloneOne = addedPrimers.slice();
        let cloneTwo = addedPrimers.slice();

        //ERROR SIMULATOR
        let cloneError = errorSimulator(cloneOne);
        let cloneTwoError = errorSimulator(cloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        errorCorrect(dnaStringError, cloneError, cloneTwoError);

    }

    let comp = document.getElementById("comp").checked;
    if (comp) {

        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);
        let compCloneOne = getComplement(addedPrimers).join(""); //copy one
        let compCloneTwo = getComplement(addedPrimers).join("");

        //ERROR SIMULATOR
        let cloneError = errorSimulator(compCloneOne);
        let cloneTwoError = errorSimulator(compCloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        //DECODE COMPLEMENT
        let decodeCompOne = getComplement(cloneError);
        let decodeCompTwo = getComplement(cloneTwoError);

        //ERROR CORRECT WITH REV COMPLEMENT
        errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);
    }

    let rev = document.getElementById("rev").checked;
    if (rev) {

        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");


        //Add Primers - for Blocks
        let addedPrimersOrg = addPrimers(dnaStringOutput);
        let addedPrimersRev = addPrimers(dnaStringOutput.reverse());
        let clone = addedPrimersRev.slice();

        //ERROR SIMULATOR
        let cloneError = errorSimulator(addedPrimersRev);
        let cloneTwoError = errorSimulator(clone);
        let dnaStringError = errorSimulator(addedPrimersOrg);

        //REVERSE BACK
        cloneError = cloneError.reverse();
        cloneTwoError = cloneTwoError.reverse();

        //ERROR CORRECT WITH REV COMPLEMENT
        errorCorrect(dnaStringError, cloneError, cloneTwoError);
    }

    let revComp = document.getElementById("revComp").checked;
    if (revComp) {

        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");


        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);
        let revAddedPrimers = addPrimers(dnaStringOutput.reverse());
        let compCloneOne = getComplement(revAddedPrimers).join(""); //copy one
        let compCloneTwo = getComplement(revAddedPrimers).join("");

        //ERROR SIMULATOR
        let cloneError = errorSimulator(compCloneOne);
        let cloneTwoError = errorSimulator(compCloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        //DECODE COMPLEMENT
        let decodeCompOne = getComplement(cloneError).reverse();
        let decodeCompTwo = getComplement(cloneTwoError).reverse();

        //ERROR CORRECT WITH REV COMPLEMENT
        errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);


    }

    //choose upto 4 redundnacies -- if one selected --> 

}

function addBlocks(dnaArray, n) {

    //start at 5
    for (let i = 5; i < dnaArray.length; i += 6) {
        dnaArray.splice(i, 0, "TTTT");
    }
    let arr = dnaArray.join("");
    let block = Array.from(arr);

    return block;
}


/**
 * 
 */
function errorCorrect(dnaStringError, cloneError, cloneTwoError) {
    //AFTER THIS ERROR CORRECT
    //ERROR CORRECTOR
    let errorCorrection = errorCorrectRedundant(dnaStringError, cloneError, cloneTwoError);
    console.log(errorCorrection);
    //Convert result to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);
    //Remove Primers
    let convertedOutput = removePrimers(errorCorrectionResult);
    //Decode
    let decoded = decode(convertedOutput);
    let fin = binaryToText(decoded);
    document.getElementById("recoveredData").innerHTML = fin;

    //PRINT CORRUPTED
    let corrupt = dnaToBinary(dnaStringError)
    let decodeCorrupt = decode(corrupt);
    let out = binaryToText(decodeCorrupt);
    document.getElementById("corruptData").innerHTML = out;
}

function errorCorrectBlock(dnaStringError, cloneError, cloneTwoError) {

    //Run Error Correction - Modify to remove blocks
    let errorCorrection = errorCorrectRedundantBlock(dnaStringError, cloneError, cloneTwoError);
    console.log(errorCorrection);

    //Convert to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);

    //Split into 8s
    let decoded = decode(errorCorrectionResult);

    //Print Result
    let fin = binaryToText(decoded);
    document.getElementById("recoveredData").innerHTML = fin;
}

function concurrent() {

}

function imageToBinary(img) {
    var binArray = []
    var datEncode = "";

    for (i = 0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
    }
    for (j = 0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
    }
    function padding_left(s, c, n) {
        if (!s || !c || s.length >= n) {
            return s;
        }
        var max = (n - s.length) / c.length;
        for (var i = 0; i < max; i++) {
            s = c + s;
        } return s;
    }
    console.log(binArray);
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
    return dnaString;
}

function removePrimers(convertedOutput) {
    //check if all A's and then splice
    convertedOutput.splice(0, 5); //remove primer from beginning
    convertedOutput.splice(-5, 5); //remove primer from end
    return convertedOutput;

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
 * Generate Complement of DNA String to be stored
 */
function getComplement(dnaArray) {
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
    //let comp = complement.join("");
    return complement;
}

/**
 * Error Simulator to delete random information
 * Attempting to mimic sequencing and synthesis errors in practice 
 * @param {*} dnaString 
 */
function errorSimulator(dnaString) { //does this have to deal with a string?
    console.log(noErrors);
    let errorRate = Math.round(dnaString.length * noErrors / 1000); //error rate user input
    dnaArray = dnaString.split("");
    console.log(dnaArray);
    let dispersed = document.getElementById("dispersed").checked;
    let endDNA = document.getAnimations("endDNA").checked;
    let min;
    if (dispersed) {
        min = 0; //change if errors should be concentrated at end
        console.log(min);
    }
    if (endDNA) {
        min = dnaString.length - (dnaString.length * 0.1); //ten percent
        console.log(min);
    }

    for (let i = 0; i < errorRate; i++) { //for error rate
        let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
        console.log(randomIndex);

        //deletion error
        let del = document.getElementById("delete").checked;
        if (del) {
            dnaArray.splice(randomIndex, 1);
            console.log(dnaArray);
        }
        //insertion error
        let insert = document.getElementById("insert").checked;
        if (insert) {
            dnaArray.splice(randomIndex, 0, "G");
            console.log(dnaArray);
        }
        //substitution error
        let sub = document.getElementById("sub").checked;
        if (sub) {
            dnaArray.splice(randomIndex, 1, 'A');
            console.log(dnaArray);
        }
    }
    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrectRedundant(errorDNA, cloneOne, cloneTwo, len) {

    let temp = [];
    let missing = [];
    let majority;

    let getLenClone = errorDNA.slice();
    let errorCorrectionResult = dnaToBinary(getLenClone);
    let convertedOutput = removePrimers(errorCorrectionResult);
    let decoded = decode(convertedOutput);
    binaryToText(decoded);
    let extractedLength = getLength(errorCorrectionResult); //call getLength from here
    console.log(extractedLength);
    console.log(getLenClone.length);

    let noErrors = (extractedLength - getLenClone.length) * 3;
    console.log(noErrors);


    while (noErrors > 0) {
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
        noErrors--;
    }
    return errorDNA;

}

function errorCorrectRedundantBlock(errorDNA, cloneOne, cloneTwo, len) {

    let temp = [];
    let missing = [];
    let majority;

    noErrors = 10;

    while (noErrors > 0) {
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

            }
            else if (missing[i].original === missing[i].cloneTwo) {
                majority = missing[i].original;
                cloneOne.splice(indexToInsert, 0, majority);

            }
            else if (missing[i].cloneTwo === missing[i].cloneOne) {
                majority = missing[i].cloneTwo;
                errorDNA.splice(indexToInsert, 0, majority);

            }
        }
        missing = [];
        temp = [];
        majority = "";
        noErrors--;
    }
    //check that there are 30 characters in between every TTTT
    return errorDNA;
}

/**
 * 
 * @param {*} decodedResult 
 */
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
    console.log(decodedResult);
    return decodedResult;

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
