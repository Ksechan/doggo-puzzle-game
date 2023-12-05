import styled, { css, keyframes } from "styled-components";

export const PuzzleAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const PuzzleArea = styled.div<{ $isBorder?: boolean }>`
  background-color: #cccccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 345px;
  border-radius: 16px;
  border: ${({ $isBorder }) => ($isBorder ? "none" : "1px solid #ffffff")};
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    width: 480px;
  }
`;

export const Content = styled.div<{ $isBorder: boolean }>`
  background-color: #e9e9e9;
  width: 115px;
  height: 115px;
  border: ${({ $isBorder }) => ($isBorder ? "none" : "1px solid #ffffff")};
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    width: 160px;
    height: 160px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const completeTitle = keyframes`
  0% {
    color: red;
    transform: rotate(4deg);
  }
  25% {
    color: green;
    transform: rotate(2deg);
  }
  50% {
    color: red;
    transform: rotate(0deg);
  }
  75% {
    color: green;
    transform: rotate(-2deg);
  }
  100% {
    color: red;
    transform: rotate(-4deg);
  }
`;

export const Title = styled.p<{ $complete: boolean }>`
  font-size: 24px;
  font-weight: 700;
  margin: 32px 0 16px;
  ${({ $complete }) =>
    $complete &&
    css`
      text-align: center;
      width: 100%;
      animation: ${completeTitle} 0.6s 1s infinite linear alternate;
    `}

  @media screen and (min-width: 1024px) {
    font-size: 28px;
  }
`;

export const subtitle = styled.p<{ $complete: boolean }>`
  margin-bottom: 24px;
  font-size: 14px;
  ${({ $complete }) =>
    $complete &&
    css`
      text-align: center;
      width: 100%;
    `}

  @media screen and (min-width: 1024px) {
    font-size: 20px;
    margin-bottom: 30px;
  }
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

  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const RetryButtonWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
