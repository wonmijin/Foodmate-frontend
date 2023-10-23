import styled from 'styled-components';
import { MdArrowForwardIos } from 'react-icons/md';
import { LuDot } from 'react-icons/lu';
import MessageSvg from '../../assets/message.svg';

interface RoomProps {
  selectChatRoom: (chatRoomId: number) => void;
}

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
    cursor: pointer;
  }

  .chat-room-state {
    color: #737376;
    font-size: 13px;
  }
`;

const Room = ({ selectChatRoom }: RoomProps) => {
  return (
    <>
      <ChatRoomHeader>
        <div>대화</div>
      </ChatRoomHeader>
      <ChatRoomMain>
        <ChatRoomMessage onClick={() => selectChatRoom(1)}>
          <div className="default-chat-profile">
            <img src={MessageSvg} alt="푸드메이트 채팅 프로필 사진" />
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
            <img src={MessageSvg} alt="푸드메이트 채팅 프로필 사진" />
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

export default Room;
