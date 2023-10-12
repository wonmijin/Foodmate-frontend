import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';
import { Food } from '../components/register/food';
import { LoginButton } from '../components/common/LoginButton';

export const Profile = () => {
  return (
    <>
      <BasicPadding>
        <ProfileWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <ProfileBox>
            <h3>프로필 수정</h3>
            <form>
              <hr></hr>
              <ProfilePadding>
                <ProfileInBox>
                  <p>
                    선호 음식
                    <span>
                      중복체크 가능
                      <br />
                      (최대 3개)
                    </span>
                  </p>
                  <Food />
                </ProfileInBox>
              </ProfilePadding>
              <hr></hr>
              <LoginButton $fontSize="16px">프로필 수정</LoginButton>
            </form>
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

const ProfileInBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 0;

  p {
    width: 140px;
    min-width: 140px;
    max-width: 140px;
    font-size: 14px;
    color: #212121;
    font-weight: 600;
    line-height: 48px;

    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      display: block;
    }
  }
`;

const ProfilePadding = styled.div`
  margin: 10px 0;
  padding: 0 20px;
`;
