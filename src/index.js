function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let stack = [];
  let last;
  let finalResult;
  ("(" + expr + ")").split("").forEach((symbol, index) => {
    if (symbol == "(") {
      last = { str: "" };
      stack.push(last);
    } else if (symbol == ")") {
      let result = calculate(stack.pop().str);
      if (stack.length == 0) {
        if (expr.length + 1 == index) {
          finalResult = result;
        } else throw "ExpressionError: Brackets must be paired";
      } else {
        last = stack[stack.length - 1];
        last.str += result;
      }
    } else last.str += symbol;
  });
  if (!finalResult) throw "ExpressionError: Brackets must be paired";
  return parseFloat(finalResult);
}

function calculate(str) {
  str = str.replace(/(\d)-(\d)/g, "$1 - $2");
  let exp = /((\s*-?\d+(\.\d+)?(e[-+]\d+)?\s*)|[+\-*/])/g;
  let arr = str.match(exp);
  let result = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == "*" || arr[i] == "/") {
      if (arr[i] == "*") {
        result = arr[i - 1] * arr[i + 1];
      }
      if (arr[i] == "/") {
        if (arr[i + 1].trim() == "0") throw "TypeError: Division by zero.";
        result = arr[i - 1] / arr[i + 1];
      }
      arr.splice(i - 1, 3, result);
      i--;
    }
  }
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == "+" || arr[i] == "-") {
      if (arr[i] == "+") {
        result = parseFloat(arr[i - 1]) + parseFloat(arr[i + 1]);
      }
      if (arr[i] == "-") {
        result = parseFloat(arr[i - 1]) - parseFloat(arr[i + 1]);
      }
      arr.splice(i - 1, 3, result);
      i--;
    }
  }
  return arr.join("");
}

module.exports = {
  expressionCalculator
};
