import { AiFillHome } from 'react-icons/ai';
import { CiClock2 } from 'react-icons/ci';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';
import { LuDot } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BasicButton } from './BasicButton';
import { useEffect, useState } from 'react';

enum ChatNavType {
  Home,
  Room,
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
const ChatIconBox = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.color.ORANGE};
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.1) 0px 4px 6px,
    rgba(0, 0, 0, 0.15) 0px 8px 30px;
  /* box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 2px 3px; */
  position: fixed;
  right: 23px;
  bottom: 42px;

  z-index: 10;

  img {
    width: 25px;
    height: 25px;
  }
`;

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  right: 0;
  min-width: 390px;
  background-color: #fff;
  border-top: 1px solid #f2f2f2;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 0px 70px 0px rgba(0, 0, 0, 0.05);

  ul {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  li {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: center;
    color: #655f5f;

    span {
      margin-top: 3px;
      font-size: 12px;
    }
  }
`;

const ChatBody = styled.div`
  min-width: 390px;
  max-width: 390px;
  min-height: 520px;
  position: fixed;
  right: 23px;
  bottom: 114px;
  z-index: 99;
  border-radius: 24px;
  background-color: #fff;
  box-shadow:
    rgba(255, 255, 255, 0.12) 0px 0px 0px 14px inset,
    rgba(0, 0, 0, 0.03) 0px 0px 12px 0px,
    rgba(0, 0, 0, 0.2) 0px 11px 18px;
`;

/**
 * 채팅홈 스타일
 */
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

/**
 * 채팅방 스타일
 */
const ChatRoomHeader = styled.header`
  background-color: #fff;
  border-radius: 20px 20px 0 0px;
  padding: 34px 24px 0;
  font-weight: bold;
  font-size: 23px;
`;

const ChatRoomMain = styled.main`
  padding: 8px 9px;

  .default-chat-profile {
    width: 35px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: ${(props) => props.theme.color.ORANGE};
    text-align: center;

    img {
      vertical-align: middle;
      width: 40%;
      height: 40%;
    }
  }
`;

const ChatRoomMessage = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  max-height: 78px;
  padding: 18px;
  transition: all 0.3s;

  &:hover {
    background-color: #0000000d;
    border-radius: 12px;
  }

  .default-chat-message {
    border-radius: 12px;
    margin-left: 10px;
    margin-right: 20px;
    width: 314px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
  }

  .chat-room-state {
    color: #737376;
    font-size: 13px;
  }
`;

/**
 * 채팅 메세지 스타일
 */
const ChatMessageHeader = styled.header`
  background-color: ${(props) => props.theme.color.YELLOW};
  border-radius: 20px 20px 0 0px;
  padding: 0 24px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatMeetingTitle = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: #464444;

  .chat-meeting-title-contents {
    margin-left: 15px;

    .chat-list-time {
      display: flex;
      align-items: center;
      color: #7a7878;
      font-size: 14px;

      span {
        margin-left: 5px;
      }
    }
  }
`;

const ChatMessageProfile = styled.div`
  display: flex;
  margin-right: 10px;

  .Chat-message-profile {
    width: 40px;
    height: 40px;
    border: 1px solid #ffce00;
    border-radius: 50%;

    img {
      width: 100%;
    }
  }

  .Chat-message-profile:nth-child(2) {
    margin: 0 -9px;
  }
`;

const ChatPersonInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #6e6c6c;
    margin-left: 10px;
  }
`;

const ChatMessageMain = styled.main`
  padding: 20px 24px;
`;

