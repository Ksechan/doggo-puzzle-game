import React, { useEffect, useState, useRef } from "react";
import * as Styled from "./style";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  puzzleState,
  puzzleDragState,
  puzzleDragCompleteState,
} from "../../atom/puzzleState";

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
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [touchStart, setTouchStart] = useState(false);

  // PC
  const onDragStart = (item: PuzzleListType) => {
    setPuzzleDrag(item);
  };

  const onDragEnd = () => {
    puzzleDragCompleteValue
      ? setPuzzleList((prev) => prev.filter((_, index) => index !== 0))
      : null;
    resetPuzzleDrag();
    setPuzzleDragCompleteValue(false);
  };

  // 모바일
  const onTouchStart = (e: React.TouchEvent, puzzle: PuzzleListType) => {
    setPuzzleDrag(puzzle);
    const dropAreaList =
      document.querySelectorAll<HTMLElement>(".dnd-drop-area");
    setTouchStart(true);
    const item = e.currentTarget as HTMLElement;
    // if (
    //   !item.classList.contains("dnd-drag-item") ||
    //   item.classList.contains("ghost") ||
    //   item.classList.contains("placeholder")
    // ) {
    //   return;
    // }

    const itemRect = item.getBoundingClientRect();

    // --- 이동 아이템 만들기 시작
    const ghostItem = item.cloneNode(true) as HTMLElement;
    ghostItem.classList.add("ghost");
    ghostItem.style.position = "fixed";
    ghostItem.style.top = `${itemRect.top}px`;
    ghostItem.style.left = `${itemRect.left}px`;
    ghostItem.style.pointerEvents = "none";
    ghostItem.style.textShadow = "0 30px 60px rgba(0, 0, 0, .3)";
    ghostItem.style.transform = "scale(1.05)";
    ghostItem.style.transition = "transform 200ms ease";

    item.style.opacity = "0.5";
    item.style.cursor = "grabbing";

    document.body.style.cursor = "grabbing";
    document.body.appendChild(ghostItem);
    // --- 이동 아이템 만들기 끝

    const touchMoveHandler = (moveEvent: TouchEvent) => {
      // setPosition({
      //   x: moveEvent.touches[0].pageX - e.touches[0].pageX,
      //   y: moveEvent.touches[0].pageY - e.touches[0].pageY,
      // });
      const deltaX = moveEvent.touches[0].pageX - e.touches[0].pageX;
      const deltaY = moveEvent.touches[0].pageY - e.touches[0].pageY;

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
        dropItem.style.filter = "drop-shadow(16px 16px 16px gray)";
      }
      //--- Drop 영역 확인 END
    };
    const touchEndHandler = (endEvent: TouchEvent) => {
      const dropItem = document.querySelector<HTMLElement>(
        ".dnd-drop-area.active"
      );
      const isCorrect =
        puzzle.index - 1 ===
        Number(dropItem?.classList[dropItem.classList.length - 2]);

      isCorrect ? dropItem?.setAttribute("src", puzzle.dataUrl) : null;

      // 수정필
      ghostItem.style.left = `${itemRect.left}px`;
      ghostItem.style.top = `${itemRect.top}px`;

      ghostItem.style.transition = "all 200ms ease";
      ghostItem.style.transform = "none";

      document.addEventListener(
        "transitionend",
        () => {
          item.removeAttribute("style");
          document.body.removeAttribute("style");
          ghostItem.remove();
        },
        { once: true }
      );
      // setPosition({
      //   x: 0,
      //   y: 0,
      // });

      setTouchStart(false);
    };

    document.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });
    document.addEventListener("touchend", touchEndHandler, { once: true });
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

  return (
    <>
      <Styled.Container>
        {puzzleList.map((item, idx) => {
          return (
            <Styled.PuzzleBlock
              key={item.index}
              draggable
              onDragStart={(e) => {
                if (idx !== 0) {
                  e.preventDefault();
                }
                onDragStart(item);
              }}
              onDragEnd={() => {
                onDragEnd();
              }}
              onTouchStart={(e) => idx === 0 && onTouchStart(e, item)}
              style={{
                transform: `${
                  idx === 0 &&
                  `translateX(${position.x}px) translateY(${position.y}px)`
                }`,
                transition: `${!touchStart && "all 200ms ease"}`,
                zIndex: 9999,
              }}
            >
              <img src={item.dataUrl} style={{ width: 100, height: 100 }} />
            </Styled.PuzzleBlock>
          );
        })}
      </Styled.Container>
    </>
  );
};

export default PuzzleList;
