import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #f7f7f7;
  width: 100%;
  max-width: 345px;
  overflow: scroll;
  padding: 8px 20px;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    max-width: 496px;
  }
`;

export const PuzzleBlock = styled.button<{ $noMargin: boolean }>`
  min-width: 115px;
  min-height: 115px;
  border: 1px solid #ffffff;
  margin-right: ${({ $noMargin }) => ($noMargin ? 0 : 24)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: unset;

  @media screen and (min-width: 1024px) {
    min-width: 160px;
    min-height: 160px;
  }
`;

export const PuzzleBlockImg = styled.img`
  width: 115px;
  height: 115px;
  background-color: #f7f7f7;
  cursor: grab;

  @media screen and (min-width: 1024px) {
    width: 160px;
    height: 160px;
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

  @media screen and (min-width: 1024px) {
    width: 480px;
  }
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
