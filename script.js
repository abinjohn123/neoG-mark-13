'use strict';

const form = document.getElementById('date-form');
const dateEl = document.getElementById('form-date-input');
const outputEl = document.querySelector('.output');

function isPalindrome(dateString) {
  return dateString === dateString.split('').reverse().join('');
}

function doubleDigit(num) {
  return num.toString().padStart(2, '0');
}

function outputResult(stat) {
  outputEl.innerText = stat
    ? 'Yes, your birthdate is a palindrome!'
    : 'No, your birthday is not a palindrome!';
}

// Event Handler
function formHandler(e) {
  e.preventDefault();
  const dateInput = new Date(dateEl.value);

  const year = doubleDigit(dateInput.getFullYear());
  const month = doubleDigit(dateInput.getMonth() + 1);
  const date = doubleDigit(dateInput.getDate());

  outputResult(isPalindrome(date + month + year));
}

// Event Listener
form.addEventListener('submit', formHandler);
