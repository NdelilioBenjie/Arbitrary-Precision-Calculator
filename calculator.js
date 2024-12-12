
/**
 * Adds two large integers represented as strings.
 */
function add(a, b) {
    a = a.padStart(Math.max(a.length, b.length), '0');
    b = b.padStart(Math.max(a.length, b.length), '0');
    let carry = 0, result = [];
    for (let i = a.length - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        result.push(sum % 10);
        carry = Math.floor(sum / 10);
    }
    if (carry) result.push(carry);
    return result.reverse().join('');
}

/**
 * Subtracts one large integer from another, both represented as strings.
 */
function subtract(a, b) {
    if (a === b) return '0';
    let negative = false;
    if (a.length < b.length || (a.length === b.length && a < b)) {
        [a, b] = [b, a];
        negative = true;
    }
    a = a.padStart(b.length, '0');
    b = b.padStart(a.length, '0');
    let carry = 0, result = [];
    for (let i = a.length - 1; i >= 0; i--) {
        let diff = parseInt(a[i]) - parseInt(b[i]) - carry;
        if (diff < 0) {
            diff += 10;
            carry = 1;
        } else {
            carry = 0;
        }
        result.push(diff);
    }
    while (result.length > 1 && result[result.length - 1] === 0) result.pop();
    return (negative ? '-' : '') + result.reverse().join('');
}

/**
 * Multiplies two large integers represented as strings.
 */
function multiply(a, b) {
    if (a === '0' || b === '0') return '0';
    let result = Array(a.length + b.length).fill(0);
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const mul = parseInt(a[i]) * parseInt(b[j]);
            const sum = mul + result[i + j + 1];
            result[i + j + 1] = sum % 10;
            result[i + j] += Math.floor(sum / 10);
        }
    }
    while (result.length > 1 && result[0] === 0) result.shift();
    return result.join('');
}

/**
 * Compares two large integers represented as strings.
 * Returns 1 if a > b, -1 if a < b, and 0 if a == b.
 */
function compare(a, b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return a.localeCompare(b);
}

/**
 * Divides two large integers represented as strings.
 * Returns an array [quotient, remainder].
 */
function divide(a, b) {
    if (b === '0') throw new Error("Division by zero");
    let quotient = '', remainder = '0';
    for (let i = 0; i < a.length; i++) {
        remainder = add(multiply(remainder, '10'), a[i]);
        let q = 0;
        while (compare(remainder, b) >= 0) {
            remainder = subtract(remainder, b);
            q++;
        }
        quotient += q;
    }
    return [quotient.replace(/^0+/, '') || '0', remainder];
}

/**
 * Computes the power of a base to an exponent, both represented as strings.
 */
function power(base, exp) {
    let result = '1';
    for (let i = 0; i < parseInt(exp); i++) {
        result = multiply(result, base);
    }
    return result;
}

/**
 * Computes the factorial of a number represented as a string.
 */
function factorial(n) {
    let result = '1';
    for (let i = 2; i <= parseInt(n); i++) {
        result = multiply(result, i.toString());
    }
    return result;
}

//  REPL Interface

const readline = require('readline');

/**
 * Parses and evaluates a single input line.
 */
function evaluate(input) {
    try {
        if (input.includes('!')) {
            const num = input.replace('!', '').trim();
            return factorial(num);
        } else if (input.includes('^')) {
            const [base, exp] = input.split('^').map(x => x.trim());
            return power(base, exp);
        } else if (input.includes('+')) {
            const [a, b] = input.split('+').map(x => x.trim());
            return add(a, b);
        } else if (input.includes('-')) {
            const [a, b] = input.split('-').map(x => x.trim());
            return subtract(a, b);
        } else if (input.includes('*')) {
            const [a, b] = input.split('*').map(x => x.trim());
            return multiply(a, b);
        } else if (input.includes('/')) {
            const [a, b] = input.split('/').map(x => x.trim());
            const [q, r] = divide(a, b);
            return `Quotient: ${q}, Remainder: ${r}`;
        } else if (input.includes('%')) {
            const [a, b] = input.split('%').map(x => x.trim());
            const [_, r] = divide(a, b);
            return r;
        } else {
            return "Unsupported operation.";
        }
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

/**
 * Starts the REPL loop.
 */
function repl() {
    console.log("Welcome to my Arbitrary-Precision-Calculator");
    console.log("This calculator Supports: +, -, *, /, %, ^, !");
    console.log("Type 'exit' to quit.");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    

    function loop() {
        rl.question("> ", (input) => {
            if (input.toLowerCase() === 'exit') {
                rl.close();
                return;
            }
            console.log(evaluate(input));
            loop();
        });
    }

    loop();
}

// Start the REPL
repl();
