let displayString = "";
let userInput = "";
const fullDisplay = document.getElementById('full-display');
const miniDisplay = document.getElementById('mini-display');

const handleValues = (value) => {
    userInput += value;
    displayString = value;

    if (isOperator(value)) {
        fullDisplay.value = "";
    } else {
        fullDisplay.value += displayString;
    }
    miniDisplay.textContent = userInput;
};

const isOperator = (value) => {
    return ['+', '-', '*', '/', '%'].includes(value);
};

const handleClear = () => {
    userInput = "";
    displayString = "";
    miniDisplay.textContent = "0";
    fullDisplay.value = displayString;
};

const handleDelete = () => {
    if (userInput.length >= 1) {
        userInput = userInput.substring(0, userInput.length - 1);
        displayString = userInput;
    } else {
        miniDisplay.textContent = '0';  
        return;
    }

    fullDisplay.value = displayString;
    miniDisplay.textContent = userInput;
};

const handleDecimal = () => {
    const hasDot = userInput.includes('.');
    if (!hasDot && displayString !== '0') {
        displayString += '.';
        userInput += '.';
        fullDisplay.value += '.';
    }
    miniDisplay.textContent = displayString;
};

const handleEqual = () => {
    try {
        displayString = evaluateExpression(userInput);
        userInput = displayString;
        miniDisplay.textContent = userInput;
        fullDisplay.value = displayString;
    } catch (err) {
        handleError(err);
    }
};

const evaluateExpression = (expression) => {
    const result = eval(expression);
    if (!isFinite(result)) {
        throw new Error("Invalid result");
    }
    return result;
};

const handleError = (err) => {
    fullDisplay.value = `ERROR: ${err.message}`;
    miniDisplay.textContent = "0";
    setTimeout(() => {
        handleClear();
    }, 1000);
};

const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
        handleEqual();
    } else if (key === "Delete") {
        handleClear();
    } else if (key === "Backspace") {
        handleDelete();
    } else if (isNumeric(key) || isOperator(key) || key === ".") {
        handleValues(key);
    }
};

const isNumeric = (value) => {
    return /^\d+$/.test(value);
};

document.body.addEventListener("keydown", handleKeyDown);