
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
let errorDisplay = document.getElementById("errorRateDisplay");
let errorRate; //Specified Error Rate by User
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
    errorRate = this.value;
}
let binOutput;

/**
 * Called when convert is started
 */
function onConvert() {
    //Start Timer for Processing Time
    console.time("Processing Time");

    //Get Input text
    let text = document.getElementById("inputText").value;

    //Check what forms of redundancy have been inputted
    let blocks = document.getElementById("fixed").checked;
    let revComp = document.getElementById("revComp").checked;
    let original = document.getElementById("original").checked;
    let comp = document.getElementById("comp").checked;
    let rev = document.getElementById("rev").checked;

    //Display error rate
    errorDisplay.innerHTML = "Specified Error Rate: " + errorRate + " Percent";

    //Calculate Size and Display
    let inputOG = addLength(text);
    binOutput = textToBinary(inputOG); //returns length + text
    let size = binOutput.length * 0.000125;
    let sizeOfText = document.createElement('h4');
    sizeOfText.textContent = "Size: " + size.toFixed(2) + " KB";
    document.getElementById("sizeDisplay").appendChild(sizeOfText);

    //If fixed-Length blocks are selected
    if (blocks) {
        generateBlocks(text);
    }

    //If original copies are selected
    if (original) {
        generateOriginalCopy(text);
    }

    //If complement copies are selected
    if (comp) {
        generateComplementCopy(text);
    }

    //If reverse copies are selected
    if (rev) {
        generateRevCopy(text);
    }

    //If reverse complement copies are selected
    if (revComp) {
        generateRevCompCopy(text);
    }
    //Stop Timer for Processing Time
    console.timeEnd("Processing Time");

    //Log the Error Rate, Size and Original Text
    console.log("Specified Error Rate: " + errorRate + " Percent");
    console.log("Size: " + size.toFixed(2) + " KB");
    console.log("Inputted Text:" + text);
}


function generateBlocks(text) {

    //Add Length to String
    binOutput = textToBinary(text); //returns length + text

    //Encode Data to Binary 
    let dnaArray = binaryToDNA(binOutput);

    //STORE IN DNA?
    let lengthOfBlock = document.getElementById("blockSize").value;

    //Add Primers in between blocks
    let addBlock = addBlocks(dnaArray, lengthOfBlock);
    let blockArr = Array.from(addBlock).join("");

    //Create Clones
    let cloneOneString = blockArr.slice();
    let cloneTwoString = blockArr.slice();

    //Error Simulator
    let corruptClone = errorSimulator(cloneOneString);
    let corruptCloneTwo = errorSimulator(cloneTwoString);
    let corruptOriginal = errorSimulator(blockArr);

    let errorCorrection = errorCorrectRedundantBlock(corruptOriginal, corruptClone, corruptCloneTwo, lengthOfBlock);

    let lenMinusOne = lengthOfBlock - 1;

    //Remove Fixed Length Blocks after 
    for (let i = lengthOfBlock; i < errorCorrection.length; i += lengthOfBlock) {
        errorCorrection.splice(i, lenMinusOne);
    }

    //Convert to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);

    //Split into 8s
    let decoded = decode(errorCorrectionResult);
    let fin = binaryToText(decoded);

    //Calculate Similarity
    let similarity = similarText(text, fin);

    //Display Result
    let newPara = document.createElement('p');
    let label1 = document.createElement('h2');
    let similarityText = document.createElement('h3');
    label1.textContent = "Fixed Length Copies: ";
    newPara.textContent = fin;

    let corruptDNA = document.createElement('p');
    corruptDNA.textContent = corruptClone;
    document.getElementById("FLCorruptDNA").appendChild(corruptClone);

    similarityText.textContent = "Similarity Match: " + similarity.toFixed(2) + "%";
    console.log("Fixed Length Strings Similarity Match: " + similarity.toFixed(2) + "%");

    //Display Recovered
    document.getElementById("FLLabel").appendChild(label1);
    document.getElementById("FLRecoveredData").appendChild(newPara);
    document.getElementById("simMatchFixedLength").appendChild(similarityText);

    //Display Corrupt
    let corrupt = dnaToBinary(corruptOriginal)
    decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    let corruptOutput = document.createElement('p');
    corruptOutput.textContent = out;
    document.getElementById("FLCorruptDNA").appendChild(corruptOutput);

    //Display DNA
    let dnaOutput = document.createElement('p');
    dnaOutput.textContent = blockArr;
    document.getElementById("FLString").appendChild(dnaOutput);


}

