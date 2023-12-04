import { useEffect, useState } from "react";
import * as Styled from "./style";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { puzzleCompleteState, puzzleState } from "../../atom/puzzleState";
import { getDelta, isTouchScreen } from "../../util";

export interface PuzzleListType {
  dataUrl: string;
  index: number;
}

export const ItemTypes = {
  PUZZLE: "puzzle",
};

const PuzzleList = () => {
  const puzzleValue = useRecoilValue(puzzleState);
  const resetPuzzleValue = useResetRecoilState(puzzleState);
  const setPuzzleComplete = useSetRecoilState(puzzleCompleteState);
  const [puzzleList, setPuzzleList] = useState<PuzzleListType[]>([]);
  const [ready, setReady] = useState(false);
  const [puzzle, setPuzzle] = useState<PuzzleListType>({
    index: 0,
    dataUrl: "",
  });
  const [puzzlePassCount, setPuzzlePassCount] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<number[]>([]);

  let clickTimeout: number | undefined;

  // 드래그 이벤트 시작
  const onStart = () => {
    const startEventName = isTouchScreen ? "touchstart" : "mousedown";
    const moveDragName = isTouchScreen ? "touchmove" : "mousemove";
    const endDragName = isTouchScreen ? "touchend" : "mouseup";

    const onDragStartHandler = (startEvent: TouchEvent | MouseEvent) => {
      document.body.classList.add("hidden");
      const dropAreaList =
        document.querySelectorAll<HTMLElement>(".dnd-drop-area");
      const item = startEvent.target as HTMLElement;
      console.log(startEvent);

      const itemRect = item.getBoundingClientRect();

      item.style.position = "fixed";
      item.style.top = `${itemRect.top}px`;
      item.style.left = `${itemRect.left}px`;
      item.style.transition = "transform 200ms ease";
      item.style.pointerEvents = "none";
      // 수정필요 두번터치해야함
      document.body.style.touchAction = "none";
      item.style.zIndex = "9999";
      item.classList.add(puzzle.index.toString());

      const touchMoveHandler = (moveEvent: TouchEvent | MouseEvent) => {
        clearTimeout(clickTimeout);
        if (moveEvent.cancelable) moveEvent.preventDefault();
        const deltaX = getDelta(startEvent, moveEvent).deltaX;
        const deltaY = getDelta(startEvent, moveEvent).deltaY;

        item.style.top = `${itemRect.top + deltaY}px`;
        item.style.left = `${itemRect.left + deltaX}px`;

        //--- Drop 영역 확인
        const itemCurrentRect = item.getBoundingClientRect();
        const itemCenterX = itemCurrentRect.left + itemCurrentRect.width / 2;
        const itemCenterY = itemCurrentRect.top + itemCurrentRect.height / 2;

        const dropItem = document
          .elementFromPoint(itemCenterX, itemCenterY)
          ?.closest<HTMLElement>(".dnd-drop-area");

        dropAreaList.forEach((area) => {
          area.classList.remove("active");
          area.removeAttribute("style");
        });

        if (dropItem) {
          dropItem.classList.add("active");
        }
        //--- Drop 영역 확인 END
      };
      const touchEndHandler = () => {
        document.body.classList.remove("hidden");
        setReady(false);
        clearTimeout(clickTimeout);
        document.removeEventListener(moveDragName, touchMoveHandler);

        const dropItem = document.querySelector<HTMLElement>(
          ".dnd-drop-area.active"
        );

        const isComplete =
          puzzle.index - 1 ===
          Number(dropItem?.classList[dropItem.classList.length - 2]);

        // 제자리로 돌아가기
        if (dropItem && !dropItem.firstChild) {
          if (isComplete) {
            setCurrentPuzzle((prev) => [...prev, puzzle.index]);
          } else {
            setCurrentPuzzle((prev) =>
              prev.filter((item) => item !== puzzle.index)
            );
          }
          dropItem?.appendChild(item);
          onImagePass();

          item.style.left = `${dropItem?.getBoundingClientRect().left}px`;
          item.style.top = `${dropItem?.getBoundingClientRect().top}px`;
        } else {
          item.style.left = `${itemRect.left}px`;
          item.style.top = `${itemRect.top}px`;
        }

        item.style.transition = "all 200ms ease";
        item.style.transform = "none";

        document.addEventListener(
          "transitionend",
          () => {
            dropItem && dropItem.removeAttribute("style");
            item.style.position = "static";
            item.style.boxShadow = "none";
            item.style.transform = "scale(1)";
            item.style.pointerEvents = "auto";
            document.body.style.touchAction = "unset";
            document.body.classList.remove("hidden");
          },
          { once: true }
        );
      };

      // touch and holder
      clickTimeout = setTimeout(() => {
        item.style.boxShadow = "0 30px 60px rgba(0, 0, 0, .3)";
        item.style.transform = "scale(1.1)";
        document.addEventListener(moveDragName, touchMoveHandler, {
          passive: true,
        });
      }, 500);
      document.addEventListener(endDragName, touchEndHandler, { once: true });
    };

    document.addEventListener(startEventName, onDragStartHandler, {
      passive: false,
    });
    return () =>
      document.removeEventListener(startEventName, onDragStartHandler);
  };

  const shuffle = (array: PuzzleListType[]) => {
    let index = array.length - 1;
    while (index > 0) {
      const randomIndex = Math.floor(Math.random() * array.length);
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
      index--;
    }
    setPuzzleList(array);
  };

  const onImageUnVisible = () => {
    setPuzzlePassCount((prev) => prev + 1);
    const item = puzzleList.splice(0, 1);
    setPuzzleList((prev) => [...prev, item[0]]);
  };

  const onImagePass = () => {
    const oldArray = puzzleList;
    const item = oldArray.slice(0, 1);
    const newArray = oldArray
      .slice(1, puzzleList.length - puzzlePassCount)
      .concat(item[0], oldArray.slice(puzzleList.length - puzzlePassCount));
    setPuzzleList(newArray);
  };

  useEffect(() => {
    if (currentPuzzle.length === 9) {
      resetPuzzleValue();
      setPuzzleComplete(true);
    }
  }, [currentPuzzle]);

  useEffect(() => {
    shuffle([...puzzleValue]);
  }, []);

  useEffect(() => {
    if (ready) {
      const cleanup = onStart();

      return () => cleanup();
    }
  }, [ready]);

  return (
    <Styled.PuzzleBlockWrap>
      <Styled.Content>
        {puzzleList.map((item, idx) => {
          return (
            <Styled.PuzzleBlock className="placeholder" key={item.index}>
              <Styled.PuzzleBlockImg
                className={`${idx}`}
                src={item.dataUrl}
                onMouseDown={() => {
                  setPuzzle(item);
                  setReady(true);
                }}
                onTouchStart={() => {
                  if (idx === 0) {
                    setPuzzle(item);
                    setReady(true);
                  }
                }}
              />
            </Styled.PuzzleBlock>
          );
        })}
      </Styled.Content>
      <Styled.ButtonWrap>
        <Styled.ListByeButton type="button" onClick={onImageUnVisible}>
          이 사진 그만 볼래요
        </Styled.ListByeButton>
        <Styled.ListPassButton type="button" onClick={onImagePass}>
          넘기기
        </Styled.ListPassButton>
      </Styled.ButtonWrap>
    </Styled.PuzzleBlockWrap>
  );
};

export default PuzzleList;
