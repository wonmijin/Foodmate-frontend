import styled from 'styled-components';
import { NeighborhoodCard } from './NeighborhoodCard';
import { AllPostCardType } from '../../types/postCardType';

export const NeighborhoodCardList = ({ cardData }: { cardData: AllPostCardType[] }) => {
  return (
    <PostCardsListContainer>
      {cardData.map((card, idx) => (
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
