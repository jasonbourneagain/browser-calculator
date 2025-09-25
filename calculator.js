// Touch feedback for mobile: add/remove .touch-active on touch events
document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('touchstart', function(e) {
    btn.classList.add('touch-active');
  });
  btn.addEventListener('touchend', function(e) {
    btn.classList.remove('touch-active');
  });
  btn.addEventListener('touchcancel', function(e) {
    btn.classList.remove('touch-active');
  });
});

// functions for basic math ops
function add(a,b) {
  return (parseFloat(a) + parseFloat(b)).toString();
};

function subtract(a,b) {
  return (parseFloat(a) - parseFloat(b)).toString();
};

function multiply(a,b) {
  return (parseFloat(a) * parseFloat(b)).toString();
};

function divide(a,b) {
    if(b === '0') {
        return;
    }
    return (parseFloat(a) / parseFloat(b)).toString();
}

const clickSound = new Audio('calculator.mp3');

// helper function to call the correct math function given op
function operate(op, a, b) {
  let result;
  switch(op) {
    case "+": 
      result = add(a,b); break;
    case "-":
      result = subtract(a,b); break;
    case "*":
      result = multiply(a,b); break;
    case "/":
      result = divide(a,b); break;
    default:
      result = b;
  }
  // Format result to max 4 decimals if it contains a '.'
  if (typeof result === 'string' && result.includes('.')) {
    // Only format if it's a valid number
    let num = Number(result);
    if (!isNaN(num)) {
      result = num.toFixed(4).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, '');
    }
  }
  return result;
}

//create HTML for the calculator display
const container = document.querySelector(".container");

const calcBox = document.createElement("div");
calcBox.classList.add("calcBox");
container.appendChild(calcBox);

const display = document.createElement("div");
display.classList.add("display");
calcBox.appendChild(display);

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C'
];

let currentInput = "";

function updateDisplay() {
    if (currentInput === "") {
        display.textContent = "0";
    } else if (
        currentInput.endsWith("/") ||
        currentInput.endsWith("+") ||
        currentInput.endsWith("*") ||
        currentInput.endsWith("=")
    ) {
        display.textContent = currentInput.slice(0, -1);
    } else {
        display.textContent = currentInput;
    }
}

let firstNum = "";
let secondNum = "";
let operator = "";


function clickButton(event) {

    clickSound.play();
    const value = event.target.textContent;
    if ((value >= "0" && value <= "9") || value === ".") {
    // Prevent multiple decimals
    if (value === ".") {
      if (operator === "" && firstNum.includes(".")) return;
      if (operator !== "" && secondNum.includes(".")) return;
    }
    if (operator === "") {
      // Prevent multiple leading zeroes unless there's a decimal
      if (value === "0" && (firstNum === "" || firstNum === "0") && !firstNum.includes(".")) return;
      // Replace leading zero with new digit unless there's a decimal
      if (firstNum === "0" && value !== "0" && !firstNum.includes(".")) {
        firstNum = value;
      } else {
        firstNum += value;
      }
      currentInput = firstNum;
      updateDisplay();
    } else {
      if (value === "0" && (secondNum === "" || secondNum === "0") && !secondNum.includes(".")) return;
      if (secondNum === "0" && value !== "0" && !secondNum.includes(".")) {
        secondNum = value;
      } else {
        secondNum += value;
      }
      currentInput = secondNum;
      updateDisplay();
    }
  } else if (value === 'C') {
    firstNum = "";
    secondNum = "";
    operator = "";
    currentInput = "";
    updateDisplay();
  } else if (["/", "+", "-", "*"].includes(value)) {
    if (firstNum !== "" && secondNum === "") {
      operator = value;
    } else if (firstNum !== "" && secondNum !== "") {
      firstNum = operate(operator, firstNum, secondNum);
      operator = value;
      secondNum = "";
      currentInput = firstNum;
      updateDisplay();
    }
  } else if (value === "=" && firstNum !== "" && secondNum !== "") {
    currentInput = operate(operator, firstNum, secondNum);
    firstNum = currentInput;
    secondNum = "";
    operator = "";
    updateDisplay();
  }
}

let btnIndex = 0;
for (let i = 0; i < 5; i++) {
  const row = document.createElement('div');
  row.classList.add('flex-row');
  for (let j = 0; j < 4 && btnIndex < buttons.length; j++) {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.textContent = buttons[btnIndex];
    btn.addEventListener('click', clickButton);
    row.appendChild(btn);
    btnIndex++;
  }
  calcBox.appendChild(row);
}
updateDisplay();