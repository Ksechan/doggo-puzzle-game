export const resizeImage = (
  image: string | ArrayBuffer | null,
  width: number,
  height: number
) => {
  return new Promise<string | null>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const scaleFactor = Math.min(width / img.width, height / img.height);
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;
      canvas.width = width;
      canvas.height = height;
      const x = (width - newWidth) / 2;
      const y = (height - newHeight) / 2;
      context?.drawImage(img, x, y, newWidth, newHeight);
      resolve(canvas.toDataURL());
    };
    img.src = image as string;
  });
};

export const isTouchScreen = window.matchMedia(
  "(hover: none) and (pointer: coarse)"
).matches;

// 마우스 움직임 변화를 측정하는 유틸
export const getDelta = (
  startEvent: MouseEvent | TouchEvent,
  moveEvent: MouseEvent | TouchEvent
) => {
  if (isTouchScreen) {
    const start = startEvent as TouchEvent;
    const move = moveEvent as TouchEvent;

    return {
      deltaX: move.touches[0].pageX - start.touches[0].pageX,
      deltaY: move.touches[0].pageY - start.touches[0].pageY,
    };
  }

  const start = startEvent as MouseEvent;
  const move = moveEvent as MouseEvent;

  return {
    deltaX: move.clientX - start.clientX,
    deltaY: move.clientY - start.clientY,
  };
};
