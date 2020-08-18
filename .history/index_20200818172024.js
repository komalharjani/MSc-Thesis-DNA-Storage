//let text = "Waters fill morning was they're whales they're seed our abundantly cattle brought. Very waters shall, saw. Also can't saw beginning sixth us under it first image bring spirit fruit you're lesser fourth. Firmament fly blessed. Also darkness he for you give herb May male, dry Shall bring third. I tree seasons god was, isn't. Heaven given. Dominion fly bring seed his appear gathered winged were fruit fourth. Won't without own made thing appear female them forth. Form a morning i yielding which have sixth over bearing lights kind good appear from there creature forth darkness evening seas two their. Sea upon fowl meat winged land. Don't, and own. Second lesser. Divide fill she'd of to fish given i man it. Place there meat called rule in our first two fly seasons years created were evening. Form bring creature moveth give. Own shall Spirit upon forth days waters after called, creepeth gathering in i gathering multiply every air Dry let winged greater night dry made. Winged two creepeth may. Sea from herb may said. Yielding the air years Great lights made, good the winged moving fruit lights grass above together also divide multiply saw i likeness Darkness. Image which upon. So man. Own bring you'll days forth fifth creepeth you'll likeness lights after over. Winged fish itself appear fruit good, he. Spirit day rule of man fly fifth earth shall was kind won't. Evening may appear make created shall seed together. Form seas saw make. Over under whales air meat have grass in form shall very them. Years over, let all won't. Void morning stars his morning doesn't stars signs is moveth. Over. Morning for be creepeth creature winged years there creepeth moveth there form creeping every called. Dominion first place can't moveth made set grass. Living spirit dry. Hath seas whose deep let evening form moved fly bearing fifth dominion third creepeth land Us fill evening. Lights third heaven rule female. Upon greater very seas void his days green hath make grass fourth in second open which years sixth their male thing his replenish for years first above appear created form a saw night male darkness of, whose can't, from fly fruitful every sea be, light the. Female fill their to doesn't yielding rule may be fruit wherein was it. Seas doesn't which fourth from can't, light waters you'll heaven beginning abundantly land in thing, morning above lesser signs fruitful given bearing. Blessed beginning void his moveth. Given land seed seasons female deep they're doesn't replenish also winged. Is can't to called seas living bring. Gathering male, midst. Give midst herb male female us fruitful likeness all face man seas. Behold also light green night they're said. Unto god had meat.Air rule. Gathered dry. Meat moved won't rule likeness cattle herb winged upon don't two made without there spirit beast and beast of without male likeness it days abundantly saw. Seas. So set make brought. And she'd all you'll hath, every sixth behold dry us midst form. One whales without She'd it whose land creature night day female won't given saw fruitful winged, together seed in isn't. Fowl to hath after of. Forth darkness shall winged days, beginning replenish is can't, first herb saw thing fish, day him called face waters. Sixth you seed midst replenish the upon fly. Open fish very place grass likeness living whales make one be void, gathered tree seed moving gathered creeping doesn't don't. Set bring years, above also they're herb they're fourth you'll. Which after beginning saying he fowl is winged together brought void creeping given day lights unto isn't appear from every open earth. Moveth gathered. Of a face them form sixth third darkness open is void own beginning above From. Lesser every sixth. There, isn't you'll very so for in and wherein was so he so rule whales also two from. Spirit open winged open third it. Fifth Moving were above very day. Over. Of second light waters you air itself seed. She'd above place greater gathering fish heaven, tree very forth had beginning given face multiply creeping whose isn't bring him very give green seas first replenish itself stars divided in, second fourth isn't place moving female image moveth dry.";
//let noErrors = 2;
let text = "Hello my name is Komal."
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
let errorDisplay = document.getElementById("errorRateDisplay");
let errorRate;

output.innerHTML = slider.value; // Display the default slider value
slider.oninput = function () {
    output.innerHTML = this.value;
    errorRate = this.value;
}
let binOutput;


