#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Uso: node src/calculator.js <operação> <a> <b>
 *
 * Operações suportadas:
 *   add       (adição)         -> a + b
 *   subtract  (subtração)      -> a - b
 *   multiply  (multiplicação)  -> a * b
 *   divide    (divisão)        -> a / b (erro ao dividir por zero)
 *   modulo    (resto)          -> a % b (erro com divisor zero)
 *   power     (exponenciação)  -> a ** b
 *   sqrt      (raiz quadrada)  -> √a (um operando; erro para negativos)
 */

// Adição: a + b
function addition(a, b) {
  return a + b;
}

// Subtração: a - b
function subtraction(a, b) {
  return a - b;
}

// Multiplicação: a * b
function multiplication(a, b) {
  return a * b;
}

// Divisão: a / b
function division(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Resto da divisão: a % b
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

// Exponenciação: base ** exponent
function power(base, exponent) {
  return base ** exponent;
}

// Raiz quadrada: √n
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

// Mapeia os nomes de operação da CLI para as funções
const operations = {
  add: addition,
  subtract: subtraction,
  multiply: multiplication,
  divide: division,
  modulo,
  power,
  sqrt: squareRoot,
};

// Operações que recebem apenas um operando
const unaryOperations = new Set(['sqrt']);

function usage() {
  console.error('Usage: node calculator.js <operation> <a> [b]');
  console.error('Operations: add, subtract, multiply, divide, modulo, power, sqrt');
  console.error('sqrt takes a single operand: node calculator.js sqrt 16');
  console.error('Example: node calculator.js add 2 3');
}

function main(argv) {
  const [operation, ...rawOperands] = argv;

  if (!Object.hasOwn(operations, operation)) {
    usage();
    return 1;
  }

  const expected = unaryOperations.has(operation) ? 1 : 2;
  if (rawOperands.length !== expected) {
    usage();
    return 1;
  }

  const operands = rawOperands.map((raw) => (raw.trim() === '' ? NaN : Number(raw)));
  if (!operands.every(Number.isFinite)) {
    console.error('Error: operands must be valid numbers.');
    usage();
    return 1;
  }

  try {
    console.log(operations[operation](...operands));
    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
};
