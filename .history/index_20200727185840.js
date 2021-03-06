let text = "An old silent pond...A frog jumps into the pond, splash! Silence again.";
let noErrors = 1;

let binOutput;

function onSubmit() {
    //let text = document.getElementById("textToConvert").value;
    textToBinary(text);
    binOutput = textToBinary(text);
    console.log(binOutput);
    binaryToDNA(binOutput);
    //binaryToText(binOutput);
    // let input = binaryToText(binOutput);
    // console.log(input);
}

function textToBinary(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join(" ");
}

function binaryToDNA(binOutput) {

    let dnaArray = [];
    var twoBitsArray = []; //Array to hold binary elements, each element containing 2 bits
    var i = 0;
    var n = binOutput.length;
    console.log(n);

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
    let primer = "AAA";
    let dnaString = primer + stringed + primer;
   // console.log(dnaString);
    console.log(stringed.length);
    errorSimulator(stringed);
}

function errorSimulator(dnaString) {
    // let errorRate = Math.round(dnaString.length * noErrors / 100);
    // for (let i = 0; i < errorRate + 1; i++) {
    //     var item = dnaString[Math.floor(Math.random() * dnaString.length)];
    //     console.log(item);
    //     let itemIndex = dnaString.indexOf(item);
    //     if (itemIndex > -1) {
    //         dnaString.slice(itemIndex, 1);
    //     }
    //     console.log(itemIndex);
    //     dnaString[itemIndex] = "";
    //     console.log(item);
    // }
    // console.log(dnaString);
    errorCorrection(dnaString);
}

function errorCorrection(dnaString) {
    //fill in gaps  
    dnaToBinary(dnaString);
}

function dnaToBinary(dnaString) {
    //remove primers    
    let convertedOutput = [];
    let final = [];

    for (let i = 0; i < dnaString.length; i++) {
        if (dnaString[i] == "A") {
            convertedOutput.push("00");
        }
        if (dnaString[i] == "G") {
            convertedOutput.push("10");
        }
        if (dnaString[i] == "C") {
            convertedOutput.push("01");
        }
        if (dnaString[i] == "T") {
            convertedOutput.push("11");
        }
    }
    console.log(convertedOutput);
    let conv = convertedOutput.join("");

    let temp = [];
    var i = 0;
    var n = convertedOutput.length;
    console.log(n);

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    console.log(temp);
    temp = temp.join(" ");
    console.log(temp);
    binaryToText(temp);
}


function binaryToText(str) {
    console.log(str);
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    console.log(binString);
    return binString;
}
//console.log(input);


