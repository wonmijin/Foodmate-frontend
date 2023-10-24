import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { MdArrowForwardIos } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import DefaultUserProfile from '../../assets/default-chat-user-profile.svg';
import FullMessageSkeleton from '../../assets/message-skeleton_full.gif';
import HalfMessageSkeleton from '../../assets/message-skeleton_half.gif';
import { useChatroomMessage } from '../../hooks/useChatroomMessage';
import { isSignenIn } from '../../store/login';
import { MessageType } from '../../types/chatroomMessageType';
import { ChatroomType } from '../../types/chatroomType';
import Image from '../common/Image';

interface MessageProps {
  chatRoom: ChatroomType;
  closeMessage: () => void;
}

const MessageContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 70px 1fr auto;
`;

const ChatMessageHeader = styled.header`
  background-color: ${(props) => props.theme.color.YELLOW};
  border-radius: 20px 20px 0 0px;
  padding: 0 24px;

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
  overflow-y: scroll;

  .message-container {
    display: flex;
    align-items: flex-end;
  }
`;

const MessageSkeleton = styled.img`
  width: 100%;
  overflow: hidden;
`;

const ChatSenderContents = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;

  .image-area {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
    }
  }

  .nickname {
    padding-left: 16px;
    color: #212121;
    font-size: 13px;
  }

  .text-message {
    padding: 9px 16px;
    background-color: #f2f2f2;
    border-radius: 10px;
    margin-left: 10px;
    font-size: 15px;
  }

  .text-message-time {
    padding-left: 10px;
    margin-top: 5px;
    color: #737376;
    font-size: 10px;
  }
`;

const ChatRecipientContents = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;

  .text-message-container {
    display: flex;
    align-items: flex-end;
  }

  .text-message {
    background-color: #fff3c0;
    padding: 9px 16px;
    border-radius: 10px;
    font-size: 15px;
  }

  .text-message-time {
    text-align: right;
    color: #737376;
    font-size: 10px;
    margin-right: 10px;
  }
`;

const ChatMessageInputContainer = styled.div`
  width: 100%;
  padding: 20px 0 20px 24px;
  border-top: 1px solid #ebebeb;

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

