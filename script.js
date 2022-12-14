class Calculator {
  constructor(prevOperandText, currentOperandText) {
    this.prevOperandText = prevOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return; // Prevent user from adding more than 1 '.'

    this.currentOperand = this.currentOperand.toString() + number.toString(); //Append numbers, don't add them together
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return; // Prevent user from entering more operations before numbers
    if(this.prevOperand != '') {
      this.compute();
    }

    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand); // Convert string back to number
    const current = parseFloat(this.currentOperand);

    if(isNaN(prev) || isNaN(current)) return;

    switch(this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerNumber = parseFloat(stringNumber.split('.')[0]);
    const decimalNumber = stringNumber.split('.')[1];

    let integerDisplay;
    if(isNaN(integerNumber)) {
      integerDisplay = '';
    }
    else {
      integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0});
    }

    if(decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`;
    }
    else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.prevOperandText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    }
    else {
      this.prevOperandText.innerText = '';
    }
  }
}

// Select HTML elements
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-ac]');
const deleteButton = document.querySelector('[data-delete]');
const prevOperandText = document.querySelector('[data-prev-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(prevOperandText, currentOperandText);


numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});


operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});


equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});


clearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});


deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});