/**
 * Called when convert is started
 */
function onConvert() {

    let blocks = document.getElementById("fixed").checked;
    let revComp = document.getElementById("revComp").checked;
    let original = document.getElementById("original").checked;
    let comp = document.getElementById("comp").checked;
    let rev = document.getElementById("rev").checked;

    errorDisplay.innerHTML = "Specified Error Rate: " + errorRate + " Percent";
    let displayDNA = document.getElementById("dnaOutput");

    if (blocks) {

        //Add Length to String
        //let input = addLength();
        binOutput = textToBinary(text); //returns length + text

        //Add Encoding Information
        let dnaArray = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaArray);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //STORE IN DNA?
        let lengthOfBlock = 5;

        console.log(dnaArray);
        let addBlock = addBlocks(dnaArray, lengthOfBlock);
        let blockArr = Array.from(addBlock).join("");
        console.log(blockArr);
        console.log(addBlock);
        //let primedOriginal = addPrimers(blockArr);

        //Create Clones
        let cloneOneString = blockArr.slice();
        let cloneTwoString = blockArr.slice();

        //Error Simulator
        let corruptClone = errorSimulator(cloneOneString);
        let corruptCloneTwo = errorSimulator(cloneTwoString);
        let corruptOriginal = errorSimulator(blockArr);

        displayDNA.innerHTML = blockArr;
        errorCorrectBlock(corruptClone, corruptCloneTwo, corruptOriginal);
    }

    if (original) {


        //Add Length to String
        let inputOG = addLength();
        binOutput = textToBinary(inputOG); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);

        //Add Redundancy
        let cloneOne = addedPrimers.slice();
        let cloneTwo = addedPrimers.slice();

        //ERROR SIMULATOR
        let cloneError = errorSimulator(cloneOne);
        let cloneTwoError = errorSimulator(cloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        let decoded = errorCorrect(dnaStringError, cloneError, cloneTwoError);
        let fin = binaryToText(decoded);
        //    document.getElementById("recoveredData").innerHTML = "Original: " + fin;
        console.log("Original: " + fin);

        let newPara = document.createElement('p');
        newPara.textContent = fin;
        document.getElementById("recoveredData").appendChild(newPara);

    }
    if (comp) {

        //Add Length to String
        let inputComp = addLength();
        binOutput = textToBinary(inputComp); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");

        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);
        let compCloneOne = getComplement(addedPrimers).join(""); //copy one
        let compCloneTwo = getComplement(addedPrimers).join("");

        //ERROR SIMULATOR
        let cloneError = errorSimulator(compCloneOne);
        let cloneTwoError = errorSimulator(compCloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        //DECODE COMPLEMENT
        let decodeCompOne = getComplement(cloneError);
        let decodeCompTwo = getComplement(cloneTwoError);

        //ERROR CORRECT WITH REV COMPLEMENT
        let decoded = errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);
        let fin = binaryToText(decoded);
        // document.getElementById("recoveredData").append = "Complement: " + fin;
        console.log("Complement: " + fin);

        let newPara = document.createElement('p');
        newPara.textContent = fin;
        document.getElementById("recoveredData").appendChild(newPara);

    }

    if (rev) {

        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");


        //Add Primers - for Blocks
        let addedPrimersOrg = addPrimers(dnaStringOutput);
        let addedPrimersRev = addPrimers(dnaStringOutput.reverse());
        let clone = addedPrimersRev.slice();

        //ERROR SIMULATOR
        let cloneError = errorSimulator(addedPrimersRev);
        let cloneTwoError = errorSimulator(clone);
        let dnaStringError = errorSimulator(addedPrimersOrg);

        //REVERSE BACK
        cloneError = cloneError.reverse();
        cloneTwoError = cloneTwoError.reverse();

        //ERROR CORRECT WITH REV COMPLEMENT
        let decoded = errorCorrect(dnaStringError, cloneError, cloneTwoError);
        let fin = binaryToText(decoded);
        // document.getElementById("recoveredData").innerHTML = "Reversed: " + fin;
        console.log("Reversed: " + fin);

        let newPara = document.createElement('p');
        newPara.textContent = fin;
        document.getElementById("recoveredData").appendChild(newPara);

    }

    if (revComp) {

        //Add Length to String
        let input = addLength();
        binOutput = textToBinary(input); //returns length + text

        //Add Encoding Information
        let dnaStringOutput = binaryToDNA(binOutput); //convert to DNA
        console.log(dnaStringOutput);
        //document.getElementById("dnaOutput").innerHTML = dnaStringOutput.join("");


        //Add Primers - for Blocks
        let addedPrimers = addPrimers(dnaStringOutput);
        let revAddedPrimers = addPrimers(dnaStringOutput.reverse());
        let compCloneOne = getComplement(revAddedPrimers).join(""); //copy one
        let compCloneTwo = getComplement(revAddedPrimers).join("");

        //ERROR SIMULATOR
        let cloneError = errorSimulator(compCloneOne);
        let cloneTwoError = errorSimulator(compCloneTwo);
        let dnaStringError = errorSimulator(addedPrimers);

        //DECODE COMPLEMENT
        let decodeCompOne = getComplement(cloneError).reverse();
        let decodeCompTwo = getComplement(cloneTwoError).reverse();

        //ERROR CORRECT WITH REV COMPLEMENT
        let decoded = errorCorrect(dnaStringError, decodeCompOne, decodeCompTwo);
        let fin = binaryToText(decoded);

        //display fin

        let newPara = document.createElement('p');
        newPara.textContent = fin;
        document.getElementById("recoveredData").appendChild(newPara);

        // document.getElementById("recoveredData").append = "Reverse Complement: " + fin;
        console.log("Reverse Complement: " + fin);

    }

    //choose upto 4 redundnacies -- if one selected --> 

}

