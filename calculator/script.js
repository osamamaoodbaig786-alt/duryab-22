let currentInput = '0';
let previousInput = '';
let activeOperator = null;
let shouldResetDisplay = false;

const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-display');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    if (activeOperator) {
        previousDisplay.innerText = `${previousInput} ${getOperatorSymbol(activeOperator)}`;
    } else {
        previousDisplay.innerText = '';
    }
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function appendNumber(num) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (num === '.' && currentInput.includes('.')) return; // Stop multiple decimals
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (activeOperator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    activeOperator = operator;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearScreen() {
    currentInput = '0';
    previousInput = '';
    activeOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay || currentInput === '0') return;
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    if (activeOperator === null || shouldResetDisplay) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (activeOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = "Error"; // Avoid division by zero crash
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    // Smoothly round long decimals
    if (typeof result === 'number' && result.toString().includes('.')) {
        result = Math.round(result * 100000) / 100000;
    }

    currentInput = result.toString();
    activeOperator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}