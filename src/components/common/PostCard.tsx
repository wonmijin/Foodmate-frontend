import styled from 'styled-components';
import { PostCardType } from '../../types/postCardType';
// import { BsStar, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import TodayMeetingType from '../../types/todayMeetingType';
import { useState } from 'react';
import { UserInfoType } from '../../types/userInfoType';
import { useRecoilState } from 'recoil';
import { profileModalIsOpened } from '../../store/userInfo';
import { userProfileView } from '../../api/memberApi';
import { ProfileModal } from './ProfileModal';

export const PostCard = ({ cardData }: { cardData: PostCardType | TodayMeetingType }) => {
  const navigation = useNavigate();
  const postCardOnClickHandler = () => {
    navigation(`/findfoodmate/${cardData.groupId}`);
  };
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfoType>();
  const [isProfileModalOpened, setIsProfileModalOpen] = useRecoilState(profileModalIsOpened);

  const handleProfileImage = async (nickname: string) => {
    const selectedUser = await userProfileView(nickname);
    setSelectedUserInfo(selectedUser);
    setIsProfileModalOpen(true);
  };

  return (
    <div>
      <PostCards onClick={postCardOnClickHandler}>
        <LeftAlign>
          <div className="date">{cardData.createdDate}</div>
          <div className="title">{cardData.title}</div>
          <div className="sub-title">모임명</div>
          <div className="input-text">{cardData.name}</div>
          <div className="sub-title">언제?</div>
          <div className="input-text">
            {cardData.date} {cardData.time}
          </div>
          <div className="sub-title">어디서?</div>
          <div className="input-text">
            <strong>{cardData.storeName}</strong>
            <br /> {cardData.storeAddress}
          </div>
        </LeftAlign>
        <RightAlign>
          <span className="participant">
            {cardData.current}/{cardData.maximum}
          </span>
          명
        </RightAlign>
      </PostCards>
      <WriterInfo>
        <div className="photo" onClick={() => handleProfileImage(cardData.nickname)}>
          <img src={cardData.image} />
        </div>
        <div className="status">
          <div>{cardData.nickname}</div>
          {/* 현재 로그인된 계정 기준으로 나의 신청 현황(/enrollment) 전체 가져와서 groupId만 뽑아내야함 */}
          {/* <div>
            {cardData.participationStatus ? (
              <Participated>
                <BsStarFill /> 참여됨
              </Participated>
            ) : (
              <NotParticipating>
                <BsStar /> 참여하기
              </NotParticipating>
            )}
          </div> */}
        </div>
      </WriterInfo>
      {isProfileModalOpened && selectedUserInfo && (
        <ProfileModal userInfo={selectedUserInfo} handleProfileModal={setIsProfileModalOpen} />
      )}
    </div>
  );
};

const PostCards = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  min-width: 260px;
  min-height: 300px;
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ededed;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }

  .sub-title {
    margin-top: 8px;
    color: #009a5f;
    font-weight: 600;
    font-size: 13px;
  }

  .input-text {
    font-size: 11px;
  }

  .date {
    text-align: right;
    font-size: 12px;
    margin-bottom: 4px;
    color: #999999;
  }
`;

const RightAlign = styled.div`
  font-size: 1px;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;

  .participant {
    font-weight: 600;
    font-size: 20px;
    padding: 0 4px;
  }
`;

const WriterInfo = styled.div`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  gap: 8px;

  .photo {
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    cursor: pointer;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .status {
    font-size: 12px;
    cursor: pointer;

    &::first-line {
      font-weight: 600;
    }
  }
`;

// const Participated = styled.div`
//   color: ${(props) => props.theme.color.ORANGE};
//   font-weight: 600;
// `;
// const NotParticipating = styled.div`
//   color: #777777;
// `;
