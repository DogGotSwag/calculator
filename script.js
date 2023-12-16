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
    alert(event.key);
});

buttonBox.addEventListener('click',(event) => {

    console.log( 'one: '+numOne+"  op: "+currOp+" two: "+numTwo);
    console.log('pastOp: '+pastOp+"   pastNumTwo: "+pastNumTwo);

    let target = event.target.classList[1];
    let type = event.target.classList[0];

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
    else if( numOne  && currOp == "" && type == 'number'){
            numOne+= target;
            setDisplay( currDisplay += target);
    }
    else if( numOne && type == 'op'){
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
    else if( numOne && (currOp.length>0) && type == 'number'){
            if( !numTwo) numTwo = target;
            else numTwo += target;
            setDisplay( currDisplay += target);
    }
    
    else if( type == "equals"){
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
    else if( type == "clear"){
        clearAll();
        setDisplay("");

    }
    else if( type == 'dot' ){
        disableDot();
        setDisplay( currDisplay+target);

        if( !numOne ) numOne = '.';
        else if( numOne  && currOp == "" ) numOne += '.';
        else if(numOne && (currOp.length>0) ){
            (!numTwo) ? numTwo = '.' : numTwo += '.'; 
        }
        
    }
    else if( type == "backSpace"){
        deletePast();
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
});
