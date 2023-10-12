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
          <ProfileBox>
            <h3>프로필 수정</h3>
            <hr></hr>
            <hr></hr>
          </ProfileBox>
        </ProfileWrap>
      </BasicPadding>
    </>
  );
};

const ProfileWrap = styled.div`
  display: flex;
  margin: 120px 0;
`;

const ProfileBox = styled.div`
  width: 640px;
  margin: 0 auto;

  h3 {
    font-size: 24px;
    color: #212121;
    text-align: center;
    margin-bottom: 50px;
  }

  hr {
    width: 640px;
    border: 1px solid #f1f1f1;
  }
`;
