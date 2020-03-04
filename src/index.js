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
        if (expr.length + 1 == index){
            finalResult = result;
        } 
        else throw "ExpressionError: Brackets must be paired";
      }
      else{
        last = stack[stack.length - 1];
        last.str += result;
      }
    } else last.str += symbol;
    console.log(stack);
  });
  if(!finalResult) throw "ExpressionError: Brackets must be paired";
  return finalResult;
}

console.log(expressionCalculator("(2 + 3 + (7 + 5))"));
console.log(expressionCalculator("2 + 3 + (7 + 5)"));
// console.log(expressionCalculator("2 + 3 + (7 + 5"));
console.log(expressionCalculator("2 + 3 + 7 + 5)"));

function calculate(str) {
  return str;
}

module.exports = {
  expressionCalculator
};
