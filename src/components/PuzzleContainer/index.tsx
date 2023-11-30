import { useRef } from "react";
import * as Styled from "./style";
import { puzzleState } from "../../atom/puzzleState";
import { useRecoilValue } from "recoil";
import PuzzleList from "../PuzzleList";

const PuzzleContainer = () => {
  const value = useRecoilValue(puzzleState);
  const dragOverItem = useRef<HTMLLIElement | null>(null);

  const onDragStart = (index: number) => {
    // console.log(index);
  };

  const onDragEnd = (index: number) => {
    // console.log(index);
    console.log(dragOverItem.current);
  };

  const onDragDrop = () => {
    console.log(dragOverItem.current);
  };

  return (
    <>
      <Styled.Container>
        {[...Array(9).keys()].map((key) => {
          return <Styled.Content key={key} ref={dragOverItem}></Styled.Content>;
        })}
      </Styled.Container>
      <PuzzleList
        onDragStart={(index) => onDragStart(index)}
        onDragEnd={(index) => onDragEnd(index)}
        onDragDrop={onDragDrop}
      />
    </>
  );
};

export default PuzzleContainer;
