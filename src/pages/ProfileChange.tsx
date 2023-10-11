import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';

export const ProfileChange = () => {
  return (
    <>
      <BasicPadding>
        <ProfileWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <div>프로필 수정</div>
        </ProfileWrap>
      </BasicPadding>
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  margin: 120px 0;
`;
