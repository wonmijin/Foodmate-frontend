import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #4f4f4f;
  color: #fff;

  @media only screen and (max-width: 992px) {
    padding-bottom: 8px;
  }
`;

const FooterLinksContainer = styled.div`
  padding: var(--basic-padding);

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 992px) {
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 768px) {
    padding: 10px;
    justify-content: center;
  }

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

const FooterContents = styled.ul`
  display: flex;
  justify-content: center;
  padding: 8px 0;

  @media only screen and (min-width: 992px) {
    width: 66.66666664%;
  }
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }

  > li:not(:last-child) {
    margin-right: 1rem;
  }
`;

const CopyRight = styled.div`
  font-size: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksContainer>
        <FooterContents>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              회사소개
            </a>
          </li>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              인재채용
            </a>
          </li>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              제휴제안
            </a>
          </li>
          <li>
            <a className="privacy" href="https://github.com/withfoodmate" target="_blank">
              개인정보처리방침
            </a>
          </li>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              이용약관
            </a>
          </li>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              고객센터
            </a>
          </li>
          <li>
            <a href="https://github.com/withfoodmate" target="_blank">
              이메일 무단수집 거부
            </a>
          </li>
        </FooterContents>
        <CopyRight>ⓒFoodMate Corp.</CopyRight>
      </FooterLinksContainer>
    </FooterContainer>
  );
};

export default Footer;
