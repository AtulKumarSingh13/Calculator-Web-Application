let currentInput = '';
let shouldResetDisplay = false;
const display = document.getElementById('display');
const output = document.getElementById('output');
const input = document.getElementById('input');

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (value === '×') value = '*';

    currentInput += value;
    input.textContent = currentInput;
    display.classList.add('active');

    setTimeout(() => display.classList.remove('active'), 600);
}

function clearAll() {
    currentInput = '';
    output.textContent = '0';
    input.textContent = '';
    shouldResetDisplay = false;
    animateClear();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    input.textContent = currentInput || '';
}

function calculate() {
    try {
        const result = eval(currentInput.replace('×', '*'));
        output.textContent = formatResult(result);
        currentInput = result.toString();
        shouldResetDisplay = true;
        animateResult();
    } catch (error) {
        output.textContent = 'Error';
        currentInput = '';
        shouldResetDisplay = true;
        setTimeout(clearAll, 1500);
    }
}

function formatResult(result) {
    return Number(result.toPrecision(12)).toLocaleString();
}

function animateClear() {
    display.style.transform = 'scale(0.95)';
    setTimeout(() => {
        display.style.transform = '';
    }, 150);
}

function animateResult() {
    output.style.transform = 'scale(1.1)';
    output.style.textShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
    setTimeout(() => {
        output.style.transform = '';
        output.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    }, 200);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '%') {
        appendToDisplay('%');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
