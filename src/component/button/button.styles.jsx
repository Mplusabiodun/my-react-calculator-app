import styled from "styled-components";

export const BaseButton = styled.button`
  background-color: black;
  color: white;
  text-transform: uppercase;
  border: 1px solid white;
  cursor: pointer;
  border: none;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  outline: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const OperationButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;
  grid-column: span 2;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const ResetButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;
  grid-column: span 2;


  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;
