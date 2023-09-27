import styled from 'styled-components';
import { SmallGrayButton } from '../common/SmallGrayButton';
import { CommentsType } from '../../types/postCardType';
import { RepliesList } from './RepliesList';

export const CommentsList = ({ commentsData }: { commentsData: CommentsType[] }) => {
  return (
    <CommentsListContainer>
      {commentsData.map((item: CommentsType, idx) => {
        return (
          <div key={idx}>
            <div className="profile">
              <div className="photo">
                <img src={item.image} alt={item.nickname} />
              </div>
              <div>{item.nickname}</div>
            </div>
            <div className="contents">{item.content}</div>
            {/* 현재 로그인된 닉네임과 item 닉네임이 같을 때만 아래 버튼을 보여줘야 함 */}
            <div className="buttons-wrap">
              <SmallGrayButton onClick={() => ''}>수정</SmallGrayButton>
              <SmallGrayButton onClick={() => ''}>삭제</SmallGrayButton>
            </div>
            {item.replies && item.replies.length > 0 && <RepliesList repliesData={item.replies} />}
            <hr key={item.commentId} />
          </div>
        );
      })}
    </CommentsListContainer>
  );
};

const CommentsListContainer = styled.div`
  margin: 24px auto;
  width: 100%;
  display: flex;
  flex-direction: column;

  .profile {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
  }

  .contents {
    margin: 6px 0 6px 50px;
    font-size: 12px;
  }

  .buttons-wrap {
    display: flex;
    justify-content: flex-end;
  }

  hr {
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: #dedede;
    margin: 24px 0;
  }
`;
