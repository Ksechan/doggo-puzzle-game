import { useRecoilValue } from "recoil";

import * as Styled from "./style";
import { puzzleCompleteState, puzzleState } from "../../atom/puzzleState";
import PuzzleList from "../PuzzleList";
import Header from "../Header";

const PuzzleContainer = () => {
  const puzzleCompleteValue = useRecoilValue(puzzleCompleteState);
  const puzzleValue = useRecoilValue(puzzleState);

  return (
    <Styled.Container>
      <Header />
      <Styled.PuzzleAreaWrap>
        <Styled.PuzzleArea
          $isBorder={puzzleCompleteValue}
          className="dnd-drop-wrap"
        >
          {[...Array(9).keys()].map((_, index) => {
            return (
              <Styled.Content
                className={`dnd-drop-area ${index}`}
                key={index}
                $isBorder={puzzleCompleteValue}
              />
            );
          })}
        </Styled.PuzzleArea>
        <div className="item-wrap"></div>
        <Styled.Title
          $complete={puzzleCompleteValue && puzzleValue.length === 0}
        >
          {puzzleCompleteValue && puzzleValue.length === 0
            ? "축하합니다!"
            : "퍼즐 조각"}
        </Styled.Title>
        <Styled.subtitle
          $complete={puzzleCompleteValue && puzzleValue.length === 0}
        >
          {puzzleCompleteValue && puzzleValue.length === 0
            ? "퍼즐 맞추기에 성공하셨습니다!!"
            : "조각을 꾹 눌러서 위 퍼즐판에 넣고 뺄 수 있어요!"}
        </Styled.subtitle>
        {puzzleCompleteValue && puzzleValue.length === 0 ? (
          <Styled.RetryButtonWrap>
            <Styled.Retry onClick={() => location.reload()}>
              다시하기
            </Styled.Retry>
          </Styled.RetryButtonWrap>
        ) : null}
      </Styled.PuzzleAreaWrap>
      {!puzzleCompleteValue && puzzleValue.length !== 0 ? <PuzzleList /> : null}
    </Styled.Container>
  );
};

export default PuzzleContainer;
