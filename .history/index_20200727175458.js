textToBinary();
function textToBinary() {
    // let text = document.getElementById("textToConvert").value;
    let text = "An old silent pond...A frog jumps into the pond, splash! Silence again.";

    console.log(text);
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    output.join(" ");
    console.log(output);
    var split = [],
        i = 0,
        n = output.length;

    while (i < n) {
        split.push(output.slice(i, i += 2));
        
    }
    console.log(split);
    mapDNA(output);
}

// console.log(binaryOutput);
// console.log(binaryOutput.length);
let dnaArray = [];

function mapDNA(binOutput) {
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
    let primer = "AAAAAA";
    let dnaString = primer + stringed + primer;
    console.log(dnaString);
    console.log(stringed.length);
    errorSimulator(dnaString);
}