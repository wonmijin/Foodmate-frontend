import styled from 'styled-components';
import { postCardData } from '../../mocks/postCardData';
import { PostCard } from './PostCard';

export const PostCardsList = () => {
  return (
    <PostCardsListContainer>
      {postCardData.map((card) => (
        <PostCard cardData={card} key={card.id} />
      ))}
    </PostCardsListContainer>
  );
};

const PostCardsListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 60px 16px;
`;
