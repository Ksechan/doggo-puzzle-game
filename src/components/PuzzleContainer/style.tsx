import styled from "styled-components";

export const PuzzleAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const PuzzleArea = styled.div<{ border?: boolean }>`
  background-color: #cccccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 363px;
  border-radius: 16px;
  border: ${({ border }) => (border ? "none" : "1px solid #ffffff")};
  overflow: hidden;
`;

export const Content = styled.div<{ border: boolean }>`
  background-color: #e9e9e9;
  width: 121px;
  height: 121px;
  border: ${({ border }) => (border ? "none" : "1px solid #ffffff")};
  box-sizing: border-box;
  z-index: 9;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 32px 0 16px;
`;

export const subtitle = styled.p`
  margin-bottom: 24px;
`;

export const Retry = styled.button`
  padding: 12px 24px;
  background-color: #ffaa00;
  color: #ffffff;
  border-radius: 100px;
  font-size: 16px;
  text-align: center;
  border: none;
  cursor: pointer;
`;

export const RetryButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
