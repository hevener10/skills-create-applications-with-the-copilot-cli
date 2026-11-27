const test = require('node:test');
const assert = require('node:assert/strict');
const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

test('addition', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-2, 3), 1);
});

test('subtraction', () => {
  assert.equal(subtraction(5, 3), 2);
  assert.equal(subtraction(3, 5), -2);
});

test('multiplication', () => {
  assert.equal(multiplication(4, 3), 12);
  assert.equal(multiplication(-4, 0.5), -2);
});

test('division', () => {
  assert.equal(division(10, 4), 2.5);
  assert.throws(() => division(1, 0), /Division by zero/);
});

test('modulo', () => {
  assert.equal(modulo(10, 3), 1);
  assert.throws(() => modulo(1, 0), /Modulo by zero/);
});

test('power', () => {
  assert.equal(power(2, 10), 1024);
  assert.equal(power(9, 0.5), 3);
  assert.equal(power(5, 0), 1);
});

test('squareRoot', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
  assert.throws(() => squareRoot(-1), /negative number/);
});
