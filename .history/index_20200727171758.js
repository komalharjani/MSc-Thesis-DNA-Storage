//1. Convert String to Binary
//2. Encoder
//3. Add Primers
//4. Error Simulator
//5. Decoder
//6. Results

let noErrors = 1;

function textToBin() {
    let text = document.getElementById("textToConvert").innerHTML;
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join(" ");
}
// let text = "An old silent pond...A frog jumps into the pond, splash! Silence again.";
let binOutput = textToBin();
console.log(binOutput);
console.log(binOutput.length);
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
    var str = dnaArray.join(""); //using this currently to decode
    let stringed = dnaArray.join("");
    let primer = "AAAAAA";
    let dnaString = primer + stringed + primer;
    console.log(dnaString);
    console.log(stringed.length);
    errorSimulator(dnaString);
}
mapDNA(binOutput); //call function when user input


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