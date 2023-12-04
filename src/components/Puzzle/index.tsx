import PuzzleContainer from "../PuzzleContainer";
import ImageUploader from "../ImageUploader";
import { puzzleCompleteState, puzzleState } from "../../atom/puzzleState";
import * as Styled from "./style";
import { useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";

const Puzzle = () => {
  const puzzleCompleteValue = useRecoilValue(puzzleCompleteState);
  const puzzleValue = useRecoilValue(puzzleState);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Styled.Container>
      <PuzzleContainer />
      {!puzzleCompleteValue && puzzleValue.length === 0 ? (
        <ImageUploader
          width={isDesktop ? 480 : 345}
          height={isDesktop ? 480 : 345}
        />
      ) : null}
    </Styled.Container>
  );
};

export default Puzzle;
