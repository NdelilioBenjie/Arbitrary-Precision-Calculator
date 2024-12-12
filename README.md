
# Arbitrary-Precision Calculator

## **Overview**
This project is an implementation of an **arbitrary-precision calculator** in JavaScript. The calculator can handle extremely large numbers with no upper limit, making it capable of performing operations far beyond the precision offered by JavaScript's native `Number` type. 

### **Why Arbitrary Precision?**
JavaScript's `Number` type uses 64-bit floating-point representation, which introduces precision limitations for large numbers. For instance:
- `9999999999999999` and `10000000000000000` may be treated as the same value.
- Extremely large numbers or high-precision calculations lead to rounding errors.

To overcome this limitation, this project treats numbers as **strings** and implements arithmetic operations manually, ensuring exact precision regardless of size.

---

## **Features**
The calculator supports the following operations:
- **Addition (+)**: Compute the sum of two arbitrarily large integers.
- **Subtraction (-)**: Compute the difference between two integers.
- **Multiplication (*)**: Compute the product of two integers.
- **Division (/)**: Compute the quotient and remainder when dividing two integers.
- **Modulo (%)**: Compute the remainder when dividing two integers.
- **Exponentiation (^)**: Compute the result of raising a base to a power.
- **Factorial (!)**: Compute the factorial of a non-negative integer.

### **Core Logic**
- **String-based arithmetic**: Numbers are converted into strings, and operations are performed digit by digit, simulating how humans perform calculations on paper.
- **Internal utility functions**:
  - `compare`: Compares two large numbers represented as strings.
  - `add`, `subtract`, `multiply`, `divide`: Core arithmetic operations implemented manually.
  - `power`, `factorial`: Built on top of the core functions.

---

## **How the Calculator Works**
### **Representation of Numbers**
All numbers input into the calculator are treated as strings. This allows the calculator to bypass JavaScript's native numeric limitations. For example:
- `"12345678901234567890"` is treated as a string but processed as a number internally.

### **Steps in Arithmetic Operations**
1. **Input Conversion**: Numbers are padded or stripped as needed to ensure uniform processing.
2. **Digit-by-Digit Calculation**: Operations like addition and subtraction are performed by iterating over each digit of the number.
3. **String Manipulation**: Results are stored and returned as strings to maintain precision.

For example:
- Addition of `"12345678901234567890"` and `"98765432109876543210"` results in:
  - Digit-wise computation → `"111111111011111111100"`

---

## **How to Use**

### **Setup**
To use this project locally:
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/NdelilioBenjie/Arbitrary-Precision-Calculator.git
    cd arbitrary-precision-calculator
    ```

2. **Ensure Node.js is Installed**:
   This project uses Node.js to run the calculator in a REPL environment. If you don't have Node.js installed, download it from [Node.js Official Website](https://nodejs.org).

3. **Run the Calculator**:
    ```bash
    node calculator.js
    ```

### **Using the REPL**
Once the calculator is running, you can perform calculations interactively in the terminal:
- Enter arithmetic expressions (e.g., `123 + 456` or `1000!`).
- To exit, type `exit`.

### **Example Usage**
```bash
> 12345678901234567890 + 98765432109876543210
111111111011111111100
> 50!
30414093201713378043612608166064768844377641568960512000000000000
> 12345678901234567890 / 1234567890
Quotient: 10000000001, Remainder: 0
```

---

## **Contributing**
Contributions are welcome! Feel free to fork this repository, add new features, or fix issues, and submit a pull request.

### **Planned Enhancements**
- Add support for **non-decimal bases** (e.g., binary, octal, hexadecimal).
- Add support for **fractions** (i.e., rational numbers and operations with them).
- Implement **logarithmic functions** (e.g., `log`, `ln`).
- Add support for **square roots** and other advanced mathematical functions.
- Improve REPL interface with **input validation** and **error handling**.


## **License**
This project is licensed under the MIT License.

---

## **Acknowledgments**
- Inspired by the challenge of building a precise calculator without relying on libraries.
- Built with Node.js for an efficient REPL interface.
