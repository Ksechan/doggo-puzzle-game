import React, { useEffect } from "react";
import PuzzleContainer from "../PuzzleContainer";
import ImageUploader from "../ImageUploader";
import { puzzleCompleteState, puzzleState } from "../../atom/puzzleState";
import * as Styled from "./style";
import { useRecoilValue } from "recoil";

const Puzzle = () => {
  const puzzleCompleteValue = useRecoilValue(puzzleCompleteState);
  const puzzleValue = useRecoilValue(puzzleState);

  return (
    <Styled.Container>
      <PuzzleContainer />
      {!puzzleCompleteValue && puzzleValue.length === 0 ? (
        <ImageUploader />
      ) : null}
    </Styled.Container>
  );
};

export default Puzzle;
