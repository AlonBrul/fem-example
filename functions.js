var number = 0, result = 0;
var numberQueue = [], operatorQueue = [];
var isNumberTyped = false;

const displayText = document.querySelector('.display-text');

// digit event listener
document.querySelectorAll('.digit').forEach(digit => {
    digit.addEventListener('click', event => {
        number *= 10;
        digit = parseInt(event.target.innerText);
        number += digit;
        displayNumber(number);
        isNumberTyped = true;
    });
});

function displayNumber(number) {
    displayText.textContent = "" + number;
}

//operator event listener
document.querySelectorAll('.operator').forEach(op => {
    op.addEventListener('click', event => {
        operator = event.target.innerText;
        operatorQueue.push(operator);
        if (isNumberTyped) {
            numberQueue.push(number);
            number = 0;
        }
        displayText.textContent = operator;
        isNumberTyped = false;
    });
});

//result event listener
document.querySelector('.result').addEventListener('click', event => {
    
    if (isNumberTyped) {
        numberQueue.push(number);
        number = 0;
    }

    var operator = "";
    var operand2 = 0;
    if (!isContinuousCalculation()) {
        result = numberQueue.shift();
    }

    while (!(operatorQueue.length === 0)) 
    {
        operator = operatorQueue.shift();

        if (!(numberQueue.length === 0)) { // dummy check: operator clicked without a following number (eg: 19 + =)
            operand2 = numberQueue.shift();

            result = calc(result, operator, operand2);
        }
    }

    displayNumber(result);
    isNumberTyped = false;
});

function isContinuousCalculation() { // using the result from a previous calculation
    return numberQueue.length === operatorQueue.length;
}

function calc(op1, operator, op2) {
    switch(operator) {
        case '+':
            return op1 + op2;
        case '-':
            return op1 - op2;
        case 'x':
            return op1 * op2;
        case '÷':
            return Math.floor(op1 / op2);      
        default:
            console.log('unrecognised operator'); // for debugging
    }
}

// clear event listener
document.querySelector('.clear').addEventListener('click', event => {
    reset();
});

function reset() {
    number = 0, result = 0;
    numberQueue = [];
    operatorQueue = [];
    isNumberTyped = false;
    displayNumber(0);
}

// back event listener
document.querySelector('.back').addEventListener('click', event => {
    if (isNumberTyped) {
        number = Math.floor(number/10);
        displayNumber(number);
    }
});