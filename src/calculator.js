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
 */

const operations = {
  // Adição: a + b
  add: (a, b) => a + b,
  // Subtração: a - b
  subtract: (a, b) => a - b,
  // Multiplicação: a * b
  multiply: (a, b) => a * b,
  // Divisão: a / b
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  },
};

function usage() {
  console.error('Usage: node calculator.js <operation> <a> <b>');
  console.error('Operations: add, subtract, multiply, divide');
  console.error('Example: node calculator.js add 2 3');
}

function main(argv) {
  const [operation, rawA, rawB] = argv;

  if (argv.length !== 3 || !Object.hasOwn(operations, operation)) {
    usage();
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (rawA.trim() === '' || rawB.trim() === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Error: operands must be valid numbers.');
    usage();
    return 1;
  }

  try {
    console.log(operations[operation](a, b));
    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}

process.exitCode = main(process.argv.slice(2));
