import styled from 'styled-components';
// import { BsStar, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AllPostCardType } from '../../types/postCardType';

export const NeighborhoodCard = ({ cardData }: { cardData: AllPostCardType }) => {
  const navigation = useNavigate();
  const postCardOnClickHandler = () => {
    navigation(`/findfoodmate/${cardData.groupId}`);
  };

  return (
    <div>
      <NeighborhoodCards onClick={postCardOnClickHandler}>
        <RightAlign>
          <div className="date">{cardData.date}</div>
        </RightAlign>
        <LeftAlign>
          <div className="title">{cardData.title}</div>
          <div className="sub-title">언제?</div>
          <div className="input-text">
            {cardData.date} {cardData.time}
          </div>
          <div className="sub-title">어디서?</div>
          <div className="input-text">
            <strong>{cardData.storeName}</strong>
            <br /> {cardData.storeAddress}
          </div>
        </LeftAlign>
        <RightAlign>
          <span className="participant">
            {cardData.current}/{cardData.maximum}
          </span>
          명
        </RightAlign>
      </NeighborhoodCards>
    </div>
  );
};

const NeighborhoodCards = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ededed;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }

  .sub-title {
    margin-top: 8px;
    color: #009a5f;
    font-weight: 600;
    font-size: 13px;
  }

  .input-text {
    font-size: 11px;
  }
`;

const RightAlign = styled.div`
  font-size: 1px;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  .date {
    color: #999999;
  }

  .participant {
    font-weight: 600;
    font-size: 20px;
    padding: 0 4px;
  }
`;
