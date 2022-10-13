import { useReducer, Fragment } from "react";

import { createAction } from "../../utils/reducer/reducer.utils";

import CalcConatiner from "../calc-container/calc-container.component"

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../button/button.component";

import ButtonContainer from "../button-container/button-container.component";

import ScreenInput from "../screen-input/screen-input.component";

//Calculator App

//create action type for operation
export const OPERATION_ACTION_TYPES = {
  NUM_INPUT: "NUM_INPUT",
  CHOOSE_OPERATION: "CHOOSE_OPERATION",
  RESET_INPUT: "RESET_INPUT",
  DELETE_INPUT: "DELETE_INPUT",
  EVALUATE_INPUT: "EVALUATE_INPUT",
};

//create reducer for operation
const operationReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case OPERATION_ACTION_TYPES.NUM_INPUT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperation: payload.input,
          overwrite: false,
        };
      }

      if (payload.input === "0" && state.currentOperation === "0") {
        return state;
      }
      if (payload.input === "." && state.currentOperation.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperation: `${state.currentOperation || ""}${payload.input}`,
      };

    case OPERATION_ACTION_TYPES.CHOOSE_OPERATION:
      if (state.currentOperation === null && state.previousOperation === null) {
        return state;
      }

      if (state.currentOperation === null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperation === null) {
        return {
          ...state,
          previousOperation: state.currentOperation,
          currentOperation: null,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOperation: evaluate(state),
        currentOperation: null,
        operation: payload.operation,
      };

    case OPERATION_ACTION_TYPES.RESET_INPUT:
      return {
        ...state,
        currentOperation: null,
      };

    case OPERATION_ACTION_TYPES.DELETE_INPUT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperation: null,
        };
      }

      if (state.currentOperation === null) {
        return state;
      }

      if (state.currentOperation.length === 1) {
        return {
          ...state,
          currentOperation: null,
        };
      }

      return {
        ...state,
        currentOperation: state.currentOperation.slice(0, -1),
      };

    case OPERATION_ACTION_TYPES.EVALUATE_INPUT:
      if (
        state.currentOperation === null ||
        state.previousOperation === null ||
        state.operation === null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        currentOperation: evaluate(state),
        previousOperation: null,
        operation: null,
      };
  }
};

const evaluate = ({ previousOperation, currentOperation, operation }) => {
  const current = parseFloat(currentOperation);
  const previous = parseFloat(previousOperation);
  if (isNaN(previous) || isNaN(current)) return "";
  let computation = "";

  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "/":
      computation = previous / current;
      break;
  }

  return computation.toString();
};

//create initial state for operation
const INITIAL_STATE = {
  currentOperation: null,
  previousOperation: null,
  operation: null,
};

const InputValue = [
  ["C", "DEL", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [".", 0, "="],
];

const Calculator = () => {
  const [{ currentOperation, previousOperation, operation }, dispatch] =
    useReducer(operationReducer, INITIAL_STATE);

  return (
    <Fragment>
      <CalcConatiner>
        <ScreenInput
          previousOperation={previousOperation}
          currentOperation={currentOperation}
          operation={operation}
        />
        {/* map through the row array */}
        {InputValue.map((row, rowIndex) => {
          return (
            <ButtonContainer key={rowIndex}>
              {/* map through the column array */}
              {row.map((input, i) => {
                return (
                  <Button
                    key={i}
                    buttonType={
                      input === "=" 
                        ? BUTTON_TYPE_CLASSES.operation
                        : input === "C"
                        ? BUTTON_TYPE_CLASSES.reset
                        : BUTTON_TYPE_CLASSES.base
                    }
                    value={input}
                    onClick={
                      input === "="
                        ? () =>
                            dispatch(
                              createAction(
                                OPERATION_ACTION_TYPES.EVALUATE_INPUT
                              )
                            )
                        : input === "C"
                        ? () =>
                            dispatch(
                              createAction(OPERATION_ACTION_TYPES.RESET_INPUT)
                            )
                        : input === "DEL"
                        ? () =>
                            dispatch(
                              createAction(OPERATION_ACTION_TYPES.DELETE_INPUT)
                            )
                        : input === "/" ||
                          input === "*" ||
                          input === "-" ||
                          input === "+"
                        ? () =>
                            dispatch(
                              createAction(
                                OPERATION_ACTION_TYPES.CHOOSE_OPERATION,
                                { operation: input }
                              )
                            )
                        : () =>
                            dispatch(
                              createAction(OPERATION_ACTION_TYPES.NUM_INPUT, {
                                input,
                              })
                            )
                    }
                  >
                    {input}
                  </Button>
                );
              })}
            </ButtonContainer>
          );
        })}
      </CalcConatiner>
    </Fragment>
  );
};

export default Calculator;