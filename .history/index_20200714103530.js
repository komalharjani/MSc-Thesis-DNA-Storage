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
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join("");
  }
  let binOutput = textToBin("Aleena");
  console.log(binOutput);

let dnaArray = [];
function mapDNA(binOutput) {
    for(let i=0; i < binOutput.length; i++) {
        console.log(binOutput[i]);
        if(binOutput[i] == 1) {
            dnaArray.push("A");
        }
        else {
            dnaArray.push("G");
        }
        //let tempOne = binOutput[i];
        //console.log(i);
        //let next = binOutput[i+1];
        //console.log(tempOne);
        //console.log(next);
        // if(binOutput[i] == 0) {
        //     dnaArray.push("A");
        // }
        // else {
        //     dnaArray.push("G");
        // }
        // else if(tempOne == 1 && next == 0) {
        //     dnaArray.push("G");
        // }
        // else if(tempOne == 0 && next == 1) {
        //     dnaArray.push("C");
        // }
        // else if(tempOne == 1 && next == 1) {
        //     dnaArray.push("T");
        // }
    }
}
mapDNA(binOutput);
console.log(dnaArray);


/**
 * Function to Convert Binary to String
 * @param {Binary Input} str 
 */
function binToText(str) {
        var binString = '';
        str.split(' ').map(function(bin) {
            binString += String.fromCharCode(parseInt(bin,2));
          });
        return binString;
        }
let input = binToText("01001000 01100101 01101100 01101100 01101111");        
console.log(input);

