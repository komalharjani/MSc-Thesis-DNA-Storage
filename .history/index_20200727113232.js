//1. Convert String to Binary
//2. Encoder
//3. Add Primers
//4. Error Simulator
//5. Decoder
//6. Results


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

var split = [];
var i = 0;
var n = binOutput.length;

  while (i < n) {
    split.push(binOutput.slice(i, i += 2));
  }
  console.log(split);

/**
 * Encoder
 * @param {*} binOutput 
 */
let dnaArray = [];
function mapDNA(binOutput) {
    for (let i = 0; i < split.length; i++) {
            if (split[i] == "00") {
                dnaArray.push("A");
            }
            else if(split[i] == "01") {
                dnaArray.push("G");
            }
            else if(split[i] == "10") {
                dnaArray.push("C");
            }
            else if(split[i] == "11") {
                dnaArray.push("T");
            }
       }
}
mapDNA(binOutput);
console.log(dnaArray.join(""));
var str = dnaArray.join("");
console.log(str.length);

//3. ADD PRIMERS

/**
 * 4. Error Simulator
 * @param {*} str 
 */
for(var i = 0; i < str.length; i++) {
    str = removeRandomLetter(str);
}

var out;

function removeRandomLetter(str) {
    var pos = 0.01*str.length;
    var position = Math.floor(Math.random() * dnaArray.length);
    out = str.substring(position, Math.random)+str.substring(0);
    return str.charAt;
}
console.log(out);
console.log(out.length);

//5. Error Corrector


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
