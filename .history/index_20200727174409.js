
//Primer
//Error Simulator
//Error-Correcting Codes


/**
 * Function to convert String to Binary
 * @param {*} text 
 */
function textToBin() {
    let text = document.getElementById("textToConvert").value;
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    output.join(" ");
    mapDNA(output);
}


// let binOutput = textToBin();
// console.log(binOutput);
// console.log(binOutput.length);


//add primers
//specify length --> how to break up data?
function mapDNA(binOutput) {
    var split = [],
        i = 0,
        n = binOutput.length;

    while (i < n) {
        split.push(binOutput.slice(i, i += 2));
    }
    console.log(split);
    let dnaArray = [];
    for (let i = 0; i < split.length; i++) {
        if (split[i] == "00") {
            dnaArray.push("A");
        }
        else if (split[i] == "01") {
            dnaArray.push("G");
        }
        else if (split[i] == "10") {
            dnaArray.push("C");
        }
        else if (split[i] == "11") {
            dnaArray.push("T");
        }
    }
}
mapDNA(binOutput);
console.log(dnaArray.join(""));
var str = dnaArray.join("");

function errorSimulator(dnaString) {
    let errorRate = Math.round(dnaString.length * noErrors / 100);
    for (let i = 0; i < errorRate + 1; i++) {
        var item = dnaString[Math.floor(Math.random() * dnaString.length)];
        console.log(item);
        let itemIndex = dnaString.indexOf(item);
        if (itemIndex > -1) {
            dnaString.slice(itemIndex, 1);
        }
        console.log(itemIndex);
        dnaString[itemIndex] = "";
        console.log(item);
    }
    console.log(dnaString);
}

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
let input = binToText(binOutput);
console.log(input);