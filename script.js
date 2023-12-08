let operations = {
    '+' : (a,b) => a+b,
    '-' : (a,b) => a-b,
    '*' : (a,b) => a*b,
    '/' : (a,b) => a/b,
}

function operate( a, op , b){
    return operations[op](a,b);
}

let numOne = undefined;
let currOp = undefined;
let numTwo = undefined;

let display = document.querySelector(".display");

function setDisplay( string ){
    display.textContent = string;
}

setDisplay("Hello");