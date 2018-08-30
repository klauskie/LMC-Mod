

var calculator = 0;
var counter = 0;
var content = "";

const ADD = "1";
const SUB = "2";
const STO = "3";
const LOAD = "5";
const BR = "6";
const BZ = "7";
const BP = "8";
const HALT = "000";

const INPUT = "901";
const OUTPUT = "902";

function run(){

    calculator = 0;
    counter = 0;

    var program = document.getElementById("inpts");

    var content = "";

    do{
        // Print state
        console.log("--- Calculator: " + calculator + " : Counter: " + counter);
        document.getElementById("counterBox").value = counter;
        document.getElementById("calculatorBox").value = calculator;

        // Fetch instruction
        content = String(program[counter].value);
        console.log(content);

        // Excecute instruction
        excecute(content, program)

        // Increment counter
        counter++;

    }while(content != HALT);
}

function runStep(){

    if (counter == 0){
        calculator = 0;
        content = "";
    }
    
    var program = document.getElementById("inpts");

    // Print state
    console.log("--- Calculator: " + calculator + " : Counter: " + counter);
    document.getElementById("counterBox").value = counter;
    document.getElementById("calculatorBox").value = calculator;

    // Fetch instruction
    content = String(program[counter].value);
    console.log(content);

    if(content != HALT){
        // Excecute instruction
        excecute(content, program)
        counter++;
    }else{
        // disable button
        document.getElementById("stepBtn").disabled = true;
    }

}

function excecute(content, program){

    var instruction = content.charAt(0);
    var direction = parseInt(content.substring(1,3));

    console.log("+++ instruction: " + instruction + " : direction: " + direction);

    switch(instruction){
        case ADD:
            console.log("Inside ADD...");
            calculator += parseInt(program[direction].value);
            break;

        case SUB:
            console.log("Inside SUB...");
            calculator -= parseInt(program[direction].value);
            break;
        
        case STO:
            console.log("Inside STO...");
            program[direction].value = calculator;
            break;
        
        case LOAD:
            console.log("Inside LOAD...");
            calculator = parseInt(program[direction].value);
            console.log("LOAD -> Calculator: " + calculator);
            break;

        case BR:
            console.log("Inside BR...");
            counter = direction - 1;
            break;

        case BZ:
            console.log("Inside BZ...");
            counter = (calculator == 0) ? direction : counter;
            counter--;
            break;

        case BP:
            console.log("Inside BP...");
            counter = (calculator >= 0) ? direction : counter;
            counter--;
            break;

        case "9":
            if(direction == "01"){
                // input
                var val = document.getElementById("inputBox").value;
                calculator = parseInt(val);
            }else if (direction == "02"){
                // output
                document.getElementById("outputBox").value = calculator;
                console.log(calculator);
            }else{
                // error en 900
            }
            break;
        
        default:
            // error
            break;

    }
    
}



