let adenine = 00;
let guanine = 10;
let cytosine = 01;
let thymine = 11;

/**
 * Function to convert String to Binary
 * @param {*} text 
 */
function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join("");
}
let binOutput = textToBin("Komal");
console.log(binOutput);

let dnaArray = [];

//add primers
//specify length --> how to break up data?
function mapDNA(binOutput) {
    for (let i = 0; i < binOutput.length; i++) {
      for (let j = 1; j < binOutput.length; j++) {
            if (binOutput[i] == 0 && binOutput[j] == 0) {
                dnaArray.push("A");
            }
       }
    }
}
mapDNA(binOutput);
console.log(dnaArray.join(""));

//Put in Primer

/**
 * Function to Convert Binary to String
 * @param {Binary Input} str 
 */
function binToText(str) {
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}
let input = binToText("01001000 01100101 01101100 01101100 01101111");
console.log(input);
