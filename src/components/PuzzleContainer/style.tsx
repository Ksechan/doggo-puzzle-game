import styled from "styled-components";

export const Container = styled.ul`
  background-color: #cccccc;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 500px;
`;

export const Content = styled.li`
  background-color: #ffffff;
  width: 30px;
  height: 30px;
`;