const ChatMessageMainContents = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
  }

  .text-message-container {
  }

  .text-message {
    padding: 18px 16px;
    background-color: #f2f2f2;
    border-radius: 10px;
    margin-left: 10px;
    font-size: 15px;
  }

  .text-message-time {
    padding-left: 16px;
    margin-top: 5px;
    color: #737376;
    font-size: 13px;
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nav, setNav] = useState<ChatNavType>(ChatNavType.Home);
  const [body, setBody] = useState<JSX.Element>(Home({ goToLogin: goToLogin }));
  const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);

  const closeMessage = () => {
    setNav(ChatNavType.Room);
    setIsOpenMessage(false);
  };

  const selectChatRoom = (chatRoomId: number) => {
    setSelectedChatRoomId(chatRoomId);
    setIsOpenMessage(true);
  };

  useEffect(() => {
    switch (nav) {
      case ChatNavType.Home:
        setBody(Home({ goToLogin: goToLogin }));
        break;
      case ChatNavType.Room:
        setBody(Room({ selectChatRoom: selectChatRoom }));
        break;
    }
  }, [nav]);

  return (
    <>
      <ChatIconBox>
        <img
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          src="/src/assets/message.svg"
          alt="채팅 버튼"
        />
      </ChatIconBox>
      {isOpen === true ? (
        <ChatBody>
          {isOpenMessage === false ? (
            <>
              {body}
              <Nav>
                <ul>
                  <li
                    onClick={() => {
                      setNav(ChatNavType.Home);
                    }}
                  >
                    <AiFillHome />
                    <span>홈</span>
                  </li>
                  <li
                    onClick={() => {
                      setNav(ChatNavType.Room);
                    }}
                  >
                    <BiMessageRoundedDots />
                    <span>채팅방</span>
                  </li>
                </ul>
              </Nav>
            </>
          ) : (
            <Message chatRoomId={selectedChatRoomId} closeMessage={closeMessage} />
          )}
        </ChatBody>
      ) : (
        ''
      )}
    </>
  );
};

interface HomeProps {
  goToLogin: () => void;
}
const Home = ({ goToLogin }: HomeProps) => {
  return (
    <>
      <ChatHomeHeader>
        <img src="/src/assets/logo2.png" />
      </ChatHomeHeader>
      <ChatHomeMain>
        <div className="styled-intro-message">
          <div className="intro-message">
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

interface RoomProps {
  selectChatRoom: (chatRoomId: number) => void;
}

const Room = ({ selectChatRoom }: RoomProps) => {
  return (
    <>
      <ChatRoomHeader>
        <div>대화</div>
      </ChatRoomHeader>
      <ChatRoomMain>
        <ChatRoomMessage onClick={() => selectChatRoom(1)}>
          <div className="default-chat-profile">
            <img src="/src/assets/message.svg" alt="푸드메이트 채팅 프로필 사진" />
          </div>
          <div className="default-chat-message">
            안녕하세요. 푸드메이트 채널톡입니다. 주변의 활성화된 모임에 참여
            <div className="chat-room-state">
              <span>푸드메이트</span>
              <LuDot />
              <span>방금</span>
            </div>
          </div>
          <MdArrowForwardIos color="#F96223" />
        </ChatRoomMessage>
        <ChatRoomMessage onClick={() => selectChatRoom(2)}>
          <div className="default-chat-profile">
            <img src="/src/assets/message.svg" alt="푸드메이트 채팅 프로필 사진" />
          </div>
          <div className="default-chat-message">
            안녕하세요. 푸드메이트 채널톡입니다. 주변의 활성화된 모임에 참여
            <div className="chat-room-state">
              <span>푸드메이트</span>
              <LuDot />
              <span>방금</span>
            </div>
          </div>
          <MdArrowForwardIos color="#F96223" />
        </ChatRoomMessage>
      </ChatRoomMain>
    </>
  );
};

interface MessageProps {
  chatRoomId: number | null;
  closeMessage: () => void;
}

const Message = ({ chatRoomId, closeMessage }: MessageProps) => {
  return (
    <>
      <ChatMessageHeader>
        <ChatMeetingTitle>
          <MdArrowForwardIos onClick={() => closeMessage()} style={{ transform: 'rotate(180deg)' }} />
          <div className="chat-meeting-title-contents">
            <span>푸드메이트 (${chatRoomId})</span>
            <div className="chat-list-time">
              <CiClock2 />
              <span>30분 전</span>
            </div>
          </div>
        </ChatMeetingTitle>
        <ChatPersonInfo>
          <ChatMessageProfile>
            <div className="Chat-message-profile">
              <img src="/src/assets/chat-foodmate-default-profile.svg" />
            </div>
            <div className="Chat-message-profile">
              <img src="/src/assets/default-chat-user-profile.svg"></img>
            </div>
          </ChatMessageProfile>
          <span>2</span>
        </ChatPersonInfo>
      </ChatMessageHeader>
      <ChatMessageMain>
        <ChatMessageMainContents>
          <img src="/src/assets/chat-foodmate-default-profile.svg" alt="푸드메이트 채팅 프로필 사진" />
          <div className="text-message-container">
            <div className="text-message">
              안녕하세요. 푸드메이트 채널톡입니다. <br />
              즐거운 주변모임에 참여해보세요!
            </div>
            <div className="text-message-time">오후 1:00</div>
          </div>
        </ChatMessageMainContents>
      </ChatMessageMain>
    </>
  );
};

export default Chat;