const Message = ({ chatRoom, closeMessage }: MessageProps) => {
  const client = useRef<Client>();
  const isSignedIn = useRecoilValue(isSignenIn);
  const { data: initChatroomMessage, status } = useChatroomMessage(chatRoom.chatRoomId);
  const [loginMemberId, setLoginMemberId] = useState<number | null>(null);
  const [chatMassage, setChatMassage] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  let chatMessageMain: HTMLElement | null = null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const onSend = () => {
    if (client.current === undefined) return;
    if (inputMessage === '') return;

    client.current.publish({
      destination: `/app/chatroom/${chatRoom.chatRoomId}/send`,
      body: JSON.stringify({
        content: inputMessage,
        createdDate: dayjs().format('YYYY-MM-DD HH:mm').toString(),
      }),
      headers: { Authorization: axios.defaults.headers.common['Authorization']!.toString() },
      skipContentLengthHeader: true,
    });
    setInputMessage('');
  };

  useEffect(() => {
    if (initChatroomMessage === undefined) return;

    setLoginMemberId(initChatroomMessage.loginMemberId);
    setChatMassage(initChatroomMessage.chatRoomMessageResponses);
  }, [initChatroomMessage]);

  useEffect(() => {
    chatMessageMain?.scrollTo(0, chatMessageMain.scrollHeight);
  }, [chatMessageMain, chatMassage]);

  useEffect(() => {
    if (loginMemberId === null) return;
    if (isSignedIn === false) return;

    const connect = () => {
      client.current = new Client({
        brokerURL: `${import.meta.env.VITE_WS_URL}/chat`,
        // NOTE: 채팅 PubSub 기능 테스트용
        debug: (msg) => {
          console.log(msg);
        },
        connectHeaders: {
          Authorization: axios.defaults.headers.common['Authorization']!.toString(),
        },
        onConnect: () => {
          if (client.current === undefined) return;

          client.current.subscribe(
            `/topic/chatroom/${chatRoom.chatRoomId}`,
            (message: IMessage) => {
              let chatMessage: MessageType | null;
              try {
                chatMessage = JSON.parse(message.body);
              } catch (e) {
                chatMessage = null;
              }

              if (chatMessage === null) return;

              const newChatMessage = [...chatMassage];
              newChatMessage.push(chatMessage);
              setChatMassage(newChatMessage);
            },
            { Authorization: axios.defaults.headers.common['Authorization']!.toString() },
          );
        },
      });
      client.current.activate();
    };

    connect();

    return () => {
      if (client.current === undefined) return;
      client.current.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMemberId, isSignedIn, chatRoom]);

  return (
    <MessageContainer>
      <ChatMessageHeader>
        <ChatMeetingTitle>
          <MdArrowForwardIos
            className="back-button"
            onClick={() => {
              closeMessage();
              setLoginMemberId(null);
            }}
          />
          <div className="chat-meeting-title-contents">
            <span>{chatRoom.chatRoomName}</span>
            <div className="chat-list-time">
              <CiClock2 />
              <span>{dayjs(chatRoom.lastMessageTime, 'YYYY-MM-DD HH:mm:ss').format('MM월 DD일')}</span>
            </div>
          </div>
        </ChatMeetingTitle>
        <ChatPersonInfo>
          <ChatMessageProfile>
            <div className="Chat-message-profile">
              {/* <img src={DefaultProfile} alt="푸드메이트 프로필 사진" /> */}
            </div>
            <div className="Chat-message-profile">
              <img src={DefaultUserProfile} alt="사용자 프로필 사진"></img>
            </div>
          </ChatMessageProfile>
          <span>{chatRoom.attendance}</span>
        </ChatPersonInfo>
      </ChatMessageHeader>
      <ChatMessageMain ref={(r) => (chatMessageMain = r)}>
        {status === 'loading' ? (
          <>
            <MessageSkeleton src={FullMessageSkeleton} /> <MessageSkeleton src={HalfMessageSkeleton} />
          </>
        ) : (
          <>
            {chatMassage?.map((message: MessageType, index: number) =>
              loginMemberId !== message.memberId ? (
                <ChatSenderContents key={index}>
                  <div className="image-area">
                    <Image
                      imageKey={message.image}
                      imageUrl={message.image}
                      alt={`${message.nickname}의 프로필 사진`}
                    />
                  </div>
                  <div className="text-message-container">
                    <div className="nickname">{message.nickname}</div>
                    <div className="message-container">
                      <div className="text-message">{message.content}</div>
                      <div className="text-message-time">
                        {dayjs(message.createdDate, 'YYYY-MM-DD HH:mm:ss').format('A h:mm')}
                      </div>
                    </div>
                  </div>
                </ChatSenderContents>
              ) : (
                <ChatRecipientContents key={index}>
                  <div className="text-message-container">
                    <div className="text-message-time">
                      {dayjs(message.createdDate, 'YYYY-MM-DD HH:mm:ss').format('A h:mm')}
                    </div>
                    <div className="text-message">{message.content}</div>
                  </div>
                </ChatRecipientContents>
              ),
            )}
          </>
        )}
      </ChatMessageMain>
      {status === 'loading' ? (
        <></>
      ) : (
        <ChatMessageInputContainer>
          <input
            autoFocus
            type="text"
            value={inputMessage}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSend();
              }
            }}
          />
          <SendButton
            type="submit"
            disabled={inputMessage.length !== 0 ? false : true}
            onClick={() => {
              onSend();
            }}
          >
            전송
          </SendButton>
        </ChatMessageInputContainer>
      )}
    </MessageContainer>
  );
};

export default Message;