function addBlocks(dnaArray, n) {

    //start at 5
    for (let i = 5; i < dnaArray.length; i += 6) {
        dnaArray.splice(i, 0, "TTTT");
    }
    let arr = dnaArray.join("");
    let block = Array.from(arr);

    return block;
}


function errorCorrect(dnaStringError, cloneError, cloneTwoError) {
    //AFTER THIS ERROR CORRECT
    //ERROR CORRECTOR
    let errorCorrection = errorCorrectRedundant(dnaStringError, cloneError, cloneTwoError);
    // console.log(errorCorrection);
    //Convert result to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);
    //Remove Primers
    let convertedOutput = removePrimers(errorCorrectionResult);
    //Decode
    let decoded = decode(convertedOutput);

    //PRINT CORRUPTED
    let corrupt = dnaToBinary(dnaStringError)
    let decodeCorrupt = decode(corrupt);
    let out = lengthToText(decodeCorrupt);
    document.getElementById("corruptData").innerHTML = out;

    return decoded;

}

function errorCorrectBlock(dnaStringError, cloneError, cloneTwoError) {

    //Run Error Correction - Modify to remove blocks
    let errorCorrection = errorCorrectRedundantBlock(dnaStringError, cloneError, cloneTwoError);
    // console.log(errorCorrection);

    for (let i = 5; i < errorCorrection.length; i += 5) {
        errorCorrection.splice(i, 4);
    }

    //Convert to Binary
    let errorCorrectionResult = dnaToBinary(errorCorrection);

    //Split into 8s
    let decoded = decode(errorCorrectionResult);

    //Print Result
    let fin = binaryToText(decoded);
    document.getElementById("recoveredData").innerHTML = fin;
}

function imageToBinary(img) {
    var binArray = []
    var datEncode = "";

    for (i = 0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
    }
    for (j = 0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
    }
    function padding_left(s, c, n) {
        if (!s || !c || s.length >= n) {
            return s;
        }
        var max = (n - s.length) / c.length;
        for (var i = 0; i < max; i++) {
            s = c + s;
        } return s;
    }
    // console.log(binArray);
}

