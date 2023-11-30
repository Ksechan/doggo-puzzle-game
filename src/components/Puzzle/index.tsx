import PuzzleContainer from "../PuzzleContainer";
import ImageUploader from "../ImageUploader";
import PuzzleList from "../PuzzleList";
import * as Styled from "./style";

const Puzzle = () => {
  return (
    <Styled.Container>
      <PuzzleContainer />
      <ImageUploader />
    </Styled.Container>
  );
};

export default Puzzle;
