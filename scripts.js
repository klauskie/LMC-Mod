
//Create Mailboxes Function
const appendText =() => {
    for(i=0; i<100; i++){
       var inp = document.createElement("input");
       if(document.createElement("input"))
       inp.onkeyup = function validNegatives(){
        regexBNums(this);
       }
       inp.maxLength = '3';
       if(i < 10){
       inp.setAttribute('placeholder', '00'+i);
       }else{
           inp.setAttribute('placeholder', '0'+i);
       }
       $("#inpts").append(inp); 
    }
   }

   // Create multiple Outputs
const ouputGrow = () => {
    document.getElementById("outputBox").value = outputL;
    outputL.push(calculator); 
    var out = document.createElement("input");
    out.disabled = true
    out.style.border = '4px solid #23395e';
    out.style.borderRadius = '5px';
    $("#outputBox").after(out).value = outputL[outputL.length]; 
    out.value = outputL[outputL.length-1];
    //Delete Output Boxes
    $("#reset").click(function(){
        $(out).remove();
    });
}

// RegEx Validate Input
const regexBNums = (inp) => {

    $('input').keydown(function(){
        var self = $(this);
        var removedText = self.val().replace(/[a-z]/gi, '');
        self.val(removedText);

        if(inp.value[0] == "-"){
            inp.maxLength = 4;
        }else{
            inp.maxLength = 3;
        }
     });
} 