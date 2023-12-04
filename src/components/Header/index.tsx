import * as Styled from "./style";
import close from "../../assets/close.svg";
import refresh from "../../assets/refresh.svg";

const Header = () => {
  return (
    <Styled.Container>
      <Styled.LeftWrap>
        <Styled.Icon src={close} />
      </Styled.LeftWrap>
      <Styled.RightWrap onClick={() => location.reload()}>
        <Styled.Icon src={refresh} />
      </Styled.RightWrap>
    </Styled.Container>
  );
};

export default Header;
