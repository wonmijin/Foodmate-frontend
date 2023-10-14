import { useState } from 'react';
import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MEETING_INFO_MENU } from '../constants/menu';
import { MeetingInfoRequestCardList } from '../components/meetingInfo/MeetingInfoRequestCardList';

export const Inquiry = () => {
  const [selectedCategory, setSelectedCategory] = useState('받은 요청');

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <BasicPadding>
      <InquiryContainer>
        <h2>모임 정보 - 요청 조회</h2>
        <div className="contents-box">
          <SideMenu sideMenuList={MEETING_INFO_MENU} navMenuIdx={2} />
          <Contents>
            <div className="category">
              <div className="category-list">
                <div
                  onClick={() => handleCategory('받은 요청')}
                  className={selectedCategory === '받은 요청' ? 'selected-category' : ''}
                >
                  받은 요청
                </div>
                <div
                  onClick={() => handleCategory('처리된 요청')}
                  className={selectedCategory === '처리된 요청' ? 'selected-category' : ''}
                >
                  처리된 요청
                </div>
              </div>
            </div>

            <hr />

            <p>3개월 이내의 신청 내역까지 확인할 수 있어요.</p>

            {/* inquiry에서 분기처리 후 데이터를 해당 컴포넌트에 내려줘야 함 */}
            <MeetingInfoRequestCardList />
          </Contents>
        </div>
      </InquiryContainer>
    </BasicPadding>
  );
};

const InquiryContainer = styled.div`
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
