import styled from 'styled-components';
import { PostCard } from './PostCard';
import { AllPostCardType } from '../../types/postCardType';

export const PostCardsList = ({ groupsData }: { groupsData: AllPostCardType[] }) => {
  return (
    <PostCardsListContainer>
      {groupsData?.map((card: AllPostCardType, idx: number) => <PostCard cardData={card} key={idx} />)}
    </PostCardsListContainer>
  );
};

const PostCardsListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 60px 16px;
`;
