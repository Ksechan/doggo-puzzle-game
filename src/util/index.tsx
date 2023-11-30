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
      canvas.width = width;
      canvas.height = height;
      context?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
    img.src = image as string;
  });
};
