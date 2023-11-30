import { useEffect, useState, useRef } from "react";
import * as Styled from "./style";
import { useRecoilValue } from "recoil";
import { puzzleState } from "../../atom/puzzleState";

interface PuzzleListType {
  dataUrl: string;
  index: number;
}

interface PuzzleDragType {
  onDragStart: (index: number) => void;
  onDragEnd: (index: number) => void;
  onDragDrop: () => void;
}

const PuzzleList = ({ onDragStart, onDragEnd, onDragDrop }: PuzzleDragType) => {
  const puzzleValue = useRecoilValue(puzzleState);
  const [puzzleList, setPuzzleList] = useState<PuzzleListType[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setPuzzleList(puzzleValue);
  }, [puzzleValue]);

  // const onDragStart = () => {
  //   setActive(true);
  // };

  // const onDragEnd = () => {
  //   setActive(false);
  // };

  // const onDrop = () => {
  //   console.log("drop");
  // };

  return (
    <>
      <Styled.Container>
        {puzzleList.map((item) => {
          return (
            <Styled.PuzzleBlock
              key={item.index}
              draggable
              onDragStart={() => onDragStart(item.index)}
              onDragEnd={() => onDragEnd(item.index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDragDrop()}
              backgroundColor={active}
            >
              {item.index}
            </Styled.PuzzleBlock>
          );
        })}
      </Styled.Container>
      <div
        style={{ width: 50, height: 50, backgroundColor: "pink" }}
        onDrop={() => console.log("??")}
      ></div>
    </>
  );
};

export default PuzzleList;
