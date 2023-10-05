import styled from 'styled-components';
import { ReplyType } from '../../types/postCardType';
import { SmallGrayButton } from '../common/SmallGrayButton';
import { BiSubdirectoryRight } from 'react-icons/bi';

export const RepliesList = ({ repliesData }: { repliesData: ReplyType[] }) => {
  return (
    <RepliesListContainer>
      {repliesData.map((reply: ReplyType) => (
        <div key={reply.replyId}>
          <div className="profile">
            <div className="icon">
              <BiSubdirectoryRight />
            </div>
            <div className="photo">
              <img src={reply.image} alt={reply.nickname} />
            </div>
            <div>{reply.nickname}</div>
          </div>
          <div className="reply-contents">{reply.content}</div>
          {/* 현재 로그인된 닉네임과 reply 닉네임이 같을 때만 아래 버튼을 보여줘야 함 */}
          <div className="buttons-wrap">
            <SmallGrayButton onClick={() => ''}>수정</SmallGrayButton>
            <SmallGrayButton onClick={() => ''}>삭제</SmallGrayButton>
          </div>
        </div>
      ))}
    </RepliesListContainer>
  );
};

const RepliesListContainer = styled.div`
  margin: 30px 0 0 50px;

  .profile {
    .icon {
      font-size: 24px;
    }
  }

  .reply-contents {
    margin: 6px 0 6px 80px;
    font-size: 12px;
  }
`;
