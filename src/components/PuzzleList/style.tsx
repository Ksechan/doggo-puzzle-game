import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #f7f7f7;
  padding: 30px;
  width: 390px;
  overflow: scroll;
  padding: 8px;
`;

export const PuzzleBlock = styled.button`
  width: 121px;
  height: 121px;
  border: 1px solid #ffffff;
  margin-right: 12px;
  z-index: 99;
  cursor: move;
`;

export const PuzzleBlockImg = styled.img`
  width: 121px;
  height: 121px;
`;

export const PuzzleBlockWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
