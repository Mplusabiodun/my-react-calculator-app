import { BaseButton, OperationButton, ResetButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  operation: "operation",
  reset: "reset",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.operation]: OperationButton,
    [BUTTON_TYPE_CLASSES.reset]: ResetButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
