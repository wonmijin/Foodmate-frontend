import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';

export const ProfileChange = () => {
  return (
    <>
      <BasicPadding>
        <MypageWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <div>안녕하세요.</div>
        </MypageWrap>
      </BasicPadding>
    </>
  );
};

const MypageWrap = styled.div`
  display: flex;
`;
