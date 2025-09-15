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