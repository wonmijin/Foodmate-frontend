import styled from 'styled-components';
import { BasicButton } from '../common/BasicButton';
import { MdArrowForwardIos } from 'react-icons/md';

interface HomeProps {
  goToLogin: () => void;
  goToRoom: () => void;
}

const ChatHomeHeader = styled.header`
  background-color: ${(props) => props.theme.color.YELLOW};
  text-align: center;
  border-radius: 20px 20px 0 0px;
  padding-top: 75px;
  padding-bottom: 10px;

  img {
    width: 185px;
    height: 54px;
  }
`;

const ChatHomeMain = styled.main`
  background: linear-gradient(180deg, #ffce00 0%, #ffdc4b 10.42%, #fff 35.34%);
  padding: 30px 9px;

  .mini-message-icon {
    border-radius: 24px;
    background-color: ${(props) => props.theme.color.ORANGE};
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .styled-intro-message {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    background-color: #fff;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.1);
  }

  .intro-message {
    margin: 10px;
    border-radius: 8px;
    padding: 22px 17px;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    padding: 22px 24px;

    > p {
      font-weight: bold;
    }
  }

  .intro-basic-message {
    margin-left: 10px;
    margin-right: 20px;
    font-size: 13px;
  }

  .go-to-login-btn {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding-bottom: 100px;
  }
`;

const IntroMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const Home = ({ goToLogin, goToRoom }: HomeProps) => {
  return (
    <>
      <ChatHomeHeader>
        <img src="/src/assets/logo2.png" />
      </ChatHomeHeader>
      <ChatHomeMain>
        <div className="styled-intro-message">
          <div onClick={() => goToRoom()} className="intro-message">
            <p>Recent message</p>
            <IntroMessage>
              <div className="mini-message-icon">
                <img src="/src/assets/message.svg" alt="" />
              </div>
              <div className="intro-basic-message">
                안녕하세요. 푸드메이트 채널톡입니다. <br />
                즐거운 주변모임에 참여해보세요!
              </div>
              <MdArrowForwardIos />
            </IntroMessage>
          </div>
        </div>
        <div className="go-to-login-btn">
          <BasicButton
            $borderColor="transparent"
            $hoverBackgdColor="#fb8958"
            $fontSize="16px"
            $fontColor="#fff"
            $backgdColor="#F96324"
            onClick={() => goToLogin()}
          >
            로그인 하러가기
          </BasicButton>
        </div>
      </ChatHomeMain>
    </>
  );
};

export default Home;
