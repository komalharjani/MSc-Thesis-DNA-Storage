//1. Convert String to Binary
//2. Encoder
//3. Add Primers
//4. Error Simulator
//5. Decoder
//6. Results

let noErrors = 1;

/**
 * 1. Function to convert String to Binary
 * @param {*} text 
 */
function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join(" ");
}
//call function
let binOutput = textToBin("An old silent pond...A frog jumps into the pond, splash! Silence again.");
console.log(binOutput);
console.log(binOutput.length);

/**
 * Encoder
 * @param {*} binOutput 
 */
let dnaArray = [];
function mapDNA(binOutput) {
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
}
mapDNA(binOutput); //call function
var str = dnaArray.join(""); //using this currently to decode
let stringed = dnaArray.join("");
let primer = "AAAAAA";
let dnaString = primer + stringed + primer;
console.log(dnaString);
console.log(stringed.length);

//3. ADD PRIMERS and FIXED LENGTH

/**
 * 4. Error Simulator
 * @param {*} str 
 */
function removeRandomLetter(str) {
    let errorRate = Math.round(dnaString.length * noErrors/100);
    for (let i=0; i < errorRate + 1; i++) {
        var item = dnaString[Math.floor(Math.random() * dnaString.length)];
        console.log(item);
        let itemIndex = dnaString.indexOf(item);
        if(itemIndex > -1) {
            dnaString.splice(itemIndex, 1);
        }
        console.log(itemIndex);
        dnaString[itemIndex] = "";
        console.log(item);
     }
     console.log(dnaString);
}

// array = [2, 9]
console.log(array); 

removeRandomLetter(str);

//5. Error Corrector and remove primers
//5:00

/**
 * 6. Function to Convert Binary to String
 * @param {Binary Input} str 
 */
function binToText(str) {
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}
let input = binToText(binOutput);
console.log(input);

//HTML
//6:00