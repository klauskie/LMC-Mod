

var calculator = 0;
var counter = 0;
var content = "";
var outputL = [];

const ADD = "1";
const SUB = "2";
const STO = "3";
const LOAD = "5";
const BR = "6";
const BZ = "7";
const BP = "8";
const HALT = "000";
const RET = "999"

const INPUT = "901";
const OUTPUT = "902";

// Continuous run
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

// Step by step run
function runStep(){

    if (counter == 0){
        calculator = 0;
        content = "";
    }

    
    var program = document.getElementById("inpts");
    
    var valCheck = document.getElementById("chbox").checked;
    

    // Interrupt
    if(valCheck){ // first time
        console.log("Interrupt!");
        var ncounter = parseInt(document.getElementById("mbox").value);
        interruptSTO(program, ncounter);
        document.getElementById("chbox").checked = false;
        calculator = 0;
        content = "";
    }
    

    // Print state
    console.log("--- Calculator: " + calculator + " : Counter: " + counter);
    document.getElementById("counterBox").value = counter;
    document.getElementById("calculatorBox").value = calculator;

    // Fetch instruction
    content = String(program[counter].value);
    console.log(content);

    if(content != HALT){
        // Excecute instruction
        excecute(content, program);
        counter++;
    }else{
        // disable button
        document.getElementById("stepBtn").disabled = true;
    }

}

// Used to store the state before an interruption
function interruptSTO(program, ncounter){
    // Store counter value
    program[98].value = counter;

    // Store calculator value
    program[99].value = calculator;

    // Set new counter
    counter = ncounter;
    
}

// Used to load the state after an interruption
function interruptLOAD(program){
    // Load counter value
    counter = program[98].value;

    // Load calculator value
    calculator = program[99].value;

    // errase mailboxes 98, 99
    program[98].value = program[99].value = 0;
}

// Excecute
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
                if(val === null){
                    console.log("Input box empty...");
                }
                calculator = parseInt(val);
            }else if (direction == "02"){
                // output
                outputL.push(calculator);
                document.getElementById("outputBox").value = outputL;
                console.log(outputL);
            }else if(direction == "99"){
                // RET: Interrupt load
                interruptLOAD(program);
                console.log("Fin de interrupt!");
            }
            break;
        

    }
    
}



