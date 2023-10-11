import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';

export const QuitMembership = () => {
  return (
    <>
      <BasicPadding>
        <QuitWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <div>회원탈퇴</div>
        </QuitWrap>
      </BasicPadding>
    </>
  );
};

const QuitWrap = styled.div`
  display: flex;
  margin: 120px 0;
`;
