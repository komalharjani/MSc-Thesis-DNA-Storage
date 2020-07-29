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
    return output.join("");
}

function binaryToDNA(binOutput) {
    console.log(binOutput.length);
    let dnaArray = [];
    var twoBitsArray = []; //Array to hold binary elements, each element containing 2 bits
    var i = 0;
    var n = binOutput.length;

   // dnaArray.push("AAAAA");

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
    console.log(dnaArray);
    // var str = dnaArray.join(""); //using this currently to decode
    let stringed = dnaArray.join("");
    let primer = "AAAAA";
    let dnaString = primer + stringed + primer;
    // console.log(dnaString);
    //console.log(stringed.length);
    errorSimulator(dnaString);
}

function errorSimulator(dnaString) { //does this have to deal with a string?
    let dnaArr = [];
    let errorRate = Math.round(dnaString.length * noErrors / 100); //error rate user input
    dnaArray = dnaString.split("");
    for (let i = 0; i < errorRate + 1; i++) { //for error rate
        var item = dnaArray[Math.floor(Math.random() * dnaArray.length)]; //generate random index to be deleted
        console.log(item); 
        let itemIndex = dnaArray.indexOf(item);
        console.log(itemIndex);
        console.log(dnaArray);
        dnaArray.splice(itemIndex, 1); //remove element from string here
    }
    console.log(dnaArray);
    errorCorrection(dnaArray);
}

function errorCorrection(dnaString) {
    //fill in gaps  
    dnaToBinary(dnaString);
}

function dnaToBinary(dnaString) {
    console.log(dnaString);
    let convertedOutput = [];

    for (let i = 0; i < dnaString.length; i++) {
        if (dnaString[i] == "A") {
            convertedOutput.push("00");
        }
        if (dnaString[i] == "G") {
            convertedOutput.push("01");
        }
        if (dnaString[i] == "C") {
            convertedOutput.push("10");
        }
        if (dnaString[i] == "T") {
            convertedOutput.push("11");
        }
    }
   console.log(convertedOutput);
  // convertedOutput.splice(0, 5); //remove primer from beginning
  // convertedOutput.splice(-5, 5); //remove primer from end
    let conv = convertedOutput.join("");
    console.log(conv);

    let temp = [];
    var i = 0;
    var n = conv.length;

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    console.log(temp);
    temp = temp.join(" ");
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


