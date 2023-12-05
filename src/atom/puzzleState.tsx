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

export const forceRerender = atom<boolean>({
  key: "forceRerender",
  default: false,
});
