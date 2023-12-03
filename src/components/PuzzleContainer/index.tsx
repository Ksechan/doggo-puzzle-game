import { useRef, DragEvent } from "react";
import * as Styled from "./style";
import {
  puzzleDragState,
  puzzleState,
  puzzleDragCompleteState,
} from "../../atom/puzzleState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PuzzleList from "../PuzzleList";
import Header from "../Header";

const PuzzleContainer = () => {
  const value = useRecoilValue(puzzleState);
  // const dragValue = useRecoilValue(puzzleDragState);
  // const dragComplete = useSetRecoilState(puzzleDragCompleteState);

  return (
    <Styled.Container>
      <Header />
      <Styled.PuzzleAreaWrap>
        <Styled.PuzzleArea>
          {[...Array(9).keys()].map((key, index) => {
            return (
              <Styled.Content
                className={`dnd-drop-area ${index}`}
                key={index}
              />
            );
          })}
        </Styled.PuzzleArea>
        <Styled.Title>퍼즐 조각</Styled.Title>
        <Styled.subtitle>
          조각을 꾹 눌러서 위 퍼즐판에 넣고 뺄 수 있어요!
        </Styled.subtitle>
      </Styled.PuzzleAreaWrap>
      {value.length > 0 && (
        <>
          <PuzzleList />
          <Styled.ButtonWrap>
            <Styled.ListByeButton>이 사진 그만 볼래요</Styled.ListByeButton>
            <Styled.ListPassButton>넘기기</Styled.ListPassButton>
          </Styled.ButtonWrap>
        </>
      )}
    </Styled.Container>
  );
};

export default PuzzleContainer;
