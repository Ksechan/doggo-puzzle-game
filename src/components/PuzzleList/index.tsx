import React, { useEffect, useState, useRef } from "react";
import * as Styled from "./style";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  puzzleState,
  puzzleDragState,
  puzzleDragCompleteState,
} from "../../atom/puzzleState";
import { getDelta, isTouchScreen } from "../../util";

export interface PuzzleListType {
  dataUrl: string;
  index: number;
}

export const ItemTypes = {
  PUZZLE: "puzzle",
};

const PuzzleList = () => {
  const [puzzleValue, setPuzzleValue] = useRecoilState(puzzleState);
  const setPuzzleDrag = useSetRecoilState(puzzleDragState);
  const resetPuzzleDrag = useResetRecoilState(puzzleDragState);
  const [puzzleDragCompleteValue, setPuzzleDragCompleteValue] = useRecoilState(
    puzzleDragCompleteState
  );
  const [puzzleList, setPuzzleList] = useState<PuzzleListType[]>([]);
  const [keyDown, setKeyDown] = useState(false);
  const [ready, setReady] = useState(false);
  const [puzzle, setPuzzle] = useState<PuzzleListType>({
    index: 0,
    dataUrl: "",
  });

  let clickTimeout: number | undefined;

  // 드래그 이벤트 시작
  const onStart = () => {
    const startEventName = isTouchScreen ? "touchstart" : "mousedown";
    const moveDragName = isTouchScreen ? "touchmove" : "mousemove";
    const endDragName = isTouchScreen ? "touchend" : "mouseup";

    const onDragStartHandler = (
      startEvent: TouchEvent | MouseEvent
      // puzzle: PuzzleListType
    ) => {
      const dropAreaList =
        document.querySelectorAll<HTMLElement>(".dnd-drop-area");
      const item = startEvent.target as HTMLElement;
      startEvent.stopPropagation();

      const itemRect = item.getBoundingClientRect();

      const ghostItem = item.cloneNode(true) as HTMLElement;

      ghostItem.classList.add("ghost");
      ghostItem.style.position = "fixed";
      ghostItem.style.top = `${itemRect.top}px`;
      ghostItem.style.left = `${itemRect.left}px`;
      ghostItem.style.pointerEvents = "none";
      ghostItem.style.transition = "transform 200ms ease";
      ghostItem.style.zIndex = "9999";
      document.body.style.cursor = "grabbing";
      document.body.appendChild(ghostItem);
      // 수정 필
      clickTimeout = setTimeout(() => {
        ghostItem.style.boxShadow = "0 30px 60px rgba(0, 0, 0, .3)";
        ghostItem.style.transform = "scale(1.1)";
      }, 500);

      const touchMoveHandler = (moveEvent: TouchEvent | MouseEvent) => {
        clearTimeout(clickTimeout);
        setKeyDown(false);
        const deltaX = getDelta(startEvent, moveEvent).deltaX;
        const deltaY = getDelta(startEvent, moveEvent).deltaY;

        ghostItem.style.top = `${itemRect.top + deltaY}px`;
        ghostItem.style.left = `${itemRect.left + deltaX}px`;
        if (moveEvent.cancelable) moveEvent.preventDefault();

        //--- Drop 영역 확인
        const ghostItemRect = ghostItem.getBoundingClientRect();
        const ghostCenterX = ghostItemRect.left + ghostItemRect.width / 2;
        const ghostCenterY = ghostItemRect.top + ghostItemRect.height / 2;

        const dropItem = document
          .elementFromPoint(ghostCenterX, ghostCenterY)
          ?.closest<HTMLElement>(".dnd-drop-area");

        dropAreaList.forEach((area) => {
          area.classList.remove("active");
          area.removeAttribute("style");
        });

        if (dropItem) {
          dropItem.classList.add("active");
          dropItem.style.opacity = "0.5";
        }
        //--- Drop 영역 확인 END
      };
      const touchEndHandler = () => {
        clearTimeout(clickTimeout);
        document.removeEventListener(moveDragName, touchMoveHandler);
        setKeyDown(false);
        const dropItem = document.querySelector<HTMLElement>(
          ".dnd-drop-area.active"
        );
        // const dropItemm = document.querySelector<HTMLElement>(".dnd-drop-area");
        const isComplete =
          puzzle.index - 1 ===
          Number(dropItem?.classList[dropItem.classList.length - 2]);

        if (!isComplete) {
          ghostItem.style.left = `${itemRect.left}px`;
          ghostItem.style.top = `${itemRect.top}px`;
        } else {
          setTimeout(() => {
            dropItem?.setAttribute("src", puzzle.dataUrl);
          }, 150);
          ghostItem.style.left = `${
            !!dropItem && dropItem.getBoundingClientRect().left
          }px`;
          ghostItem.style.top = `${
            !!dropItem && dropItem.getBoundingClientRect().top
          }px`;
          setPuzzleList((prev) => prev.filter((_, index) => index !== 0));
        }

        ghostItem.style.transition = "all 200ms ease";
        ghostItem.style.transform = "none";

        document.addEventListener(
          "transitionend",
          () => {
            ghostItem.remove();
            dropItem && dropItem.removeAttribute("style");
            item.removeAttribute("style");
            document.body.removeAttribute("style");
          },
          { once: true }
        );
        setReady(false);
      };

      clickTimeout = setTimeout(() => {
        document.addEventListener(moveDragName, touchMoveHandler, {
          passive: false,
        });
      }, 500);
      document.addEventListener(endDragName, touchEndHandler, { once: true });
    };

    document.addEventListener(startEventName, onDragStartHandler);
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
            <Styled.PuzzleBlock
              className="placeholder"
              key={item.index}
              onMouseDown={() => {
                if (idx === 0) {
                  setPuzzle(item);
                  setReady(true);
                }
              }}
              onTouchStart={() => {
                if (idx === 0) {
                  setPuzzle(item);
                  setReady(true);
                }
              }}
            >
              <Styled.PuzzleBlockImg src={item.dataUrl} />
            </Styled.PuzzleBlock>
          );
        })}
      </Styled.Content>
    </Styled.PuzzleBlockWrap>
  );
};

export default PuzzleList;
