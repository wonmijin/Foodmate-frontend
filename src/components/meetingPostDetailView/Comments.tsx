import styled from 'styled-components';
import { CommentsList } from './CommentsList';
import { CommentsType } from '../../types/postCardType';

export const Comments = ({ commentsData }: { commentsData: CommentsType[] }) => {
  return (
    <CommentsContainer>
      <CommentsList commentsData={commentsData} />
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  margin: 50px auto;
  width: 60%;
  display: flex;
  flex-direction: column;
`;