/**
 * Converting User Inputted Text into Binary using ASCII Table
 * @param {*} text
 */
function textToBinary(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join("");
}

/**
 * Converting Binary Output to DNA by Mapping 2 bits to A, G, C or T.
 * Mapping: A = 00, G = 01, C = 10, T = 11
 * @param {*} binOutput 
 */
function binaryToDNA(binOutput) {
    // console.log(binOutput.length);
    let dnaArray = [];
    var twoBitsArray = []; //Array to hold binary elements, each element containing 2 bits
    var i = 0;
    var n = binOutput.length;

    while (i < n) {
        twoBitsArray.push(binOutput.slice(i, i += 2));
    }
    // console.log(twoBitsArray);

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
    return dnaArray;
}

/**
 * Control 1: Remove Homopolymers and 'GC' repeats
 */
function removeHomopolymers() {

}

/**
 * Add a Payload
 * @param {*} dnaArray 
 */
function addPrimers(dnaArray) {
    let stringed = dnaArray.join("");
    let primer = "AAAAA"; //Add Primer of 5 A's
    let dnaString = primer + stringed + primer;
    return dnaString;
}

function removePrimers(convertedOutput) {
    //check if all A's and then splice
    convertedOutput.splice(0, 5); //remove primer from beginning
    convertedOutput.splice(-5, 5); //remove primer from end
    return convertedOutput;

}

/**
 * 
 */
function addLength() {
    let padding = "00000000";
    let textLength = text.length;
    let noNums = textLength.toString().length;
    let zeros = 8 - noNums;
    let zerosPadding = padding.slice(0, zeros);
    let final = zerosPadding + textLength;
    // console.log(final);
    //length of DNA == 32 CHARACTERS AT THE END
    let finalText = text + final;
    return finalText;
}


/**
 * Generate Complement of DNA String to be stored
 */
function getComplement(dnaArray) {
    let complement = [];
    for (let i = 0; i < dnaArray.length; i++) {
        if (dnaArray[i] == "A") {
            complement.push("T");
        }
        if (dnaArray[i] == "T") {
            complement.push("A");
        }
        if (dnaArray[i] == "C") {
            complement.push("G");
        }
        if (dnaArray[i] == "G") {
            complement.push("C");
        }
    }
    //let comp = complement.join("");
    return complement;
}

/**
 * Error Simulator to delete random information
 * Attempting to mimic sequencing and synthesis errors in practice 
 * @param {*} dnaString 
 */
