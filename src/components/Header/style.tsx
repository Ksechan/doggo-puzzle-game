import styled from "styled-components";

export const Container = styled.div`
  width: 363px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
  box-sizing: border-box;

  @media screen and (min-width: 1024px) {
    width: 480px;
    padding: 40px 20px;
  }
`;

export const LeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const RightWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;

  @media screen and (min-width: 1024px) {
    width: 32px;
    height: 32px;
  }
`;
