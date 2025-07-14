/* Settings */
const localTheme = localStorage.getItem('theme');
const toggle = document.getElementById('app-theme');

if (localTheme) {
    document.body.setAttribute('data-theme', localTheme);
    toggle.textContent = localTheme === 'light' ? '🌙' : '☀️';
} else {
    document.body.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  toggle.textContent = isDark ? '🌙' : '☀️';
});

/* App */
let currentValue = Number(0);
let memoryValue = Number(0);
let intermidiateOperation = false;
let terminalOperation = false;

const preDisplay = document.getElementById('pre-screen');
const display = document.getElementById('main-screen');
const advancedDisplay = document.getElementById('small-screen');
display.value = '0';

function clearDisplay(){
  const acButton = document.getElementById('ac-btn');
  if (acButton.textContent === 'C') {
    display.value = '0';
    acButton.textContent = 'AC';
  } else {
    display.value = '0';
    preDisplay.textContent = ' ';
    advancedDisplay.textContent = ' ';
    currentValue = Number(0);
    intermidiateOperation = false;
    terminalOperation = false;
  }
}

function plusMinus(){
  const val = display.value;
  if (val.includes('-')) {
    display.value = val.slice(1, );
  } else {
    if (display.value !== '0'){
      display.value = '-' + display.value;
    }
  }
}

function percent(){
  if (memoryValue == 0) {
    display.value = display.value / 100;
  } else {
    display.value = memoryValue / 100 * display.value;
  }
}

function appendToDisplay(value){
  if (display.value.length < 10){
    if (intermidiateOperation === true) {
      intermidiateOperation = false;
      terminalOperation = false;
      display.value = '0';
    }

    if (value !== '.' && display.value === '0') {
      display.value = value;
    } else if (value === '.') {
      if (!display.value.includes('.')) display.value += value;
    } else {
      display.value += value;
    }

    document.getElementById('ac-btn').innerText = 'C';
  }
}

function division(){
  advancedDisplay.textContent = '÷';
  memoryValue = Number(display.value);
  intermidiateOperation = true;
  terminalOperation = false;
}

function multiply(){
  advancedDisplay.textContent = '×';
  memoryValue = Number(display.value);
  intermidiateOperation = true;
  terminalOperation = false;
}

function minus(){
  advancedDisplay.textContent = '-';
  memoryValue = Number(display.value);
  intermidiateOperation = true;
  terminalOperation = false;
}

function plus(){
  advancedDisplay.textContent = '+';
  memoryValue = Number(display.value);
  intermidiateOperation = true;
  terminalOperation = false;
}

function calculate(){
  let numA = 0;
  let numB = 0;
  
  if (!terminalOperation) {
    numA = Number(display.value);
    numB = memoryValue;
    memoryValue = Number(display.value);
  } else {
    numA = memoryValue;
    numB = Number(display.value);
  }
  
  if (advancedDisplay.textContent === '+') {
    display.value = Number(numA + numB);
  } else if (advancedDisplay.textContent === '-') {
    display.value = Number(numB - numA);
  } else if (advancedDisplay.textContent === '×') {
    display.value = numA * numB;
  } else if (advancedDisplay.textContent === '÷') {
    display.value = numB / numA;
  }

  intermidiateOperation = true;
  terminalOperation = true;
}
