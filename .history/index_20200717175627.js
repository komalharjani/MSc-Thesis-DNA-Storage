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
let binOutput = textToBin("An old silent pond. A frog jumps into the pond, splash! Silence again.");
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

//Function to Convert DNA into Binary (Decoder)

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
let input = binToText(01000001011011100010000001101111011011000110010000100000011100110110100101101100011001010110111001110100001000000111000001101111011011100110010000101110001000000100000100100000011001100111001001101111011001110010000001101010011101010110110101110000011100110010000001101001011011100111010001101111001000000111010001101000011001010010000001110000011011110110111001100100001011000010000001110011011100000110110001100001011100110110100000100001001000000101001101101001011011000110010101101110011000110110010100100000011000010110011101100001011010010110111000101110);
console.log(input);
