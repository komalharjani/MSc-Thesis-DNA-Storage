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
    let clone = dnaString.slice();

    let cloneError = errorSimulator(clone);
    let dnaStringError = errorSimulator(dnaString);
    let comp = getComplement(dnaArray);
    let errorComp = errorSimulator(comp);
    errorCorrection(cloneError,dnaStringError,errorComp);

}

/**
 * Generate Complement of DNA String to be stored
 */
function getComplement() {

    let complement = [];
    for(let i=0; i < dnaArray.length; i++) {
        if(dnaArray[i] == "A") {
            complement.push("T");
        }
        if(dnaArray[i] == "T") {
            complement.push("A");
        }
        if(dnaArray[i] == "C") {
            complement.push("G");
        }
        if(dnaArray[i] == "G") {
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
    for (let i = 0; i < errorRate +1; i++) { //for error rate
        var item = dnaArray[Math.floor(Math.random() * dnaArray.length)]; //generate random index to be deleted
        console.log(item);
        let itemIndex = dnaArray.indexOf(item);
        console.log(itemIndex);
        console.log(dnaArray);
        dnaArray.splice(itemIndex, 1); //remove element from string here
    }
    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrection(cloneError,dnaStringError,errorComp) {
    let retrievedData = [];

    //1. Check for Primers - if all there and remove
    //2. 
    //var difference = cloneError.filter(x => errorComp.indexOf(x) === -1);
    // for(let i=0; i < cloneError.length; i++) {
    //     for(let j=0; j < errorComp.length;j++) {
    //        if(errorComp[i] == dnaStringError[j]) {
    //            retrievedData.push(errorComp[i]);
    //            break;
    //        }
    //     }
    // }

    let a = [];
    let diff = [];


    for(let i=0; i < cloneError.length; i++) {
        a[cloneError[i]] = true;
        //a.push(i);
    }
    console.log(a);

    for(let i=0; i <dnaStringError.length; i++) {
        if (a[dnaStringError[i]]) {
            delete a[dnaStringError[i]];
        }
        else {
            a[dnaStringError[i]] = true;
        }
    }
    console.log(a);
    for(let k in a) {
        diff.push(k);
    }
    console.log(diff);


    console.log(retrievedData);
    dnaToBinary(retrievedData);
    //parity checks - cut long string with primers and check whether that position has 5 A's --> and calculate length - before removing primers ensure that it has recovered dat
    //check if something is not supposed to be in place
    dnaToBinary(dnaStringError);
    dnaToBinary(cloneError);
    dnaToBinary(errorComp);
}

let retrieve =[];
function compareArray(){
    for(let i=0; i<dnaArray.length;i++){
        for(let j=-1; j<dnaArray.length;j--){
            if(dnaArray[i]==complement[j]){
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
    console.log(dnaString);
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
    console.log(convertedOutput);
    convertedOutput.splice(0, 5); //remove primer from beginning
    convertedOutput.splice(-5, 5); //remove primer from end
    let conv = convertedOutput.join("");
    console.log(conv);


    let temp = [];
    var i = 0;
    var n = conv.length;

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    console.log(temp);
    temp = temp.join(" ");
    binaryToText(temp);
}

/**
 * Map Binary back to text using ASCII character codes
 * @param {*} str 
 */
function binaryToText(str) {
    console.log(str);
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    console.log(binString);
    return binString;
}

