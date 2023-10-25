import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/logo2.png';
import ChatMessageSvg from '../../assets/chat-foodmate-default-profile.svg';
import { BasicButton } from '../common/BasicButton';
import { isSignenIn } from '../../store/login';
import { useRecoilValue } from 'recoil';
import MemberThumbnail from './MemberThumbnail';
import { useChatroomList } from '../../hooks/useChatroomList';
import { ChatroomType } from '../../types/chatroomType';
import { useState, useEffect } from 'react';

interface HomeProps {
  selectChatRoom: (chatRoom: ChatroomType) => void;
}

const ChatHomeContainer = styled.div`
  height: calc(100% - 63px);
  display: grid;
  grid-template-rows: auto 1fr;
`;

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
  padding: 10px 9px;
  border-radius: 0 0 24px 24px;

  .mini-message-icon {
    border-radius: 24px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 35px;
      height: 35px;
    }
  }

  .styled-intro-message {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    background-color: #fff;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .intro-message {
    margin: 10px;
    border-radius: 8px;
    padding: 22px 24px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    > p {
      font-weight: bold;
    }
  }

  .intro-basic-message {
    margin-left: 10px;
    font-size: 13px;
    width: 100%;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    > svg {
      margin-left: 20px;
    }
  }

  .go-to-login-btn {
    display: flex;
    flex-direction: column;
    margin-top: 13px;
  }

  .chat-home-main-contents {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
`;

const IntroMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Home = ({ selectChatRoom }: HomeProps) => {
  const navigate = useNavigate();
  const isSignedIn = useRecoilValue(isSignenIn);

  return (
    <ChatHomeContainer>
      <ChatHomeHeader>
        <img src={Logo} alt="푸드메이트 로고" />
      </ChatHomeHeader>
      <ChatHomeMain>
        <div className="chat-home-main-contents">
          {isSignedIn === false ? (
            <>
              <div className="styled-intro-message">
                <div className="intro-message">
                  <p>Recent message</p>
                  <IntroMessage>
                    <div className="mini-message-icon">
                      <img src={ChatMessageSvg} alt="" />
                    </div>
                    <div className="intro-basic-message">
                      안녕하세요. 푸드메이트 채널톡입니다. <br />
                      즐거운 주변모임에 참여해보세요!
                    </div>
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
                  onClick={() => navigate('/login')}
                >
                  로그인 하러가기
                </BasicButton>
              </div>
            </>
          ) : (
            <RecentChatroomMessage selectChatRoom={selectChatRoom} />
          )}
        </div>
      </ChatHomeMain>
    </ChatHomeContainer>
  );
};

interface RecentChatroomMessageProps {
  selectChatRoom: (chatRoom: ChatroomType) => void;
}

const RecentChatroomMessage = ({ selectChatRoom }: RecentChatroomMessageProps) => {
  const { data: chatroomList, status } = useChatroomList();
  const [recentChatroom, setRecentChatroom] = useState<ChatroomType | null>(null);

  useEffect(() => {
    if (status !== 'success') return;
    if (chatroomList.length === 0) {
      setRecentChatroom(null);
      return;
    }

    chatroomList.sort((a, b) => {
      if (a.lastMessageTime > b.lastMessageTime) {
        return -1;
      } else if (a.lastMessageTime < b.lastMessageTime) {
        return 1;
      } else {
        return 0;
      }
    });

    setRecentChatroom(chatroomList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroomList]);

  if (recentChatroom === null) {
    return (
      <div className="styled-intro-message">
        <div className="intro-message">
          <p>Recent message</p>
          <IntroMessage>
            <div className="mini-message-icon">
              <img src={ChatMessageSvg} alt="" />
            </div>
            <div className="intro-basic-message">
              안녕하세요. 푸드메이트 채널톡입니다. <br />
              즐거운 주변모임에 참여해보세요!
            </div>
          </IntroMessage>
        </div>
      </div>
    );
  } else {
    return (
      <div className="styled-intro-message">
        <div onClick={() => selectChatRoom(recentChatroom)} className="intro-message">
          <p>{recentChatroom.chatRoomName}</p>
          <IntroMessage>
            <div className="mini-message-icon">
              <MemberThumbnail chatMembers={recentChatroom.chatMembers} />
            </div>
            <div className="intro-basic-message">
              {recentChatroom.lastMessage}
              <MdArrowForwardIos />
            </div>
          </IntroMessage>
        </div>
      </div>
    );
  }
};
export default Home;
