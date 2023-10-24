import { useState } from 'react';
import { BiHome, BiMessageRoundedDots, BiSolidHome, BiSolidMessageRoundedDots } from 'react-icons/bi';
import styled from 'styled-components';
import MessageBtn from '../assets/message.svg';
import Home from '../components/chat/Home';
import Message from '../components/chat/Message';
import Room from '../components/chat/Room';
import ChatNavType from '../constants/chatNavType';
import { ChatroomType } from '../types/chatroomType';

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
  right: 2%;
  bottom: 4%;

  z-index: 10;

  @media only screen and (max-width: 414px) {
    position: fixed;
    bottom: 83px;
    right: 8px;
  }

  img {
    width: 25px;
    height: 25px;
  }
`;

const Nav = styled.nav`
  min-width: 390px;
  background-color: #fff;
  border-top: 1px solid #f2f2f2;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 0px 70px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 0;
  height: 63px;

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
  height: 76%;
  max-height: 690px;
  position: fixed;
  right: 2%;
  bottom: 98px;
  z-index: 99;
  border-radius: 24px;
  background-color: #fff;
  box-shadow:
    rgba(255, 255, 255, 0.12) 0px 0px 0px 14px inset,
    rgba(0, 0, 0, 0.03) 0px 0px 12px 0px,
    rgba(0, 0, 0, 0.2) 0px 11px 18px;

  @media only screen and (max-width: 414px) {
    bottom: 151px;
  }
`;

const Chat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nav, setNav] = useState<ChatNavType>(ChatNavType.Home);
  const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatroomType | null>(null);

  const closeMessage = () => {
    setNav(ChatNavType.Room);
    setIsOpenMessage(false);
  };

  const selectChatRoom = (chatRoom: ChatroomType) => {
    setSelectedChatRoom(chatRoom);
    setIsOpenMessage(true);
  };

  return (
    <div>
      <ChatIconBox
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={MessageBtn} alt="채팅 버튼" />
      </ChatIconBox>
      {isOpen === true ? (
        <ChatBody>
          {isOpenMessage === false ? (
            <>
              {nav === ChatNavType.Home ? (
                <Home selectChatRoom={selectChatRoom} />
              ) : (
                <Room selectChatRoom={selectChatRoom} />
              )}
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
          ) : selectedChatRoom !== null ? (
            <Message chatRoom={selectedChatRoom} closeMessage={closeMessage} />
          ) : (
            ''
          )}
        </ChatBody>
      ) : (
        ''
      )}
    </div>
  );
};

export default Chat;
