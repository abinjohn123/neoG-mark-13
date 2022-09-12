'use strict';

const form = document.getElementById('date-form');
const dateEl = document.getElementById('form-date-input');
const outputEl = document.querySelector('.output-confirmation');
const nextPalEl = document.querySelector('.output-next-palindrome');

function isPalindrome(dateString) {
  return dateString === dateString.split('').reverse().join('');
}

function splitDate(dateObj) {
  function doubleDigit(num) {
    return num.toString().padStart(2, '0');
  }

  const year = doubleDigit(dateObj.getFullYear());
  const month = doubleDigit(dateObj.getMonth() + 1);
  const date = doubleDigit(dateObj.getDate());

  return { date, month, year };
}

function outputResult(stat) {
  outputEl.innerText = stat
    ? 'Yes, your birthdate is a palindrome!'
    : 'No, your birthday is not a palindrome!';
}

function outputNextPalResult(type, dateObj, days) {
  const { date, month, year } = splitDate(dateObj);
  const dateString = [date, month, year].join('-');
  const message = `The nearest palindrome date is ${dateString}\n You were ${type} by ${days} ${
    days > 1 ? 'days' : 'day'
  } `;
  nextPalEl.innerText = message;
}

function getPalindrome(dateObj, inc) {
  let flag = false;
  let counter = 0;
  while (!flag) {
    counter++;
    dateObj.setDate(dateObj.getDate() + inc);
    const { date, month, year } = splitDate(dateObj);
    flag = isPalindrome(date + month + year);
  }
  return [dateObj, counter];
}

function nearbyPalindrome(dateObj) {
  const nextPalindrome = getPalindrome(new Date(dateObj), 1);
  const prevPalindrome = getPalindrome(new Date(dateObj), -1);

  return nextPalindrome[1] < prevPalindrome[1]
    ? ['behind', ...nextPalindrome]
    : ['ahead', ...prevPalindrome];
}

// Event Handler
function formHandler(e) {
  e.preventDefault();
  const dateInput = new Date(dateEl.value);
  const { date, month, year } = splitDate(dateInput);

  if (isPalindrome(date + month + year)) return outputResult(true);

  const [traverseType, nearestPalindrome, noOfDays] =
    nearbyPalindrome(dateInput);
  outputResult(false);
  outputNextPalResult(traverseType, nearestPalindrome, noOfDays);
}

// Event Listener
form.addEventListener('submit', formHandler);
