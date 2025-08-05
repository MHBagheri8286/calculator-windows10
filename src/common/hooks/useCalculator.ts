import { INITIAL_STATE, MAX_DIGITS } from "@constants/calculator";
import type {
  ButtonConfig,
  CalculatorState,
  OperationType,
} from "@models/calculator";
import {
  calculate,
  formatNumber,
  parseFormattedNumber,
  performFunction,
} from "@utils/calculator";
import { useCallback, useState } from "react";

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

  const updateHistory = useCallback(
    (value: string, operation?: string): string => {
      if (operation) {
        return `${value} ${operation}`;
      }
      return "";
    },
    []
  );

  const handleNumber = useCallback((num: string) => {
    setState((prevState) => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: num,
          currentValue: parseFloat(num),
          waitingForOperand: false,
        };
      }

      if (prevState.display === "0" || prevState.display === "Error") {
        return {
          ...prevState,
          display: num,
          currentValue: parseFloat(num),
        };
      }

      const newDisplay = prevState.display + num;
      if (newDisplay.replace(/[,.-]/g, "").length > MAX_DIGITS) {
        return prevState;
      }

      return {
        ...prevState,
        display: newDisplay,
        currentValue: parseFormattedNumber(newDisplay),
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prevState) => {
      if (prevState.waitingForOperand) {
        return {
          ...prevState,
          display: "0.",
          currentValue: 0,
          waitingForOperand: false,
        };
      }

      if (prevState.display.indexOf(".") === -1) {
        return {
          ...prevState,
          display: prevState.display + ".",
        };
      }

      return prevState;
    });
  }, []);

  const handleOperator = useCallback(
    (nextOperator: OperationType) => {
      setState((prevState) => {
        if (prevState.previousValue === null) {
          return {
            ...prevState,
            previousValue: prevState.currentValue,
            operation: nextOperator,
            waitingForOperand: true,
            history: updateHistory(prevState.display, nextOperator || ""),
          };
        }

        if (prevState.operation && !prevState.waitingForOperand) {
          try {
            const result = calculate(
              prevState.previousValue,
              prevState.currentValue,
              prevState.operation
            );
            return {
              ...prevState,
              display: formatNumber(result),
              currentValue: result,
              previousValue: result,
              operation: nextOperator,
              waitingForOperand: true,
              history: updateHistory(formatNumber(result), nextOperator || ""),
              lastResult: result,
            };
          } catch (error) {
            return {
              ...INITIAL_STATE,
              display: "Error",
              error,
              history: "",
            };
          }
        }

        return {
          ...prevState,
          operation: nextOperator,
          waitingForOperand: true,
          history: updateHistory(prevState.display, nextOperator || ""),
        };
      });
    },
    [updateHistory]
  );

  const handleEquals = useCallback(() => {
    setState((prevState) => {
      if (prevState.operation && prevState.previousValue !== null) {
        try {
          const result = calculate(
            prevState.previousValue,
            prevState.currentValue,
            prevState.operation
          );
          return {
            ...INITIAL_STATE,
            display: formatNumber(result),
            currentValue: result,
            lastResult: result,
            history: "",
          };
        } catch (error) {
          return {
            ...INITIAL_STATE,
            display: "Error",
            error,
            history: "",
          };
        }
      }
      return prevState;
    });
  }, []);

  const handleFunction = useCallback((func: string) => {
    setState((prevState) => {
      if (func === "backspace") {
        if (prevState.display.length > 1 && prevState.display !== "Error") {
          const newDisplay = prevState.display.slice(0, -1);
          return {
            ...prevState,
            display: newDisplay,
            currentValue: parseFormattedNumber(newDisplay),
          };
        }
        return {
          ...prevState,
          display: "0",
          currentValue: 0,
        };
      }

      try {
        const result = performFunction(prevState.currentValue, func);
        return {
          ...prevState,
          display: formatNumber(result),
          currentValue: result,
          history: prevState.history + ` ${func}(${prevState.display})`,
        };
      } catch (error) {
        return {
          ...INITIAL_STATE,
          display: "Error",
          error,
          history: "",
        };
      }
    });
  }, []);

  const handleClear = useCallback((type: string) => {
    if (type === "C") {
      setState(INITIAL_STATE);
    } else if (type === "CE") {
      setState((prevState) => ({
        ...prevState,
        display: "0",
        currentValue: 0,
      }));
    }
  }, []);

  const handleButtonClick = useCallback(
    (button: ButtonConfig) => {
      const { value, type } = button;

      switch (type) {
        case "number":
          if (value === ".") {
            handleDecimal();
          } else {
            handleNumber(value);
          }
          break;
        case "operator":
          handleOperator(value as OperationType);
          break;
        case "equals":
          handleEquals();
          break;
        case "function":
          handleFunction(value);
          break;
        case "clear":
          handleClear(value);
          break;
      }
    },
    [
      handleNumber,
      handleDecimal,
      handleOperator,
      handleEquals,
      handleFunction,
      handleClear,
    ]
  );

  return {
    state,
    handleButtonClick,
  };
};
