import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";

import * as Styled from "./style";
import { puzzleCompleteState, puzzleState } from "../../atom/puzzleState";
import { getDelta, isTouchScreen } from "../../util";

export interface PuzzleListType {
  dataUrl: string;
  index: number;
}

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
      const dropAreaList =
        document.querySelectorAll<HTMLElement>(".dnd-drop-area");

      const item = startEvent.target as HTMLElement;
      const itemRect = item.getBoundingClientRect();

      item.style.top = `${itemRect.top}px`;
      item.style.left = `${itemRect.left}px`;

      const touchMoveHandler = (moveEvent: TouchEvent | MouseEvent) => {
        // 마우스 혹은 터치 따라서 움직이는 거리 계산
        const deltaX = getDelta(startEvent, moveEvent).deltaX;
        const deltaY = getDelta(startEvent, moveEvent).deltaY;
        if (moveEvent.cancelable) moveEvent.preventDefault();

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
        clearTimeout(clickTimeout);
        document.body.classList.remove("hidden");
        setReady(false);
        document.removeEventListener(moveDragName, touchMoveHandler);
        // --- Drop 로직
        const dropItem = document.querySelector<HTMLElement>(
          ".dnd-drop-area.active"
        );
        const isComplete =
          puzzle.index - 1 ===
          Number(dropItem?.classList[dropItem.classList.length - 2]);
        const itemParent = item.parentElement?.tagName;

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
          item.style.left = `${dropItem?.getBoundingClientRect().left}px`;
          item.style.top = `${dropItem?.getBoundingClientRect().top}px`;

          if (itemParent === "BUTTON") {
            setPuzzlePassCount((prev) => prev + 1);
            const item = puzzleList.splice(0, 1);
            setPuzzleList((prev) => [...prev, item[0]]);
          }
        } else {
          item.style.left = `${itemRect.left}px`;
          item.style.top = `${itemRect.top}px`;
        }

        item.style.pointerEvents = "auto";
        document.body.style.touchAction = "auto";
        item.style.transition = "all 200ms ease";
        item.style.transform = "scale(1)";
        item.style.position = "static";
        dropItem && dropItem.removeAttribute("style");
        item.style.boxShadow = "none";
        document.body.classList.remove("hidden");
      };

      // touch and holder
      clickTimeout = setTimeout(() => {
        document.body.style.touchAction = "none";
        item.style.pointerEvents = "none";
        item.style.position = "fixed";
        item.style.transition = "transform 200ms ease";
        item.style.zIndex = "9999";
        item.style.boxShadow = "8px 8px 10px rgba(0, 0, 0, .5)";
        item.style.transform = "scale(1.15)";
        document.addEventListener(moveDragName, touchMoveHandler, {
          passive: false,
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

  // 퍼즐 섞기
  const shuffle = (array: PuzzleListType[]) => {
    let index = array.length - 1;
    while (index > 0) {
      const randomIndex = Math.floor(Math.random() * array.length);
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
      index--;
    }
    setPuzzleList(array);
  };

  // 이 사진 그만 볼래요(배열의 마지막으로)
  const onImageUnVisible = () => {
    setPuzzlePassCount((prev) => prev + 1);
    onImagePass();
  };
  // 넘기기(이 사진 그만 볼래요의 한칸 앞으로)
  const onImagePass = () => {
    const oldArray = puzzleList;
    const item = oldArray.slice(0, 1);
    const newArray = oldArray
      .slice(1, puzzleList.length - puzzlePassCount)
      .concat(item[0], oldArray.slice(puzzleList.length - puzzlePassCount));
    setPuzzleList(newArray);
  };
  // 타겟이 퍼즐판에 넘어갔는지 유무
  const getTargetParent = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    return target.parentElement?.tagName;
  };
  // 퍼즐 성공
  useEffect(() => {
    if (currentPuzzle.length === 9) {
      resetPuzzleValue();
      setPuzzleComplete(true);
    }
  }, [currentPuzzle]);

  useEffect(() => {
    shuffle([...puzzleValue]);
  }, []);
  // event 시작
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
            <Styled.PuzzleBlock
              className={`placeholder`}
              key={item.index}
              $noMargin={puzzleList.length === idx + 1}
            >
              <Styled.PuzzleBlockImg
                className={`${item.index}`}
                src={item.dataUrl}
                onMouseMove={() => clearTimeout(clickTimeout)}
                onMouseDown={(e: React.MouseEvent) => {
                  const targetParent = getTargetParent(e);
                  if (idx === 0 || targetParent === "DIV") {
                    setPuzzle(item);
                    setReady(true);
                  }
                }}
                onTouchMove={() => clearTimeout(clickTimeout)}
                onTouchStart={(e: React.TouchEvent) => {
                  const targetParent = getTargetParent(e);
                  if (idx === 0 || targetParent === "DIV") {
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
