// functions for basic math ops
function add(a,b) {
  return parseInt(a) + parseInt(b);
};

function subtract(a,b) {
  return parseInt(a) - parseInt(b);
};

function multiply(a,b) {
  return parseInt(a) * parseInt(b);
};

function divide(a,b) {
    return parseInt(a) / parseInt(b);
}

// helper function to call the correct math function given op
function operate(op, a, b) {
    switch(op) {
        case "+": 
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
    }
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

let btnIndex = 0;
for (let i = 0; i < 5; i++) {
  const row = document.createElement('div');
  row.classList.add('flex-row');
  for (let j = 0; j < 4 && btnIndex < buttons.length; j++) {
    const btn = document.createElement('button');
    btn.classList.add('button'); 
    btn.textContent = buttons[btnIndex];
    // add event listueners, classes, etc.
    row.appendChild(btn);
    btnIndex++;
  }
  calcBox.appendChild(row);
}