import { useEffect } from 'react';
import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { useState } from 'react';
import { MeetingInfoCardList } from '../components/meetingInfo/MeetingInfoCardList';
import { MEETING_INFO_MENU } from '../constants/menu';
import { useQuery } from '@tanstack/react-query';
import { fetchCall } from '../api/fetchCall';
import { useSetRecoilState } from 'recoil';
import { subscriptionCategory } from '../store/meetingInfo';
import { MeetingInfoDataType } from '../types/postCardType';

export const History = () => {
  const [selectedCategory, setSelectedCategory] = useState('신청 현황');
  const [decision, setDecision] = useState('subscription');
  const [currentData, setCurrentData] = useState<MeetingInfoDataType[]>();
  const setRequestCategory = useSetRecoilState(subscriptionCategory);

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === '신청 현황') {
      setDecision('subscription');
      setRequestCategory('받은 요청');
    } else {
      setDecision('history');
      setRequestCategory('지난 모임');
    }
  };

  const { data } = useQuery(['situation', selectedCategory], () => fetchCall('get', `/enrollment/${decision}`));

  useEffect(() => {
    if (data) {
      setCurrentData(data.content);
    }
  }, [currentData, data]);

  return (
    <>
      <BasicPadding>
        <HistoryContainer>
          <div className="contents-box">
            <SideMenu sideMenuList={MEETING_INFO_MENU} navMenuIdx={2} />
            <Contents>
              <h2>
                <span>#</span> 모임 정보 - 신청 내역
              </h2>
              <div className="category">
                <div className="category-list">
                  <div
                    onClick={() => handleCategory('신청 현황')}
                    className={selectedCategory === '신청 현황' ? 'selected-category' : ''}
                  >
                    신청 현황
                  </div>
                  <div
                    onClick={() => handleCategory('지난 모임')}
                    className={selectedCategory === '지난 모임' ? 'selected-category' : ''}
                  >
                    지난 모임
                  </div>
                </div>
              </div>
              <hr />
              <p>3개월 이내의 신청 내역까지 확인할 수 있어요.</p>
              <MeetingInfoCardList historyData={currentData || []} />
            </Contents>
          </div>
        </HistoryContainer>
      </BasicPadding>
    </>
  );
};

const HistoryContainer = styled.div`
  margin: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  .contents-box {
    width: 100%;
    display: flex;
    gap: 12px;
  }
`;

const Contents = styled.div`
  flex: 1;
  padding: 0 100px;

  .category {
    display: flex;
    justify-content: space-between;

    .category-list {
      display: flex;
      gap: 26px;
      cursor: pointer;
    }
  }

  h2 {
    margin-bottom: 24px;

    span {
      color: ${(props) => props.theme.color.ORANGE};
    }
  }

  .selected-category {
    color: ${(props) => props.theme.color.ORANGE};
  }

  .selected-status {
    display: none;
  }

  p {
    font-size: 12px;
    color: ${(props) => props.theme.color.GRAY};
  }

  hr {
    margin: 12px 0;
  }
`;
