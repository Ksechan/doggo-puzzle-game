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
      const item = startEvent.target as HTMLElement;
      const itemRect = item.getBoundingClientRect();

      const dropAreaList =
        document.querySelectorAll<HTMLElement>(".dnd-drop-area");
      const listArea = document.querySelectorAll<HTMLElement>(".placeholder");
      const listWrapArea = document.querySelector<HTMLElement>(".list-area");

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
        // 퍼즐조각 리스트 드랍영역
        const listWrapArea = document
          .elementFromPoint(itemCenterX, itemCenterY)
          ?.closest<HTMLElement>(".list-area");
        const listItemArea = document
          .elementFromPoint(itemCenterX, itemCenterY)
          ?.closest<HTMLElement>(".placeholder");

        dropAreaList.forEach((area) => {
          area.classList.remove("active");
          area.removeAttribute("style");
        });
        listArea.forEach((area) => {
          area.classList.remove("active");
          area.removeAttribute("style");
        });

        if (dropItem) {
          dropItem.classList.add("active");
        }
        if (listWrapArea && item.parentElement?.tagName === "DIV") {
          listWrapArea.classList.add("active");
        }
        if (listItemArea) {
          listItemArea.classList.add("active");
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

        const listItemActive = document.querySelector<HTMLElement>(
          ".placeholder.active"
        );

        const isComplete =
          puzzle.index - 1 ===
          Number(dropItem?.classList[dropItem.classList.length - 2]);
        const itemParent = item.parentElement;
        // console.log(item.classList);
        const oldItem = dropItem?.childNodes[0] as HTMLElement;

        // Drop
        if (dropItem) {
          if (isComplete) {
            setCurrentPuzzle((prev) => [...prev, puzzle.index]);
          } else {
            setCurrentPuzzle((prev) =>
              prev.filter((item) => item !== puzzle.index)
            );
          }

          if (itemParent?.tagName === "DIV") {
            // 퍼즐판 내에서 자리이동
            if (oldItem) {
              itemParent?.appendChild(oldItem);
              oldItem.style.position = "fixed";
              oldItem.style.left = `${itemRect.left}px`;
              oldItem.style.top = `${itemRect.top}px`;
              // 퍼즐판에 맞는지 파악
              const oldItemIndex = Number(oldItem?.classList[2]);
              const oldItemParent =
                oldItem.parentElement?.classList[
                  oldItem.parentElement?.classList.length - 1
                ];
              const oldItemIsComplete =
                oldItemIndex - 1 === Number(oldItemParent);

              if (oldItemIsComplete) {
                console.log("oldcom");
                const duplicatedPuzzle = currentPuzzle.find(
                  (item) => item === oldItemIndex
                );
                duplicatedPuzzle
                  ? null
                  : setCurrentPuzzle((prev) => [...prev, oldItemIndex]);
              } else {
                console.log("oldnonb");
                setCurrentPuzzle((prev) =>
                  prev.filter((item) => item !== oldItemIndex)
                );
              }
            }
            dropItem?.appendChild(item);
            item.style.left = `${dropItem?.getBoundingClientRect().left}px`;
            item.style.top = `${dropItem?.getBoundingClientRect().top}px`;
          }
          // 퍼즐조각 리스트에서 퍼즐판으로 이동
          if (itemParent?.tagName === "BUTTON" && !dropItem.firstChild) {
            dropItem?.appendChild(item);
            item.style.left = `${dropItem?.getBoundingClientRect().left}px`;
            item.style.top = `${dropItem?.getBoundingClientRect().top}px`;
            setPuzzlePassCount((prev) => prev + 1);
            const spliceItem = puzzleList.splice(0, 1);
            setPuzzleList((prev) => [...prev, spliceItem[0]]);
          }
          // 퍼즐판에서 퍼즐조각리스트로 이동
        } else if (listItemActive) {
          if (!listItemActive.firstChild) {
            listItemActive.appendChild(item);
          }
          const newNode = listItemActive.cloneNode(false) as HTMLElement;
          newNode.classList.remove("active");
          newNode.appendChild(item);
          listItemActive.after(newNode);
        } else {
          // 제자리로
          item.style.left = `${itemRect.left}px`;
          item.style.top = `${itemRect.top}px`;
        }

        item.style.transition = "all 200ms ease";
        item.style.pointerEvents = "auto";
        item.style.transform = "none";
        // 애니메이션효과를 위한 작업
        setTimeout(() => {
          item.style.position = "static";
        }, 200);
        item.style.boxShadow = "none";
        dropItem && dropItem.removeAttribute("style");
        dropItem?.classList.remove("active");
        document.body.style.touchAction = "auto";
        document.body.classList.remove("hidden");
        listWrapArea?.classList.remove("active");
        if (oldItem) {
          oldItem.style.transition = "all 200ms ease";
          setTimeout(() => {
            oldItem.style.position = "static";
          }, 200);
        }
        item.style.zIndex = "9998";
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
    if (puzzlePassCount < 9) {
      setPuzzlePassCount((prev) => prev + 1);
      onImagePass();
    }
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

  // 퍼즐판에 들어가있는 퍼즐조각의 갯수
  const childCount = () => {
    const currentList = document.querySelectorAll<HTMLElement>(".placeholder");
    let child = 0;
    currentList.forEach((area) =>
      area.childElementCount !== 0 ? ++child : null
    );
    return child;
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
      <Styled.Content className="list-area">
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
        <Styled.ListByeButton
          type="button"
          onClick={() => {
            if (childCount() !== 0) {
              onImageUnVisible();
            }
          }}
        >
          이 사진 그만 볼래요
        </Styled.ListByeButton>
        <Styled.ListPassButton
          type="button"
          onClick={() => {
            if (childCount() !== 0) {
              onImagePass();
            }
          }}
        >
          넘기기
        </Styled.ListPassButton>
      </Styled.ButtonWrap>
    </Styled.PuzzleBlockWrap>
  );
};

export default PuzzleList;
