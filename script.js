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
    this.currentOperand = number;
  }

  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
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