function generateOriginalCopy(text) {

    //Add Length to String
    let inputOG = addLength(text);
    binOutput = textToBinary(inputOG); //returns length + text

    //Add Encoding Information
    let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
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

    let decoded = errorCorrect(dnaStringError, cloneError, cloneTwoError);
    let fin = binaryToText(decoded);

    //Calculate Similarity
    let similarity = similarText(text, fin);

    //Display Result
    let newPara = document.createElement('p');
    let label1 = document.createElement('h2');
    let similarityText = document.createElement('h3');
    label1.textContent = "Original Copies: ";
    newPara.textContent = fin;

    similarityText.textContent = "Similarity Match: " + similarity.toFixed(2) + "%";
    console.log("Original Similarity Match: " + similarity.toFixed(2) + "%");


    let corruptDNA = document.createElement('p');
    corruptDNA.textContent = cloneError;
    document.getElementById("OGCorruptDNA").appendChild(cloneError);

    //Display Recovered
    document.getElementById("originalLabel").appendChild(label1);
    document.getElementById("OGrecoveredData").appendChild(newPara);
    document.getElementById("simMatchOG").appendChild(similarityText);

    //Display Corrupt
    let corrupt = dnaToBinary(dnaStringError)
    decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    let corruptOutput = document.createElement('p');
    corruptOutput.textContent = out;
    document.getElementById("OGCorrupt").appendChild(corruptOutput);

    //Display DNA
    let dnaOutput = document.createElement('p');
    dnaOutput.textContent = addedPrimers;
    document.getElementById("OGDNAString").appendChild(dnaOutput);
}

function generateComplementCopy(text) {
    //Add Length to String
    let inputComp = addLength(text);
    binOutput = textToBinary(inputComp); //returns length + text

    //Add Encoding Information
    let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
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
    let decoded = errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);
    let fin = binaryToText(decoded);

    //Calculate Similarity
    let similarity = similarText(text, fin);

    let corruptDNA = document.createElement('p');
    corruptDNA.textContent = cloneError;
    document.getElementById("CompCorruptDNA").appendChild(cloneError);

    //Display Result
    let newPara = document.createElement('p');
    let label1 = document.createElement('h2');
    let similarityText = document.createElement('h3');
    label1.textContent = "Complement Copies: ";
    newPara.textContent = fin;

    similarityText.textContent = "Similarity Match: " + similarity.toFixed(2) + "%";
    console.log("Complement Similarity Match: " + similarity.toFixed(2) + "%");

    //Display Recovered
    document.getElementById("compLabel").appendChild(label1);
    document.getElementById("ComprecoveredData").appendChild(newPara);
    document.getElementById("simMatchComp").appendChild(similarityText);

    //Display Corrupt
    let corrupt = dnaToBinary(dnaStringError)
    decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    let corruptOutput = document.createElement('p');
    corruptOutput.textContent = out;
    document.getElementById("CompCorrupt").appendChild(corruptOutput);

    //Display DNA
    let dnaOutput = document.createElement('p');
    dnaOutput.textContent = addedPrimers;
    document.getElementById("CompDNAString").appendChild(dnaOutput);
}