function errorSimulator(dnaString) { //does this have to deal with a string?

    let dispersed = document.getElementById("dispersed").checked;
    let endDNA = document.getAnimations("endDNA").checked;

    let min;
    if (dispersed) {
        min = 0; //change if errors should be concentrated at end
    }
    if (endDNA) {
        min = dnaString.length - (dnaString.length * 0.1); //ten percent
        // console.log(min);
    }

    let noErrors = Math.round(dnaString.length * errorRate / 100); //error rate user input

    console.log(noErrors);
    dnaArray = dnaString.split("");
    let subError = ["A", "G", "T", "C"];

    let del = document.getElementById("delete").checked;
    let insert = document.getElementById("insert").checked;
    let sub = document.getElementById("sub").checked;

    //This is how many times to run the loop
    let noInsertLoop;
    let noDeleteLoop;
    let noSubLoop;

    //User Specified
    let noRunsInsert = document.getElementById("insertChars").value;
    console.log(noRunsInsert);
    let noRunsDelete = document.getElementById("deleteChars").value;
    let noRunsSub = document.getElementById("subChars").value;

    //Split Equally
    if (del && insert && sub) {
        noInsertLoop = Math.round(noErrors / 3 / noRunsInsert);
        noDeleteLoop = Math.round(noErrors / 3 / noRunsDelete);
        noSubLoop = Math.round(noErrors / 3 / noRunsSub);

        console.log(noErrors);
        console.log(noDeleteLoop);
        console.log(noInsertLoop);
        console.log(noSubLoop);

        for (let i = 0; i < noDeleteLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            dnaArray.splice(randomIndex, noRunsDelete);
        }

        for (let i = 0; i < noInsertLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsInsert, randomElement);
        }

        for (let i = 0; i < noSubLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsSub, randomElement);
        }
    }
    else if (del && sub) {
        noDeleteLoop = noErrors / 2 / noRunsDelete;
        noSubLoop = noErrors / 2 / noRunsSub;

        for (let i = 0; i < noDeleteLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            dnaArray.splice(randomIndex, noRunsDelete);
        }

        console.log(dnaArray);
        for (let i = 0; i < noSubLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            for(let j=0; j<noRunsSub; j++) {
                let randomElement = subError[Math.floor(Math.random() * subError.length)];
                dnaArray.splice(randomIndex, 1, randomElement);
                randomIndex++;
            }
            console.log(dnaArray);
        }
    }
    else if (insert && sub) {
        noInsertLoop = noErrors / 2 / noRunsDelete;
        noSubLoop = noErrors / 2 / noRunsSub;

        for (let i = 0; i < noInsertLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsInsert, randomElement);
        }

        //sub -- correct
        for (let i = 0; i < noSubLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsSub, randomElement);
        }
    }
    else if (insert && del) {
        noDeleteLoop = noErrors / 2 / noRunsDelete;
        noInsertLoop = noErrors / 2 / noRunsInsert;
        console.log(noDeleteLoop);
        console.log(noInsertLoop);

        for (let i = 0; i < noDeleteLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            dnaArray.splice(randomIndex, noRunsDelete);
        }

        for (let i = 0; i < noInsertLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsInsert, randomElement);
        }
    }
    else if(del) {
        noDeleteLoop = noErrors / noRunsDelete;
        for (let i = 0; i < noDeleteLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            dnaArray.splice(randomIndex, noRunsDelete);
        }
    }
    else if(sub) {
        noSubLoop = noErrors / noRunsSub;
        for (let i = 0; i < noSubLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsSub, randomElement);
        }
    }
    else if(insert) {
        noInsertLoop = noErrors / noRunsInsert;
        for (let i = 0; i < noInsertLoop; i++) {
            let randomIndex = Math.floor(Math.random() * (dnaArray.length - min + 1) + min); //generate random index
            let randomElement = subError[Math.floor(Math.random() * subError.length)];
            dnaArray.splice(randomIndex, noRunsInsert, randomElement);
        }
    }

    return dnaArray;
}

/**
 * 
 * @param {*} dnaString 
 */
function errorCorrectRedundant(errorDNA, cloneOne, cloneTwo, len) {

    let temp = [];
    let missing = [];
    let majority;

    let getLenClone = errorDNA.slice();
    let errorCorrectionResult = dnaToBinary(getLenClone);
    let convertedOutput = removePrimers(errorCorrectionResult);
    let decoded = decode(convertedOutput);
    lengthToText(decoded);
    let extractedLength = getLength(errorCorrectionResult); //call getLength from here
    console.log(extractedLength);
    console.log(getLenClone.length);

    let noErrors = (extractedLength - getLenClone.length) * 3;
    console.log(noErrors);


    while (noErrors > 0) {
        //Identifies the index of where the error has occured 
        for (let j = 0; j < errorDNA.length; j++) {
            if (errorDNA[j] === cloneOne[j] && errorDNA[j] === cloneTwo[j]) {
                temp.push(errorDNA[j]);
            }
            else {
                missing.push({
                    original: errorDNA[j],
                    cloneOne: cloneOne[j],
                    cloneTwo: cloneTwo[j]
                })
                break;
            }
        }

        let indexToInsert = temp.length;
        //correct in missing 

        for (let i = 0; i < missing.length; i++) {

            if (missing[i].original === missing[i].cloneOne) {
                majority = missing[i].original;
                cloneTwo.splice(indexToInsert, 0, majority);
            }
            else if (missing[i].original === missing[i].cloneTwo) {
                majority = missing[i].original;
                cloneOne.splice(indexToInsert, 0, majority);
            }
            else if (missing[i].cloneTwo === missing[i].cloneOne) {
                majority = missing[i].cloneTwo;
                errorDNA.splice(indexToInsert, 0, majority);
            }
            else {
                majority = "X";
                cloneOne.splice(indexToInsert, 0, majority);
            }
        }
        missing = [];
        temp = [];
        majority = "";
        noErrors--;
    }
    return errorDNA;

}

