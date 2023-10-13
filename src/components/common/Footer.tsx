import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  background-color: #4f4f4f;
  color: #fff;
`;

const FooterLinksContainer = styled.div`
  width: 50%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #fff;
    font-size: 10px;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  }

  .privacy {
    font-weight: 400;
  }
`;

const VerticalLine = styled.div`
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  height: 25%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksContainer>
        <a href="https://github.com/withfoodmate" target="_blank">
          회사소개
        </a>
        <VerticalLine></VerticalLine>
        <a href="https://github.com/withfoodmate" target="_blank">
          인재채용
        </a>
        <VerticalLine></VerticalLine>
        <a href="https://github.com/withfoodmate" target="_blank">
          제휴제안
        </a>
        <VerticalLine></VerticalLine>
        <a className="privacy" href="https://github.com/withfoodmate" target="_blank">
          개인정보처리방침
        </a>
        <VerticalLine></VerticalLine>
        <a href="https://github.com/withfoodmate" target="_blank">
          이용약관
        </a>
        <VerticalLine></VerticalLine>
        <a href="https://github.com/withfoodmate" target="_blank">
          고객센터
        </a>
        <VerticalLine></VerticalLine>
        <a href="https://github.com/withfoodmate" target="_blank">
          ⓒFoodMate Corp.
        </a>
      </FooterLinksContainer>
    </FooterContainer>
  );
};

export default Footer;
