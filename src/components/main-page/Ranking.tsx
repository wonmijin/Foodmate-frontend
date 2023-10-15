import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import { rankingCategories, RankingType } from '../../constants/ranking';
import Image from '../common/Image';
import { useMeetingRanking } from '../../hooks/useMeetingRanking';
import { useLikesRanking } from '../../hooks/useLikesRanking';
import { useFoodRanking } from '../../hooks/useFoodRanking';

const RankingContainer = styled.div`
  padding: var(--basic-padding);
`;

const MainPageCommonTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-text {
    font-weight: bold;
    font-size: 24px;

    .point {
      display: inline-block;
      margin-right: 10px;
      color: ${(props) => props.theme.color.ORANGE};
    }
  }
`;

const ButtonGroup = styled.div`
  padding: 12px 0 48px 0;
  display: flex;
  justify-content: center;

  > button {
    &:first-child {
      border-radius: 12px 0 0 12px;
    }
    &:last-child {
      border-radius: 0px 12px 12px 0;
      border-right: 1px solid #c0c0c0;
    }
  }
`;

const Button = styled.button`
  border: 1px solid #c0c0c0;
  padding: 8px;
  width: 100px;
  text-align: center;
  border-right: none;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ffcc0021;
  }

  &.active {
    background-color: ${(props) => props.theme.color.YELLOW};
    font-weight: 600;
  }
`;

const RankingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-between;
  margin: 0 auto;
`;

const RankingItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0 30px 30px;

  .text {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .photo {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c0c0c0;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const RankNumber = styled.span`
  width: 30px;
  text-align: center;
`;

type RankingItem = {
  rank: number;
  photo: string;
  text: string;
};

const Ranking = () => {
  const [rankingType, setRankingType] = useState<RankingType>(RankingType.Like);
  const [rankingList, setRankingList] = useState<RankingItem[]>([]);
  const { data: likesRankingData } = useLikesRanking();
  const { data: meetingRankingData } = useMeetingRanking();
  const { data: foodRankingData } = useFoodRanking();

  useEffect(() => {
    const newRankingList: RankingItem[] = [];

    switch (rankingType) {
      default:
      case RankingType.Like:
        likesRankingData?.forEach((value, index) => {
          newRankingList.push({
            rank: index,
            photo: value.image,
            text: value.nickname,
          });
        });
        break;
      case RankingType?.MeetingKing:
        meetingRankingData?.forEach((value, index) => {
          newRankingList.push({
            rank: index,
            photo: value.image,
            text: value.nickname,
          });
        });
        break;
      case RankingType.Category:
        foodRankingData?.forEach((value, index) => {
          newRankingList.push({
            rank: index,
            photo: value.image,
            text: value.foodName,
          });
        });
        break;
    }

    setRankingList(newRankingList);
  }, [foodRankingData, likesRankingData, meetingRankingData, rankingType]);

  return (
    <RankingContainer>
      <MainPageCommonTitle>
        <p className="title-text">
          <span className="point">#</span>
          <span>FOODMATE 랭킹</span>
        </p>
      </MainPageCommonTitle>
      <ButtonGroup>
        {rankingCategories.map((category, index) => (
          <Button
            key={index}
            className={rankingType === category.type ? 'active' : ''}
            onClick={() => setRankingType(category.type)}
            aria-selected={rankingType === category.type}
            aria-controls={`buttonGroup-${index}`}
            tabIndex={rankingType === category.type ? 0 : -1}
          >
            {category.label}
          </Button>
        ))}
      </ButtonGroup>
      <RankingList>
        {rankingList.map((item, index) => {
          let rankTag: React.ReactElement<typeof FaMedal> | React.ReactElement<typeof RankNumber>;

          switch (item.rank) {
            case 0:
              rankTag = <FaMedal color="#FFD05B" size="30" />;
              break;
            case 1:
              rankTag = <FaMedal color="#9B9797" size="30" />;
              break;
            case 2:
              rankTag = <FaMedal color="#D67F4B" size="30" />;
              break;

            default:
              rankTag = <RankNumber>{item.rank + 1}</RankNumber>;
              break;
          }

          return (
            <RankingItem key={index}>
              {rankTag}
              <div className="photo">
                <Image imageKey={item.photo} imageUrl={item.photo} alt={`랭킹 ${item.rank + 1}위 사진`} />
              </div>
              <span className="text">{item.text}</span>
            </RankingItem>
          );
        })}
      </RankingList>
    </RankingContainer>
  );
};

export default Ranking;
