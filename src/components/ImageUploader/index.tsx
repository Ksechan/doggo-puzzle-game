import { useSetRecoilState } from "recoil";

import * as Styled from "./style";
import { resizeImage } from "../../util";
import {
  puzzleCompleteState,
  puzzleImageState,
  puzzleState,
} from "../../atom/puzzleState";

const ImageUploader = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const setSelectedImg = useSetRecoilState(puzzleImageState);
  const setPuzzleComplete = useSetRecoilState(puzzleCompleteState);
  const setPuzzleState = useSetRecoilState(puzzleState);

  const splitImage = async (image: string | null) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const imageObj = new Image();

    return new Promise<{ index: number; dataUrl: string }[]>((resolve) => {
      imageObj.onload = () => {
        const pieceWidth = imageObj.width / 3;
        const pieceHeight = imageObj.height / 3;

        const pieces: { index: number; dataUrl: string }[] = [];

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            context?.drawImage(
              imageObj,
              col * pieceWidth,
              row * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );

            const pieceDataUrl = canvas.toDataURL();
            const pieceIndex = row * 3 + col + 1;
            pieces.push({
              index: pieceIndex,
              dataUrl: pieceDataUrl,
            });
          }
        }
        resolve(pieces);
      };

      imageObj.src = image as string;
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const resizedImage = await resizeImage(
          reader.result as string,
          width,
          height
        );
        setSelectedImg(resizedImage);

        const pieces = await splitImage(resizedImage);

        setPuzzleState(pieces);
        setPuzzleComplete(false);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Styled.UploadButton htmlFor="image-input">
        사진을 선택해주세요
      </Styled.UploadButton>
      <Styled.Input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUploader;
