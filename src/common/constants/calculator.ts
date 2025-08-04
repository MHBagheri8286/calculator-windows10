import type { ButtonConfig, CalculatorState } from "@models/calculator";

export const INITIAL_STATE: CalculatorState = {
  display: "0",
  history: "",
  currentValue: 0,
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  lastResult: null,
};

export const MAX_DIGITS = 15;

export const BUTTON_CONFIG: ButtonConfig[] = [
  // Row 1 - Functions
  {
    value: "percentage",
    label: "%",
    type: "function",
    className: "btn-operator",
  },
  { value: "sqrt", label: "√x", type: "function", className: "btn-operator" },
  { value: "sqr", label: "x²", type: "function", className: "btn-operator" },
  {
    value: "fraction",
    label: "1/x",
    type: "function",
    className: "btn-operator",
  },
  // Row 2 - Clear and operators
  { value: "CE", label: "CE", type: "clear", className: "btn-operator" },
  { value: "C", label: "C", type: "clear", className: "btn-operator" },
  {
    value: "backspace",
    label: "⌫",
    type: "function",
    className: "btn-operator",
  },
  { value: "/", label: "÷", type: "operator", className: "btn-operator" },
  // Numbers and operators
  { value: "7", label: "7", type: "number", className: "btn-number" },
  { value: "8", label: "8", type: "number", className: "btn-number" },
  { value: "9", label: "9", type: "number", className: "btn-number" },
  { value: "*", label: "×", type: "operator", className: "btn-operator" },

  { value: "4", label: "4", type: "number", className: "btn-number" },
  { value: "5", label: "5", type: "number", className: "btn-number" },
  { value: "6", label: "6", type: "number", className: "btn-number" },
  { value: "-", label: "−", type: "operator", className: "btn-operator" },

  { value: "1", label: "1", type: "number", className: "btn-number" },
  { value: "2", label: "2", type: "number", className: "btn-number" },
  { value: "3", label: "3", type: "number", className: "btn-number" },
  { value: "+", label: "+", type: "operator", className: "btn-operator" },

  { value: "negate", label: "±", type: "function", className: "btn-operator" },
  { value: "0", label: "0", type: "number", className: "btn-number" },
  { value: ".", label: ".", type: "number", className: "btn-number" },
  { value: "=", label: "=", type: "equals", className: "btn-equals" },
];
