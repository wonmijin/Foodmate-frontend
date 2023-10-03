import styled from 'styled-components';
import { postCardData } from '../../mocks/postCardData';
import { NeighborhoodCard } from './neighborhoodCard';

export const NeighborhoodCardList = () => {
  return (
    <PostCardsListContainer>
      {postCardData.map((card, idx) => (
        <NeighborhoodCard cardData={card} key={idx} />
      ))}
    </PostCardsListContainer>
  );
};

const PostCardsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
