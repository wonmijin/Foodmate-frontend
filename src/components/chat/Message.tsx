import styled from "styled-components";
import { CiClock2 } from 'react-icons/ci';
import { MdArrowForwardIos } from 'react-icons/md';

interface MessageProps {
  chatRoomId: number | null;
  closeMessage: () => void;
}

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

export default Message;