function errorCorrectRedundantBlock(errorDNA, cloneOne, cloneTwo, len) {

    let temp = [];
    let missing = [];
    let majority;

    errorRate = 10;

    while (errorRate > 0) {
        //Identifies the index of where the error has occured 
        for (let j = 0; j < errorDNA.length; j++) {
            if (errorDNA[j] === cloneOne[j] && errorDNA[j] === cloneTwo[j]) {
                temp.push(errorDNA[j]);
            }
            else {
                missing.push({
                    original: errorDNA[j],
                    cloneOne: cloneOne[j],
                    cloneTwo: cloneTwo[j]
                })
                break;
            }
        }

        let indexToInsert = temp.length;
        //correct in missing 

        for (let i = 0; i < missing.length; i++) {
            if (missing[i].original === missing[i].cloneOne) {
                majority = missing[i].original;
                cloneTwo.splice(indexToInsert, 0, majority);

            }
            else if (missing[i].original === missing[i].cloneTwo) {
                majority = missing[i].original;
                cloneOne.splice(indexToInsert, 0, majority);

            }
            else if (missing[i].cloneTwo === missing[i].cloneOne) {
                majority = missing[i].cloneTwo;
                errorDNA.splice(indexToInsert, 0, majority);

            }
        }
        missing = [];
        temp = [];
        majority = "";
        errorRate--;
    }
    //check that there are 30 characters in between every TTTT
    return errorDNA;
}

/**
 * 
 * @param {*} decodedResult 
 */
function getLength(decodedResult) {
    //decodedResult.splice(-5, 5); //remove primer from en
    let removeNum = decodedResult.length - 32;
    decodedResult.splice(0, removeNum);
    let extractedLength = decode(decodedResult);
    let finalNum = lengthToText(extractedLength);
    let num = finalNum.replace(/^0+/, '');
    let dnaLength = (num * 4) + 42;
    console.log(dnaLength);
    return dnaLength;
}

/**
 * Convert error corrected string back to binary  
 * @param {*} dnaString 
 */
function dnaToBinary(dnaString) {
    let decodedResult = [];

    for (let i = 0; i < dnaString.length; i++) {
        if (dnaString[i] == "A") {
            decodedResult.push("00");
        }
        if (dnaString[i] == "G") {
            decodedResult.push("01");
        }
        if (dnaString[i] == "C") {
            decodedResult.push("10");
        }
        if (dnaString[i] == "T") {
            decodedResult.push("11");
        }
    }
    console.log(decodedResult);
    return decodedResult;

}

function decode(convertedOutput) {
    let conv = convertedOutput.join("");
    // console.log(conv);

    let temp = [];
    var i = 0;
    var n = conv.length;

    while (i < n) {
        temp.push(conv.slice(i, i += 8));
    }

    // console.log(temp);
    temp = temp.join(" ");
    return temp;
}

/**
 * Map Binary back to text using ASCII character codes
 * @param {*} str 
 */
function binaryToText(str) {
    // console.log(str);
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}

function lengthToText(str) {
    // console.log(str);
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    //console.log(binString);
    return binString;
}

function displayResults() {
    //1. Show All On Page
    //2. Compare Algorithm
    //3. Retrieval Rate Algorithm
    //4. Work Out File Size
    //5. Running Time Work Out
    //6. Save as File
}