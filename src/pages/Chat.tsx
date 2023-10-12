import { useCallback, useEffect, useState } from 'react';
import { BiHome, BiMessageRoundedDots, BiSolidHome, BiSolidMessageRoundedDots } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../components/chat/Home';
import Message from '../components/chat/Message';
import Room from '../components/chat/Room';

enum ChatNavType {
  Home,
  Room,
}

const ChatIconBox = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.color.ORANGE};
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.1) 0px 4px 6px,
    rgba(0, 0, 0, 0.15) 0px 8px 30px;
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
    width: 80%;
  }

  li {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #655f5f;
    outline: none;
    cursor: pointer;
    padding: 0 50px;

    span {
      margin-top: 3px;
      font-size: 13px;
    }

    &.active {
      color: #f96324;
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

const Chat = () => {
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const goToRoom = () => {
    setNav(ChatNavType.Room);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nav, setNav] = useState<ChatNavType>(ChatNavType.Home);
  const [body, setBody] = useState<JSX.Element>(Home({ goToLogin: goToLogin, goToRoom: goToRoom }));
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
        setBody(Home({ goToLogin: goToLogin, goToRoom: goToRoom }));
        break;
      case ChatNavType.Room:
        setBody(Room({ selectChatRoom: selectChatRoom }));
        break;
    }
  }, [nav, goToLogin]);

  return (
    <div>
      <ChatIconBox
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src="/src/assets/message.svg" alt="채팅 버튼" />
      </ChatIconBox>
      {isOpen === true ? (
        <ChatBody>
          {isOpenMessage === false ? (
            <>
              {body}
              <Nav>
                <ul>
                  <li
                    className={nav === ChatNavType.Home ? 'active' : ''}
                    onClick={() => {
                      setNav(ChatNavType.Home);
                    }}
                  >
                    {nav === ChatNavType.Home ? <BiSolidHome /> : <BiHome />}
                    <span>홈</span>
                  </li>
                  <li
                    className={nav === ChatNavType.Room ? 'active' : ''}
                    onClick={() => {
                      setNav(ChatNavType.Room);
                    }}
                  >
                    {nav === ChatNavType.Room ? <BiSolidMessageRoundedDots /> : <BiMessageRoundedDots />}
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
    </div>
  );
};

export default Chat;
