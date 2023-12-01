import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #cccccc;
  padding: 12px;
  max-width: 350px;
  overflow: hidden;
`;

export const PuzzleBlock = styled.div<{ x?: number; y?: number }>`
  min-width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  margin-right: 12px;
  z-index: 99;
  cursor: move;
  transform: translateX(${({ x }) => (x ? x : 0)}px)
  transform: translateY(${({ y }) => (y ? y : 0)}px)
`;
