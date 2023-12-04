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
  min-width: 121px;
  min-height: 121px;
  border: 1px solid #ffffff;
  margin-right: 24px;
`;

export const PuzzleBlockImg = styled.img`
  width: 121px;
  height: 121px;
  &:hover {
    cursor: move;
  }
`;

export const PuzzleBlockWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 363px;
`;

export const ListPassButton = styled.button`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #ffaa00;
  border: none;
  border-radius: 100px;
  flex: 1;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
`;

export const ListByeButton = styled(ListPassButton)`
  margin-right: 16px;
  flex: 2;
`;
