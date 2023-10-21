import styled from 'styled-components';
import { SmallGrayButton } from '../common/SmallGrayButton';
import { CommentsType } from '../../types/postCardType';
import { RepliesList } from './RepliesList';
import { useState } from 'react';

export const CommentsList = ({ commentsData }: { commentsData: CommentsType[] }) => {
  const [comments, setComments] = useState(commentsData);

  useState(() => {
    setComments(commentsData);
  });

  return (
    <CommentsListContainer>
      {comments.map((item: CommentsType) => {
        return (
          <div key={item.commentId}>
            <div className="profile">
              <div className="photo">
                <img src={item.image} alt={item.nickname} />
              </div>
              <div>{item.nickname}</div>
            </div>
            <div className="contents">{item.content}</div>

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
