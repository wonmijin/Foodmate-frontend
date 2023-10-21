import styled from 'styled-components';
import { SmallGrayButton } from '../common/SmallGrayButton';
import { CommentsType } from '../../types/postCardType';
import { RepliesList } from './RepliesList';
import { useState } from 'react';
import { fetchCall } from '../../api/fetchCall';
import { useParams } from 'react-router-dom';

export const CommentsList = ({ commentsData }: { commentsData: CommentsType[] }) => {
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const groupId = useParams();

  useState(() => {
    setComments(commentsData);
  });

  const handleEdit = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setNewComment(content);
  };

  const handleModifyComment = (commentId: number) => {
    const result = fetchCall('put', `/group/${groupId}/comment/${commentId}`);
    console.log(result);
  };

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
            {editCommentId === item.commentId ? (
              <>
                <EditBox value={newComment} onChange={(e) => setNewComment(e.target.value)}></EditBox>
                <div className="buttons-wrap">
                  <SmallGrayButton onClick={() => () => handleModifyComment(item.commentId)}>완료</SmallGrayButton>
                  <SmallGrayButton onClick={() => setEditCommentId(null)}>취소</SmallGrayButton>
                </div>
              </>
            ) : (
              <>
                <div className="contents">{item.content}</div>

                <div className="buttons-wrap">
                  <SmallGrayButton onClick={() => handleEdit(item.commentId, item.content)}>수정</SmallGrayButton>
                  <SmallGrayButton onClick={() => ''}>삭제</SmallGrayButton>
                </div>
              </>
            )}
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
    gap: 4px;
    justify-content: flex-end;
  }

  hr {
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: #dedede;
    margin: 24px 0;
  }
`;

const EditBox = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 8px 12px;
  resize: none;
  border: none;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.LIGHT_GRAY};
  margin-left: 12px;
  font-size: 12px;
`;
