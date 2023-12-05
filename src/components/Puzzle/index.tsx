import { useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";

import * as Styled from "./style";
import PuzzleContainer from "../PuzzleContainer";
import ImageUploader from "../ImageUploader";
import {
  forceRerender,
  puzzleCompleteState,
  puzzleState,
} from "../../atom/puzzleState";

const Puzzle = () => {
  const puzzleCompleteValue = useRecoilValue(puzzleCompleteState);
  const puzzleValue = useRecoilValue(puzzleState);
  const forceRerenderValue = useRecoilValue(forceRerender);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Styled.Container>
      <PuzzleContainer key={forceRerenderValue ? "forceRerender" : "normal"} />
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
