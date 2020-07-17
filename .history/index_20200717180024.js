

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
    return output.join(" ");
}
let binOutput = textToBin("An old silent pond...A frog jumps into the pond, splash! Silence again.");
console.log(binOutput);
console.log(binOutput.length);
 
var split = [],
      i = 0,
      n = binOutput.length;

  while (i < n) {
    split.push(binOutput.slice(i, i += 2));
  }
  console.log(split);
  let dnaArray = [];

//add primers
//specify length --> how to break up data?
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
let input = binToText("01000001 01101110 00100000 01101111 01101100 01100100 00100000 01110011 01101001 01101100 01100101 01101110 01110100 00100000 01110000 01101111 01101110 01100100 00101110 00101110 00101110 01000001 00100000 01100110 01110010 01101111 01100111 00100000 01101010 01110101 01101101 01110000 01110011 00100000 01101001 01101110 01110100 01101111 00100000 01110100 01101000 01100101 00100000 01110000 01101111 01101110 01100100 00101100 00100000 01110011 01110000 01101100 01100001 01110011 01101000 00100001 00100000 01010011 01101001 01101100 01100101 01101110 01100011 01100101 00100000 01100001 01100111 01100001 01101001 01101110 00101110");
console.log(input);
