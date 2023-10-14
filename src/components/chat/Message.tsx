import styled from 'styled-components';
import { CiClock2 } from 'react-icons/ci';
import { MdArrowForwardIos } from 'react-icons/md';
import React, { useState } from 'react';

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

  .back-button {
    transform: rotate(180deg);
    cursor: pointer;
  }

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
    width: 30px;
    height: 30px;
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

const ChatSenderContents = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
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

const ChatRecipientContents = styled.div`
  display: flex;
  justify-content: flex-end;

  .text-message {
    background-color: ${(props) => props.theme.color.YELLOW};
    padding: 18px 16px;
    border-radius: 10px;
    font-size: 15px;
  }

  .text-message-time {
    text-align: right;
    margin-top: 5px;
    color: #737376;
    font-size: 13px;
  }
`;

const ChatMessageInputContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 24px;
  border-top: 1px solid #ebebeb;
  position: absolute;
  bottom: 0;

  input {
    border: none;
    width: 80%;

    &:focus {
      outline: none;
    }
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#F2F2F2' : '#FFCE00')};
  border-radius: 8px;
  padding: 8px 12px;
`;

const Message = ({ chatRoomId, closeMessage }: MessageProps) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <>
      <ChatMessageHeader>
        <ChatMeetingTitle>
          <MdArrowForwardIos className="back-button" onClick={() => closeMessage()} />
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
        <ChatSenderContents>
          <img src="/src/assets/chat-foodmate-default-profile.svg" alt="푸드메이트 채팅 프로필 사진" />
          <div className="text-message-container">
            <div className="text-message">
              안녕하세요. 푸드메이트 채널톡입니다. <br />
              즐거운 주변모임에 참여해보세요!
            </div>
            <div className="text-message-time">오후 1:00</div>
          </div>
        </ChatSenderContents>
        <ChatRecipientContents>
          <div className="text-message-container">
            <div className="text-message">오늘 참여 가능한가요?</div>
            <div className="text-message-time">오후 1:03</div>
          </div>
        </ChatRecipientContents>
      </ChatMessageMain>
      <ChatMessageInputContainer>
        <input autoFocus type="text" value={inputMessage} onChange={onChange} />
        <SendButton disabled={inputMessage.length !== 0 ? false : true}>전송</SendButton>
      </ChatMessageInputContainer>
    </>
  );
};

export default Message;
