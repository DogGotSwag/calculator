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

function deletePast(){
    pastOp = '';
    pastNumTwo = undefined;
}
function clearAll(){
        numOne = undefined;
        numTwo = undefined;
        currOp = "";
        deletePast();
        enableDot();
}

function displayBackSpace(){
    currDisplay = currDisplay.slice( 0, currDisplay.length-1 );
    setDisplay( currDisplay );
}

function backSpaceWasPressed(){
    if( numOne.length > 0 && currOp == ''){
        if( numOne.length == 1){
            numOne = undefined;
            setDisplay('');
        }
        else{
            numOne = numOne.slice(0, numOne.length-1);
            displayBackSpace();
        }
    }
    else if( currOp != '' && !numTwo){
        currOp = '';
        displayBackSpace();
    }
    else if( currOp != '' && numTwo.length > 0){

        if( numTwo.length == 1){
            numTwo = undefined;
            displayBackSpace();
        }
        else{
            numTwo = numTwo.slice(0, numTwo.length-1);
            displayBackSpace();
        }
    }
}

function dotWasPressed(){
    disableDot();
    setDisplay( currDisplay+'.');
    if( !numOne ) numOne = '.';
    else if( numOne  && currOp == "" ) numOne += '.';
    else if(numOne && (currOp.length>0) ){
        (!numTwo) ? numTwo = '.' : numTwo += '.'; 
    }
}

function equalsWasPressed(){
    let result;
        if( +numTwo == 0 && currOp == '/'){
            setDisplay("Don't do that");
            clearAll();
        }
        
        if( numOne && numTwo){
            result = operate( +numOne,currOp,+numTwo);
            result = +result.toFixed(5);
            numOne = result.toString();

            pastNumTwo = numTwo;
            numTwo = undefined;

            pastOp = currOp;
            currOp = "";
            setDisplay(result.toString());
        }
        else if(numOne.length > 0 && !numTwo && pastNumTwo){
            result = operate( +numOne,pastOp,+pastNumTwo);
            result = +result.toFixed(2);
            numOne = result.toString();
            numTwo = undefined;
            setDisplay(result.toString());
        }
}

function seaWasPressed(){
    clearAll();
    setDisplay("");
}

function opWasPressed( target ){
    if( numOne && numTwo && currOp.length > 0 ){
        numOne = operate( +numOne,currOp, +numTwo);
        setDisplay( numOne+""+target );
        currOp = target;
        numTwo = undefined;
    }
    else if( numOne){
        if( currOp.length > 0){
            currOp = target;
            displayBackSpace();
            setDisplay(currDisplay += target);
        }
        else{
            deletePast();
            enableDot();
            setDisplay( currDisplay += target)
            currOp = target;
        }
        
        
    }
}
function numWasPressed( target ){
    if( !numOne ){
        numOne = target
        setDisplay(target);
    }
    else if( numOne  && currOp == ""){
        numOne+= target;
        setDisplay( currDisplay += target);
    }
    else if( numOne && (currOp.length>0)){
        if( !numTwo) numTwo = target;
        else numTwo += target;
        setDisplay( currDisplay += target);
    }
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

let body = document.querySelector('body');
body.addEventListener( 'keydown', (event)=>{
    let keyPressed = event.key;
    // alert(keyPressed);
    if( keyPressed == 'Backspace'){
        deletePast();
        backSpaceWasPressed();
    }
    else if( keyPressed == "."){
        dotWasPressed();
    }
    else if( keyPressed == '='){
        equalsWasPressed();
    }
    else if( keyPressed == 'c'){
        seaWasPressed();
    }
    else if( keyPressed == '+' || keyPressed == '/' 
    || keyPressed == '*' || keyPressed == '-'){
        opWasPressed( keyPressed );
    }
});

buttonBox.addEventListener('click',(event) => {

    console.log( 'one: '+numOne+"  op: "+currOp+" two: "+numTwo);
    console.log('pastOp: '+pastOp+"   pastNumTwo: "+pastNumTwo);

    let target = event.target.classList[1];
    let type = event.target.classList[0];
    if( type == 'op'){
        opWasPressed( target );
    }
    else if( type == 'number'){
        numWasPressed( target );
    }
    else if( type == "equals"){
        equalsWasPressed();
    }
    else if( type == "clear"){
        seaWasPressed();
    }
    else if( type == 'dot' ){
        dotWasPressed();
    }
    else if( type == "backSpace"){
        deletePast();
        backSpaceWasPressed();
    }
});
