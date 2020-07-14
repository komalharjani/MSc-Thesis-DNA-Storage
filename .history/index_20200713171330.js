function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0;i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8-bin.length+1).join("0") + bin);
    } 
    return output.join(" ");
  }
  let output = textToBin("Hello");

  console.log(output);

function binToText(str) {
        var binString = '';
        str.split(' ').map(function(bin) {
            binString += String.fromCharCode(parseInt(bin, 2));
          });
        return binString;
        }
binToText("01001000 01100101 01101100 01101100 01101111");        