function generateRevCopy(text) {
    //Add Length to String
    let input = addLength(text);
    binOutput = textToBinary(input); //returns length + text

    //Add Encoding Information
    let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
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
    let decoded = errorCorrect(dnaStringError, cloneError, cloneTwoError);
    let fin = binaryToText(decoded);
    // document.getElementById("recoveredData").innerHTML = "Reversed: " + fin;

    //Calculate Similarity
    let similarity = similarText(text, fin);


    let corruptDNA = document.createElement('p');
    corruptDNA.textContent = cloneError;
    document.getElementById("CompCorruptDNA").appendChild(cloneError);

    //Display Result
    let newPara = document.createElement('p');
    let label1 = document.createElement('h2');
    let similarityText = document.createElement('h3');
    label1.textContent = "Reverse Copies: ";
    newPara.textContent = fin;

    similarityText.textContent = "Similarity Match: " + similarity.toFixed(2) + "%";
    console.log("Reverse Similarity Match: " + similarity.toFixed(2) + "%");

    //Display Recovered
    document.getElementById("revLabel").appendChild(label1);
    document.getElementById("RevRecoveredData").appendChild(newPara);
    document.getElementById("simMatchRev").appendChild(similarityText);

    //Display Corrupt
    let corrupt = dnaToBinary(dnaStringError)
    decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    let corruptOutput = document.createElement('p');
    corruptOutput.textContent = out;
    document.getElementById("RevCorrupt").appendChild(corruptOutput);

    //Display DNA
    let dnaOutput = document.createElement('p');
    dnaOutput.textContent = addedPrimersRev;
    document.getElementById("RevDNAString").appendChild(dnaOutput);
}

function generateRevCompCopy(text) {
    //Add Length to String
    let input = addLength(text);
    binOutput = textToBinary(input); //returns length + text

    //Add Encoding Information
    let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
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
    let decoded = errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);
    let fin = binaryToText(decoded);

    //Calculate Similarity
    let similarity = similarText(text, fin);

    let corruptDNA = document.createElement('p');
    corruptDNA.textContent = cloneError;
    document.getElementById("CompCorruptDNA").appendChild(cloneError);

    //Display Result
    let newPara = document.createElement('p');
    let label1 = document.createElement('h2');
    let similarityText = document.createElement('h3');
    label1.textContent = "Reverse Complement Copies: ";
    newPara.textContent = fin;

    similarityText.textContent = "Similarity Match: " + similarity.toFixed(2) + "%";
    console.log("Reverse Complement Similarity Match: " + similarity.toFixed(2) + "%");

    //Display Recovered
    document.getElementById("revCompLabel").appendChild(label1);
    document.getElementById("RevCompRecoveredData").appendChild(newPara);
    document.getElementById("simMatchRevComp").appendChild(similarityText);

    //Display Corrupt
    let corrupt = dnaToBinary(dnaStringError)
    decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    let corruptOutput = document.createElement('p');
    corruptOutput.textContent = out;
    document.getElementById("RevCompCorrupt").appendChild(corruptOutput);

    //Display DNA
    let dnaOutput = document.createElement('p');
    dnaOutput.textContent = revAddedPrimers;
    document.getElementById("RevCompDNAString").appendChild(dnaOutput);

}


function addBlocks(dnaArray, n) {

    for (let i = n; i < dnaArray.length; i += (n + 1)) {
        dnaArray.splice(i, 0, "TTTT");
    }
    let arr = dnaArray.join("");
    let block = Array.from(arr);

    return block;
}


