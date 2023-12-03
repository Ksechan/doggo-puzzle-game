import PuzzleContainer from "../PuzzleContainer";
import ImageUploader from "../ImageUploader";
import PuzzleList from "../PuzzleList";
import { puzzleState } from "../../atom/puzzleState";
import * as Styled from "./style";
import { useRecoilValue } from "recoil";

const Puzzle = () => {
  const puzzleValue = useRecoilValue(puzzleState);
  return (
    <Styled.Container>
      <PuzzleContainer />
      {puzzleValue.length === 0 && <ImageUploader />}
    </Styled.Container>
  );
};

export default Puzzle;
