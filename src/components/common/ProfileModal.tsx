import styled from 'styled-components';
import { UserInfoType } from '../../types/userInfoType';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { BasicButton } from './BasicButton';
import { MenuLabel } from './MenuLabel';
import { LABELCOLOR } from '../../constants/menu';
import { fetchCall } from '../../api/fetchCall';
import { useState } from 'react';
import { userProfileView } from '../../api/memberApi';

interface ProfileModalProps {
  userInfo: UserInfoType;
  handleProfileModal: (value: boolean) => void;
  setSelectedUserInfo: (userInfo: UserInfoType) => void;
}

export const ProfileModal = ({ userInfo, handleProfileModal, setSelectedUserInfo }: ProfileModalProps) => {
  const favoriteFoods = LABELCOLOR.filter((item) => userInfo.food.includes(item.menu));
  const [currentLikes, setCurrentLikes] = useState(userInfo.likes);
  const [heartState, setHeartState] = useState(false);
  //heartState 의 초기값을, 어떻게 해야 할까?

  const handleLike = async (memberId: number) => {
    const result = await fetchCall('post', `/member/${memberId}/likes`);
    console.log('좋아요 API 응답값', result);
    console.log('현재 유저 정보', userInfo.likes);

    if (result >= userInfo.likes) {
      setHeartState(true);
    } else {
      setHeartState(false);
    }

    setCurrentLikes(result);
  };

  const handleCloseModal = async (isOpen: boolean) => {
    handleProfileModal(isOpen);
    const selectedUser = await userProfileView(userInfo.nickname);
    setSelectedUserInfo(selectedUser);
  };

  return (
    <>
      <Overlay onClick={() => handleCloseModal(false)} />
      <ProfileModalContainer>
        <Modal>
          <div className="photo">
            <img src={userInfo.image} alt="프로필사진" />
          </div>
          <div className="like-box">
            <span className="icon" onClick={() => handleLike(userInfo.memberId)}>
              {heartState ? <GoHeartFill /> : <GoHeart />}
            </span>
            <span className="like">{currentLikes}</span>
          </div>
          <div className="nickname-email-wrap">
            <div>{userInfo.nickname}</div>
            <div>{userInfo.email}</div>
          </div>

          <div className="menu-labels">
            {favoriteFoods.map((food, idx) => {
              return (
                <MenuLabel $menuColor={food.color} $isSelected={true} key={idx}>
                  {food.menu}
                </MenuLabel>
              );
            })}
          </div>
          <div className="buttons-wrap">
            <BasicButton $fontSize="12px" $fontColor="#fff">
              1:1 대화 요청
            </BasicButton>
            <BasicButton
              onClick={() => handleCloseModal(false)}
              $fontSize="12px"
              $backgdColor="#c0c0c0"
              $hoverBackgdColor="#a1a1a1"
              $fontColor="#fff"
            >
              닫기
            </BasicButton>
          </div>
        </Modal>
      </ProfileModalContainer>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.5);
  z-index: 1000;
`;

const ProfileModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  background-color: #fff;
  border: 3px solid ${(props) => props.theme.color.GRAY};
  border-radius: 12px;
`;

const Modal = styled.div`
  width: 350px;
  height: fit-content;
  border-radius: 12px;
  padding: 24px;
  background-color: #f5f5f5;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  .photo {
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    cursor: pointer;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .like-box {
    display: flex;
    gap: 4px;

    .icon {
      height: 30px;
      font-size: 28px;
      color: #e30000;
      cursor: pointer;
    }

    .like {
      font-size: 22px;
      font-weight: 600;
    }
  }

  .nickname-email-wrap {
    text-align: center;

    & > div:first-child {
      font-weight: 900;
    }

    & > div:last-child {
      font-size: 12px;
      color: #858585;
    }
  }

  .menu-labels {
    scale: 0.9;
    display: flex;
    gap: 4px;
    margin: 12px;
  }

  .buttons-wrap {
    display: flex;
    width: 100%;
    button {
      width: 100%;
      margin: 12px 4px 0 4px;
    }
  }
`;
