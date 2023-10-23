import styled from 'styled-components';
import { CommentsList } from './CommentsList';
import { CommentsType } from '../../types/postCardType';
import { UserInfoType } from '../../types/userInfoType';

export interface CommentsProps {
  commentsData: CommentsType[];
  setSelectedUserInfo: (userInfo: UserInfoType) => void;
  handleProfileModal: (isOpen: boolean) => void;
}

export const Comments = ({ commentsData, setSelectedUserInfo, handleProfileModal }: CommentsProps) => {
  return (
    <CommentsContainer>
      <CommentsList
        commentsData={commentsData}
        setSelectedUserInfo={setSelectedUserInfo}
        handleProfileModal={handleProfileModal}
      />
    </CommentsContainer>
  );
};

const CommentsContainer = styled.div`
  margin: 50px auto;
  width: 60%;
  display: flex;
  flex-direction: column;
`;
