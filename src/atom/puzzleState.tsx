import { atom } from "recoil";

export const puzzleImageState = atom<string | null>({
  key: "puzzleImageState",
  default: null,
});

export const puzzleCompleteState = atom<boolean>({
  key: "puzzleComplete",
  default: false,
});

export const puzzleState = atom<{ index: number; dataUrl: string }[]>({
  key: "puzzleState",
  default: [],
});

export const puzzleDragState = atom<{ index: number; dataUrl: string }>({
  key: "puzzleDragState",
  default: { index: 99, dataUrl: "" },
});

export const puzzleDragCompleteState = atom<boolean>({
  key: "puzzleDragCompleteState",
  default: false,
});
