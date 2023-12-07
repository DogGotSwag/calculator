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