import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';

export const PasswordChange = () => {
  return (
    <>
      <BasicPadding>
        <PasswordWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <div>비밀번호 변경</div>
        </PasswordWrap>
      </BasicPadding>
    </>
  );
};

const PasswordWrap = styled.div`
  display: flex;
  margin: 120px 0;
`;
