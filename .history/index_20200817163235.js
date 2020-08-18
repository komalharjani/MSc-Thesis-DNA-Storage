let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
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

    //Add Length to String
    let input = addLength();
    binOutput = textToBinary(input); //returns length + text

    //Add Encoding Information
    let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
    console.log(dnaStringOutput);
    //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

    //Add Primers - for Blocks
    let addedPrimers = addPrimers(dnaStringOutput);

    //dnaStringOutput --> One Copy
    //errorSimulator should only take in 3 copies 
        //All Original
        //One Original 2 Complement
        //One Original, 1 Complement, 1 Reverse
        //One Original, 1 Complement, 1 Reverse, 1 Reverse Comp

    let original = document.getElementById("original").checked;
    if (original) {

        //Add Redundancy
        let cloneOne = addedPrimers.slice();
        let cloneTwo = addedPrimers.slice();

        //ERROR SIMULATOR
        let cloneError = errorSimulator(cloneOne);
        let cloneTwoError = errorSimulator(cloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

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
        let compCloneOne = getComplement(addedPrimers); //copy one
        let compCloneTwo = compCloneOne.slice(); //copy 2

        //ERROR SIMULATOR
        let cloneError = errorSimulator(compCloneOne);
        let cloneTwoError = errorSimulator(compCloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        //DECODE COMPLEMENT
        let decodeCompOne = getComplement(cloneError);
        let decodeCompTwo = getComplement(cloneTwoError);

        //ERROR CORRECT WITH REV COMPLEMENT
        let errorCorrection = errorCorrectRedundant(dnaStringError, decodeCompOne, decodeCompTwo);
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


    //Add Length for all Redundancy
    // let input = addLength();
    // binOutput = textToBinary(input);
    //binOutput = textToBinary(text);

    // //Add Encoding Information
    // let dnaStringOutput = binaryToDNA(binOutput);
    // console.log(dnaStringOutput);
    // document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

    // //Add Primers - for Blocks
    // let addedPrimers = addPrimers(dnaStringOutput);

    // //Add Blocks
    // let blocks = addBlocks(addPrimers);
    // //errorSimulator(blocks);

    // //Add Redundancy
    // let cloneOne = addedPrimers.slice();
    // let cloneTwo = addedPrimers.slice();

    //Add Complement
    //let comp = addComplement(addedPrimers); //or dnaString Output
    //let comp = addComplement(dnaStringOutput);

    //Add Reverse
    //let reverse = cloneTwo.reverse();
    //let reverseComp = comp.reverse();


    // //ERROR SIMULATOR
    // let cloneError = errorSimulator(cloneOne);
    // let cloneTwoError = errorSimulator(cloneTwo);
    // let dnaStringError = errorSimulator(addedPrimers);
    // //let errorComp = errorSimulator(comp);

    // //PRINT CORRUPTED
    // let corrupt = dnaToBinary(dnaStringError)
    // let decodeCorrupt = decode(corrupt);
    // let out = binaryToText(decodeCorrupt);
    // document.getElementById("corruptData").innerHTML = out;

    // let rem = removePrimers(errorDNA);
    // let extractedLength = getLength(removePrimers); //call getLength from here
    // errorCorrectLength(extractedLength);

    //Call Error Correcting for Redundant
    //if redundant --> send redundant clones, if complement - send complements
    // let errorCorrection = errorCorrectRedundant(cloneError, dnaStringError, cloneTwoError);
    // console.log(errorCorrection);
    // let errorCorrectionResult = dnaToBinary(errorCorrection);
    // let convertedOutput = removePrimers(errorCorrectionResult);
    // let decoded = decode(convertedOutput);
    // let fin = binaryToText(decoded);
    // document.getElementById("recoveredData").innerHTML = fin;
}

function simulate() {


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
function getComplement(dnaArray) {
    console.log(dnaArray);
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
    console.log(decodedResult);
    return decodedResult;
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
