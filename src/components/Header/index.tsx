import * as Styled from "./style";
import close from "../../assets/close.svg";
import refresh from "../../assets/refresh.svg";
import button from "../../assets/button.svg";
import { forceRerender } from "../../atom/puzzleState";
import { useRecoilState } from "recoil";

const Header = () => {
  const [forceRerenderValue, setForceRerenderValue] =
    useRecoilState(forceRerender);

  const onCloseHandler = () => {
    if (window.confirm("처음부터 다시 할까요?")) {
      location.reload();
    } else {
      return;
    }
  };

  return (
    <Styled.Container>
      <Styled.LeftWrap
        onClick={(e) => {
          e.stopPropagation();
          onCloseHandler();
        }}
      >
        <Styled.Icon src={close} />
      </Styled.LeftWrap>
      <Styled.RightWrap>
        <Styled.IconButton
          onClick={() => setForceRerenderValue(!forceRerenderValue)}
        >
          <Styled.Icon src={refresh} $marginRight />
        </Styled.IconButton>
        <Styled.IconButton
          onClick={(e) => {
            e.stopPropagation();
            alert(`댕댕이 퍼즐입니다!\n퍼즐조각을 옮겨 완성시켜보세요`);
          }}
        >
          <Styled.Icon src={button} />
        </Styled.IconButton>
      </Styled.RightWrap>
    </Styled.Container>
  );
};

export default Header;
