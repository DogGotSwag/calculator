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


let buttonBox = document.querySelector( ".buttonsBox");


buttonBox.addEventListener('click',(event) => {
    let target = event.target.classList[1];
    let type = event.target.classList[0];
    console.log( type );
});
setDisplay("Hello");