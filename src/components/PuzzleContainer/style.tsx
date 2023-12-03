import styled from "styled-components";

export const PuzzleAreaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const PuzzleArea = styled.div`
  background-color: #cccccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 363px;
  border-radius: 16px;
  overflow: hidden;
`;

export const Content = styled.img`
  background-color: #e9e9e9;
  width: 121px;
  height: 121px;
  border: 1px solid #ffffff;
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

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 363px;
`;

export const ListByeButton = styled.button`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #ffaa00;
  border: none;
  border-radius: 100px;
  margin-right: 16px;
  flex: 2;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
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
`;
