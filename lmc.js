

var calculator = 0;
var counter = 0;
var content = "";
var outputL = [];
var flag = true; // Para que se detenga con los inputs.

const ADD = "1";
const SUB = "2";
const STO = "3";
const LOAD = "5";
const BR = "6";
const BZ = "7";
const BP = "8";
const HALT = "000";

// Continuous run
function run(){

    // Load mailboxes into program
    var program = document.getElementById("inpts");
    var content = "";

    do{
        // Print state
        console.log("--- Calculator: " + calculator + " : Counter: " + counter);
        document.getElementById("counterBox").value = counter;
        document.getElementById("calculatorBox").value = calculator;

        // Fetch instruction
        content = String(program[counter].value);
        console.log("Content: " + content);

        // Excecute instruction
        if(flag){
            excecute(content, program);
        }else{
            flag = true;
            break;
        }
        

    }while(content != HALT);

    document.getElementById("message").innerHTML = "End of program.";
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
        
    }else{
        // disable button
        document.getElementById("stepBtn").disabled = true;
        document.getElementById("message").innerHTML = "End of program.";
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

    // Set message
    document.getElementById("message").innerHTML = "Interruption activated. Counter: " + String(counter);
    
}

// Used to load the state after an interruption
function interruptLOAD(program){
    // Load counter value
    counter = program[98].value;

    // Load calculator value
    calculator = program[99].value;

    // errase mailboxes 98, 99
    program[98].value = program[99].value = "";
}

// Reset values
function reset(){
    calculator = 0;
    counter = 0;
    document.getElementById("counterBox").value = counter;
    document.getElementById("calculatorBox").value = calculator;
    $("input").remove("outputBox");
    $("#stepBtn").prop("disabled", false);
}

// Excecute
function excecute(content, program){

    // Clear message box
    document.getElementById("message").innerHTML = "";

    // Content -> instruction/direction
    var instruction = content.charAt(0);
    var direction = parseInt(content.substring(1,3));

    console.log("+++ instruction: " + instruction + " : direction: " + direction);

    switch(instruction){
        case ADD:
            console.log("Inside ADD...");
            document.getElementById("message").innerHTML = "ADD instruction activated.";
            calculator += parseInt(program[direction].value);
            break;

        case SUB:
            console.log("Inside SUB...");
            document.getElementById("message").innerHTML = "SUB instruction activated.";
            calculator -= parseInt(program[direction].value);
            break;
        
        case STO:
            console.log("Inside STO...");
            document.getElementById("message").innerHTML = "STO instruction activated.";
            program[direction].value = calculator;
            break;
        
        case LOAD:
            console.log("Inside LOAD...");
            document.getElementById("message").innerHTML = "LOAD instruction activated.";
            calculator = parseInt(program[direction].value);
            console.log("LOAD -> Calculator: " + calculator);
            break;

        case BR:
            console.log("Inside BR...");
            counter = direction - 1;
            document.getElementById("message").innerHTML = "BR instruction activated. Branching into " + String(counter+1);
            break;

        case BZ:
            console.log("Inside BZ...");
            counter = (calculator == 0) ? direction - 1 : counter;
            document.getElementById("message").innerHTML = "BZero instruction activated.";
            break;

        case BP:
            console.log("Inside BP...");
            counter = (calculator >= 0) ? direction - 1 : counter;
            document.getElementById("message").innerHTML = "BPositive instruction activated.";
            break;

        case "9":
            if(direction == "01"){
                // input
                var val = document.getElementById("inputBox").value;
                console.log("Input: " + val);
                if(val === ""){
                    console.log("Input box empty...");
                    document.getElementById("message").innerHTML = "Input box empty. Please enter something into the input box.";
                    flag = false;
                    return;
                }else{
                    calculator = parseInt(val);
                    document.getElementById("inputBox").value = "";
                }
            }else if (direction == "02"){
                // output
                ouputGrow();
            }else if(direction == "99"){
                // RET: Interrupt load
                interruptLOAD(program);
                document.getElementById("message").innerHTML = "Interruption ended.";
                console.log("Fin de interrupt!");
            }
            break;

        default:
            break;
        

    }

    // Increment counter
    counter++;
}



