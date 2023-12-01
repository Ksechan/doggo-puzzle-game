import { useRef, DragEvent } from "react";
import * as Styled from "./style";
import {
  puzzleDragState,
  puzzleState,
  puzzleDragCompleteState,
} from "../../atom/puzzleState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PuzzleList from "../PuzzleList";

const PuzzleContainer = () => {
  const value = useRecoilValue(puzzleState);
  const dragValue = useRecoilValue(puzzleDragState);
  const dragComplete = useSetRecoilState(puzzleDragCompleteState);

  const onDragDrop = (index: number, event: DragEvent<HTMLImageElement>) => {
    const element = event.target as HTMLImageElement;
    if (dragValue.index - 1 === index) {
      element.setAttribute("src", dragValue.dataUrl);
      dragComplete(true);
    }
  };

  return (
    <>
      <Styled.Container>
        {[...Array(9).keys()].map((key, index) => {
          return (
            <Styled.Content
              className={`dnd-drop-area ${index}`}
              key={index}
              onDrop={(event) => {
                onDragDrop(index, event);
              }}
              onDragOver={(e) => e.preventDefault()}
            />
          );
        })}
        {value.length > 0 && <PuzzleList />}
      </Styled.Container>
    </>
  );
};

export default PuzzleContainer;
