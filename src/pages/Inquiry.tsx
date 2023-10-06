import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MEETING_INFO_MENU } from '../constants/menu';

export const Inquiry = () => {
  return (
    <BasicPadding>
      <InquiryContainer>
        <h2>모임 정보 - 요청 조회</h2>
        <div className="contents-box">
          <SideMenu sideMenuList={MEETING_INFO_MENU} />
          <Contents>요청 조회 페이지 내용</Contents>
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
