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

  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
    this.prevOperandText.innerText = this.prevOperand;
  }
}

// Select HTML elements
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const acButton = document.querySelector('[data-ac]');
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