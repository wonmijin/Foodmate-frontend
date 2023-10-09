import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { useState } from 'react';
import { MeetingInfoCardList } from '../components/meetingInfo/MeetingInfoCardList';
import Dropdown from '../components/common/Dropdown';
import { MEETING_INFO_MENU } from '../constants/menu';

export const History = () => {
  const [selectedCategory, setSelectedCategory] = useState('신청 현황');

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const myProfileDropMenu = [
    {
      children: <div>요청 수락</div>,
      onClick: () => {},
    },
    {
      children: <div>요청 거절</div>,
      onClick: () => {},
    },
    {
      children: <div>요청 대기중</div>,
      onClick: () => {},
    },
    {
      children: <div>요청 취소</div>,
      onClick: () => {},
    },
  ];

  return (
    <>
      <BasicPadding>
        <HistoryContainer>
          <h2>모임 정보 - 신청 내역</h2>
          <div className="contents-box">
            <SideMenu sideMenuList={MEETING_INFO_MENU} navMenuIdx={2} />
            <Contents>
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
                <div>
                  <Dropdown fontWeight="600" trigger="hover" menus={myProfileDropMenu}>
                    <div className={selectedCategory !== '신청 현황' ? 'selected-status' : ''}>전체 ▼</div>
                  </Dropdown>
                </div>
              </div>

              <hr />

              <p>3개월 이내의 신청 내역까지 확인할 수 있어요.</p>

              {/* history에서 분기처리 후 데이터를 해당 컴포넌트에 내려줘야 함 */}
              <MeetingInfoCardList />
            </Contents>
          </div>
        </HistoryContainer>
      </BasicPadding>
    </>
  );
};

const HistoryContainer = styled.div`
  margin: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 500px;

  .contents-box {
    width: 100%;
    display: flex;
    gap: 12px;
    padding: 32px 24px;
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
