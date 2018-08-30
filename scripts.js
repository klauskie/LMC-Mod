const appendText =() => {
    for(i=0; i<100; i++){
       var inp = document.createElement("input");
       
       if(i < 10){
       inp.setAttribute('placeholder', '00'+i);
       }else{
           inp.setAttribute('placeholder', '0'+i);
       }
       $("#inpts").append(inp); 
    }
}

function printP(programa){
    console.log(programa);
}

