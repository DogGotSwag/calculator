let operations = {
    '+' : (a,b) => a+b,
    '-' : (a,b) => a-b,
    '*' : (a,b) => a*b,
    '/' : (a,b) => a/b,
}

function operate( a, op , b){
    return operations[op](a,b);
}

let dot = document.querySelector( ".dot" );

function enableDot(){
    dot.disabled = false;
}

function disableDot(){
    dot.disabled = true;
}



let numOne = undefined;
let currOp = '';
let numTwo = undefined;
let dotBeingUsed = false;
let decemicals = "";



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

    console.log( 'one: '+numOne+", op: "+currOp+", two: "+numTwo);
    console.log(dotBeingUsed);
    console.log(decemicals);

    let target = event.target.classList[1];
    let type = event.target.classList[0];

    if( numOne && numTwo && currOp.length > 0 && type == "op"){
        numOne = operate( +numOne,currOp, +numTwo);
        setDisplay( numOne+""+target );
        currOp = target;
        numTwo = undefined;
    }
    else if( !numOne && type == 'number'){
        if( dotBeingUsed ){
            decemicals += target;
            setDisplay(currDisplay+target);
            numOne = ".";
        }else{
            numOne = target
            setDisplay(target);
        }
        
    }
    else if( numOne  && currOp == "" && type == 'number'){
        if( dotBeingUsed ){
            if( !numOne.includes('.')) numOne += '.';
            decemicals += target;
            
            console.log("dec: "+decemicals);
            console.log("numOne: "+numOne);
        }
        else{
            numOne+= target;
        }
        
        setDisplay( currDisplay += target);
    }
    else if( numOne && type == 'op'){
        if( dotBeingUsed){
            numOne = numOne+decemicals;
            dotBeingUsed = false;
            enableDot();
            decemicals = '';
        }
        
        setDisplay( currDisplay += target)
        currOp = target;
        
    }
    else if( numOne && (currOp.length>0) && type == 'number'){
        if(dotBeingUsed){
            if( !numTwo ){
                decemicals += target;
                numTwo = ".";
            }
            else{
                if( !numTwo.includes('.')) numTwo += '.';
                decemicals += target;
            }
        }
        else{
            if( !numTwo) numTwo = target;
            else numTwo += target;
        }
        

        
        
        setDisplay( currDisplay += target);
    }
    
    else if( type == "equals"){
        let result;
        if( dotBeingUsed){
            numTwo = numTwo+decemicals;
            dotBeingUsed = false;
            enableDot();
            decemicals = '';
        }
        dotBeingUsed = false;


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
        decemicals = '';

        pastOp = '';
        pastNumTwo = undefined;
        enableDot();
        dotBeingUsed = false;

    }
    else if( type == 'dot' ){
        disableDot();
        setDisplay( currDisplay+target);
        dotBeingUsed = true;
        
    }
});
