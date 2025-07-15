/* Settings */
const localTheme = localStorage.getItem('theme');
const dotOrComma = localStorage.getItem('dot/comma');
const themeToggle = document.getElementById('app-theme');
const settingsToggle = document.getElementById('app-settings');
const popupMenu = document.getElementById('popup-menu');
const dotOrCommaPopup = document.getElementById('dotOrCommaPopup');
const dotOrCommaButton = document.getElementById('btnDot');

if (localTheme) {
    document.body.setAttribute('data-theme', localTheme);
    themeToggle.textContent = localTheme === 'light' ? '🌙' : '☀️';
} else {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  themeToggle.textContent = isDark ? '🌙' : '☀️';
});

settingsToggle.addEventListener('click', () => {
  popupMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!settingsToggle.contains(e.target) && !popupMenu.contains(e.target)) {
    popupMenu.classList.add('hidden');
  }
});

if (!dotOrComma) {
  localStorage.setItem('dot/comma', '.');
} else {
  if (dotOrComma === '.') {
    dotOrCommaButton.textContent = '.';
    dotOrCommaPopup.innerText = ' \" . \" -> \" , \"';
  } else {
    dotOrCommaButton.textContent = ',';
    dotOrCommaPopup.innerText = ' \" , \" -> \" . \"';
  }
}

dotOrCommaPopup.addEventListener('click', () => {
  if (dotOrCommaButton.textContent === '.') {
    dotOrCommaButton.textContent = ',';
    dotOrCommaPopup.innerText = ' \" , \" -> \" . \"';
  } else {
    dotOrCommaButton.textContent = '.';
    dotOrCommaPopup.innerText = ' \" . \" -> \" , \"';
  }

  localStorage.setItem('dot/comma', dotOrCommaButton.textContent);
})

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
  const acButton = document.getElementById('btnClearDisplay');
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

    document.getElementById('btnClearDisplay').innerText = 'C';
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
    if (Number.isFinite(numB / numA)) {
      display.value = numB / numA;
    } else {
      display.value = 'error /0';
    }
  }

  intermidiateOperation = true;
  terminalOperation = true;
}

/* Keyboard */
const button0 = document.getElementById('btn0');
const button1 = document.getElementById('btn1');
const button2 = document.getElementById('btn2');
const button3 = document.getElementById('btn3');
const button4 = document.getElementById('btn4');
const button5 = document.getElementById('btn5');
const button6 = document.getElementById('btn6');
const button7 = document.getElementById('btn7');
const button8 = document.getElementById('btn8');
const button9 = document.getElementById('btn9');
const buttonDot = document.getElementById('btnDot');
const buttonEqual = document.getElementById('btnEqual');
const buttonPlus = document.getElementById('btnPlus');
const buttonMinus = document.getElementById('btnMinus');
const buttonMultiply = document.getElementById('btnMultiply');
const buttonDivision = document.getElementById('btnDivision');
const btnClearDisplay = document.getElementById('btnClearDisplay');

document.addEventListener('keydown', (event) => {
    if (event.key === '0') {
      button0.click();
    } else if (event.key === '1') {
      button1.click();
    } else if (event.key === '2') {
      button2.click();
    } else if (event.key === '3') {
      button3.click();
    } else if (event.key === '4') {
      button4.click();
    } else if (event.key === '5') {
      button5.click();
    } else if (event.key === '6') {
      button6.click();
    } else if (event.key === '7') {
      button7.click();
    } else if (event.key === '8') {
      button8.click();
    } else if (event.key === '9') {
      button9.click();
    } else if (event.key === '.') {
      buttonDot.click();
    } else if (event.key === 'Delete') {
      btnClearDisplay.click();
    } else if (event.key === '/') {
      buttonDivision.click();
    } else if (event.key === '*') {
      buttonMultiply.click();
    } else if (event.key === '-') {
      buttonMinus.click();
    } else if (event.key === '+') {
      buttonPlus.click();
    } else if (event.key === 'Enter') {
      buttonEqual.click();
    }
  }
)

/* Special events */

window.addEventListener("load", () => {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('app');
  content.style.display = "flex";
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});