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
let binOutput = textToBin("Komal Harjani");
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
let input = binToText("01001011011011110110110101100001011011000010000001001000011000010111001001101010011000010110111001101001");
console.log(input);