function errorCorrect(dnaStringError, cloneError, cloneTwoError) {
    //AFTER THIS ERROR CORRECT
    //ERROR CORRECTOR
    let errorCorrection = errorCorrectRedundant(dnaStringError, cloneError, cloneTwoError);
    //Convert result to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);
    //Remove Primers
    let convertedOutput = removePrimers(errorCorrectionResult);
    //Decode
    let decoded = decode(convertedOutput);
    return decoded;

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
    let dnaArray = [];
    var twoBitsArray = []; //Array to hold binary elements, each element containing 2 bits
    var i = 0;
    var n = binOutput.length;

    while (i < n) {
        twoBitsArray.push(binOutput.slice(i, i += 2));
    }

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
function addLength(text) {
    let padding = "00000000";
    let textLength = text.length;
    let noNums = textLength.toString().length;
    let zeros = 8 - noNums;
    let zerosPadding = padding.slice(0, zeros);
    let final = zerosPadding + textLength;
    //length of DNA == 32 CHARACTERS AT THE END
    let finalText = text + final;
    return finalText;
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
    let noErrors = Math.round(dnaString.length * errorRate / 1000); //error rate user input
    dnaArray = dnaString.split("");
    let dispersed = document.getElementById("dispersed").checked;
    let endDNA = document.getAnimations("endDNA")
    let subError = ["A", "G", "T", "C"];
    let min;
    if (dispersed) {
        min = 0; //change if errors should be concentrated at end
    }
    if (endDNA) {
        min = dnaString.length - 200;
    }

    //User Specified
    let noRunsInsert = document.getElementById("insertChars").value;
    let noRunsDelete = document.getElementById("deleteChars").value;
    let noRunsSub = document.getElementById("subChars").value;

    let del = document.getElementById("delete").checked;
    if (del) {
        for (let i = 0; i < noErrors; i++) { //for error rate
            let randomIndex = (Math.floor(Math.random() * dnaArray.length - min + 1) + min) + 1; //generate random index
            dnaArray.splice(randomIndex, noRunsDelete);
        }
    }
    else if (sub) {
        for (let i = 0; i < noErrors; i++) { //for error rate
            let randomIndex = (Math.floor(Math.random() * dnaArray.length - min + 1) + min) + 1; //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, 1, randomElement);
        }
    }
    else if (insert) {
        for (let i = 0; i < noErrors; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            for (let j = 0; j < noRunsSub; j++) {
                let randomElement = subError[Math.floor(Math.random() * subError.length)];
                dnaArray.splice(randomIndex, 0, randomElement);
                randomIndex++;
            }
        }
    }
    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrectRedundant(errorDNA, cloneOne, cloneTwo) {

    let temp = [];
    let missing = [];
    let majority;

    let getLenClone = errorDNA.slice();
    let errorCorrectionResult = dnaToBinary(getLenClone);
    let convertedOutput = removePrimers(errorCorrectionResult);
    let decoded = decode(convertedOutput);
    lengthToText(decoded);
    let extractedLength = getLength(errorCorrectionResult); //call getLength from here

    let noErrors;
    noErrors = (extractedLength - getLenClone.length) * 3;

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
            else {
                majority = "X";
                cloneOne.splice(indexToInsert, 0, majority);
                errorDNA.splice(indexToInsert, 0, majority);
                cloneTwo.splice(indexToInsert, 0, majority);
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

    errorRate = 10;

    while (errorRate > 0) {
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
        errorRate--;
    }
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
    let finalNum = lengthToText(extractedLength);
    let num = finalNum.replace(/^0+/, '');
    let dnaLength = (num * 4) + 42;
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
    return decodedResult;

}

function decode(convertedOutput) {
    let conv = convertedOutput.join("");


    let temp = [];
    var i = 0;
    var n = conv.length;

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    temp = temp.join(" ");
    return temp;
}

/**
 * Map Binary back to text using ASCII character codes
 * @param {*} str 
 */
function binaryToText(str) {
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}

function lengthToText(str) {
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}

function displayResults() {
    //1. Show All On Page
    //2. Compare Algorithm
    //3. Retrieval Rate Algorithm
    //4. Work Out File Size
    //5. Running Time Work Out
    //6. Save as File
}

//CITE
function similarText(originalText, recoveredText) {
    if (originalText === null || recoveredText === null || typeof originalText === 'undefined' || typeof recoveredText === 'undefined') {
        return 0;
    }

    originalText += '';
    recoveredText += '';

    let pos1 = 0;
    let pos2 = 0;
    let max = 0;
    let OGLength = originalText.length;
    let recoveredLength = recoveredText.length;
    let k;
    let sum;

    max = 0;

    for (let i = 0; i < OGLength; i++) {
        for (let j = 0; j < recoveredLength; j++) {
            for (k = 0;
                (i + k < OGLength) && (j + k < recoveredLength) && (originalText.charAt(i + k) === recoveredText.charAt(j + k)); k++);
            if (k > max) {
                max = k;
                pos1 = i;
                pos2 = j;
            }
        }
    }

    sum = max;

    if (sum) {
        if (pos1 && pos2) {
            sum += this.similarText(originalText.substr(0, pos2), recoveredText.substr(0, pos2));
        }

        if ((pos1 + max < OGLength) && (pos2 + max < recoveredLength)) {
            sum += this.similarText(originalText.substr(pos1 + max, OGLength - pos1 - max), recoveredText.substr(pos2 + max, recoveredLength - pos2 - max));
        }
    }

    sum = sum / (originalText.length) * 100;
    return sum;
}

