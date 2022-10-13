import { ScreenOutput, CurrentOperation, PreviousOperation } from "./screen-input.styles"


const ScreenInput = ({previousOperation, currentOperation, operation}) => {
    return (
        <ScreenOutput>
          <PreviousOperation>
            {previousOperation} {operation}
          </PreviousOperation>
          <CurrentOperation>{currentOperation}</CurrentOperation>
        </ScreenOutput>
    )
}

export default ScreenInput