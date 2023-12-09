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
let currOp = '';
let numTwo = undefined;

let currDisplay = "";

let pastOp = '';
let pastNumTwo = undefined;

let display = document.querySelector(".display");

function setDisplay( string ){
    display.textContent = string;
    currDisplay = string;
}


let buttonBox = document.querySelector( ".buttonsBox");


buttonBox.addEventListener('click',(event) => {
    let target = event.target.classList[1];
    let type = event.target.classList[0];

    console.log(numOne);
    console.log(numTwo);
    console.log(currOp);

    
    if( numOne && numTwo && currOp.length > 0 && type == "op"){
        numOne = operate( +numOne,currOp, +numTwo);
        setDisplay( numOne+""+target );
        currOp = target;
        numTwo = undefined;
    }
    else if( !numOne && type == 'number'){
        numOne = target
        setDisplay(target);
    }
    else if( numOne && currOp == "" && type == 'number'){
        numOne+= target;
        setDisplay( currDisplay += target);
    }
    else if( numOne && type == 'op'){
        currOp = target;
        setDisplay( currDisplay += target)
    }
    else if( numOne && (currOp.length>0) && type == 'number'){
        if( !numTwo) numTwo = target;
        else numTwo += target;
        
        setDisplay( currDisplay += target);
    }
    
    else if( type == "equals"){
        let result;
        if( numOne && numTwo){
            result = operate( +numOne,currOp,+numTwo);
            result = +result.toFixed(5);
            numOne = result;

            pastNumTwo = numTwo;
            numTwo = undefined;

            pastOp = currOp;
            currOp = "";
            setDisplay(result);
        }
        else if(numOne && !numTwo){
            result = operate( +numOne,pastOp,+pastNumTwo);
            result = +result.toFixed(2);
            numOne = result;
            numTwo = undefined;
            setDisplay(result);
        }
        
    }
    else if( type == "clear"){
        setDisplay("");
        numOne = undefined;
        numTwo = undefined;
        currOp = "";

        pastOp = '';
        pastNumTwo = undefined;
    }
});
