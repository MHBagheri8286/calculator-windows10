export type OperationType = '+' | '-' | '*' | '/' | null;

export type ButtonType = 'number' | 'operator' | 'function' | 'clear' | 'equals';

export interface CalculatorState {
  display: string;
  history: string;
  currentValue: number;
  previousValue: number | null;
  operation: OperationType;
  waitingForOperand: boolean;
  lastResult: number | null;
}

export interface ButtonConfig {
  value: string;
  label: string | React.ReactNode;
  type: ButtonType;
  className?: string;
  gridArea?: string;
}