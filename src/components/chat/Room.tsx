import dayjs from 'dayjs';
import { LuDot } from 'react-icons/lu';
import { MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';
import ChatroomSkeleton from '../../assets/chatroom-skeleton.webp';
import { useChatroomList } from '../../hooks/useChatroomList';
import { ChatroomType } from '../../types/chatroomType';
import MemberThumbnail from './MemberThumbnail';

interface RoomProps {
  selectChatRoom: (chatRoom: ChatroomType) => void;
}

const ChatRoomContainer = styled.div`
  height: calc(100% - 63px);
  width: 100%;
  display: grid;
  grid-template-rows: 70px 1fr;
`;

const ChatRoomHeader = styled.header`
  background-color: #fff;
  border-radius: 20px 20px 0 0px;
  padding: 34px 24px 0;
  font-weight: bold;
  font-size: 23px;
`;

const ChatRoomMain = styled.main`
  padding: 8px 9px;
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
    cursor: pointer;
  }

  .chat-room-state {
    color: #737376;
    font-size: 13px;
  }
`;

const Room = ({ selectChatRoom }: RoomProps) => {
  const { data: chatroomList, status } = useChatroomList();

  return (
    <ChatRoomContainer>
      <ChatRoomHeader>
        <div>대화</div>
      </ChatRoomHeader>
      <ChatRoomMain>
        {status === 'loading' ? (
          <img src={ChatroomSkeleton} />
        ) : (
          <>
            {chatroomList?.map((chatroom: ChatroomType, index: number) => {
              return (
                <ChatRoomMessage key={index} onClick={() => selectChatRoom(chatroom)}>
                  <div>
                    <MemberThumbnail chatMembers={chatroom.chatMembers} />
                  </div>
                  <div className="default-chat-message">
                    {chatroom.lastMessage}
                    <div className="chat-room-state">
                      <span>{chatroom.chatRoomName}</span>
                      <LuDot />
                      <span>{dayjs(chatroom.lastMessageTime, 'YYYY-MM-DD HH:mm:ss').format('MM월 DD일')}</span>
                    </div>
                  </div>
                  <MdArrowForwardIos color="#F96223" />
                </ChatRoomMessage>
              );
            })}
          </>
        )}
      </ChatRoomMain>
    </ChatRoomContainer>
  );
};

export default Room;
