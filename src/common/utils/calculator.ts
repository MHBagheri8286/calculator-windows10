import { MAX_DIGITS } from "@constants/calculator";
import type { OperationType } from "@models/calculator";

export const formatNumber = (num: number): string => {
  const str = num.toString();
  if (str.length <= MAX_DIGITS) {
    return new Intl.NumberFormat("en-US").format(num);
  }
  return num.toExponential(8);
};

export const parseFormattedNumber = (str: string): number => {
  return parseFloat(str.replace(/,/g, ""));
};

export const calculate = (
  firstOperand: number,
  secondOperand: number,
  operation: OperationType
): number => {
  switch (operation) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      if (secondOperand === 0) {
        throw new Error("Cannot divide by zero");
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
};

export const performFunction = (value: number, func: string): number => {
  switch (func) {
    case "sqrt":
      if (value < 0) {
        throw new Error("Invalid input");
      }
      return Math.sqrt(value);
    case "sqr":
      return Math.pow(value, 2);
    case "cube":
      return Math.pow(value, 3);
    case "fraction":
      if (value === 0) {
        throw new Error("Cannot divide by zero");
      }
      return 1 / value;
    case "percentage":
      return value / 100;
    case "negate":
      return -value;
    default:
      return value;
  }
};