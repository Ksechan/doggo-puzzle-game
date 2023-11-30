import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #cccccc;
  padding: 12px;
  max-width: 350px;
  overflow: scroll;
`;

export const PuzzleBlock = styled.div<{ backgroundColor?: boolean }>`
  min-width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  margin-right: 12px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? "#ffffff" : "none"};
`;
