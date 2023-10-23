import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicButton } from '../components/common/BasicButton';
import { MenuLabel } from '../components/common/MenuLabel';
import { LABELCOLOR } from '../constants/menu';
import { KakaoMap } from '../components/kakao/KakaoMap';
import { SmallGrayButton } from '../components/common/SmallGrayButton';
import { Comments } from '../components/meetingPostDetailView/Comments';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetailGroup, getPostComments } from '../api/groupApi';
import { AlertModal } from '../components/common/AlertModal';
import { CreateComment } from '../components/meetingPostDetailView/CreateComments';
import { fetchCall } from '../api/fetchCall';
import { userProfileView } from '../api/memberApi';
import { UserInfoType } from '../types/userInfoType';
import { ProfileModal } from '../components/common/ProfileModal';
import { useRecoilState } from 'recoil';
import { profileModalIsOpened } from '../store/userInfo';

export const MeetingPostDetailView = () => {
  const navigation = useNavigate();
  const { groupId } = useParams();
  const [isOpenedAlertModal, setIsOpenedAlertModal] = useState(false);
  const [alertModalContent, setAlertModalContent] = useState({
    question: '',
    func: (() => {}) as () => void,
  });
  const signedInUserNickname = sessionStorage.getItem('nickname');
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfoType>();
  const [isProfileModalOpened, setIsProfileModalOpen] = useRecoilState(profileModalIsOpened);

  const joinedMeeting = () => {
    alert('모임에 참여했어요!');
  };
  const joinedChat = () => {
    alert('대화에 참여했어요!');
  };

  const handleAttend = (event: string, question: string) => {
    setIsOpenedAlertModal(true);
    setAlertModalContent((prev) => ({ ...prev, question: question }));

    if (event === '모임') {
      setAlertModalContent((prev) => ({ ...prev, func: joinedMeeting }));
    } else if (event === '대화') {
      setAlertModalContent((prev) => ({ ...prev, func: joinedChat }));
    }
  };

  const handleDelete = async () => {
    if (confirm('정말 삭제할까요?') && groupId) {
      await fetchCall('delete', `/group/${groupId}`);
      navigation('/findfoodmate');
    } else {
      return;
    }
  };

  const handleProfileImage = async (nickname: string) => {
    const selectedUser = await userProfileView(nickname);
    setSelectedUserInfo(selectedUser);
    setIsProfileModalOpen(true);
  };

  const {
    data: postData,
    isLoading: postDataLoading,
    error: postDataError,
  } = useQuery(['detailGroup'], () => groupId && getDetailGroup(parseInt(groupId)), {
    enabled: !!groupId,
  });

  const queryClient = useQueryClient();

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery(['comments', groupId], () => groupId && getPostComments(parseInt(groupId)), {
    refetchOnMount: false,
    onSuccess() {
      queryClient.invalidateQueries(['comments', groupId]);
    },
  });

  if (commentsLoading) return '댓글 로딩중...';
  if (commentsError) return '댓글 에러';
  if (postDataLoading) return '모임글 로딩중...';
  if (postDataError) return '모임글 에러';

  const selectedFoods = LABELCOLOR.find((item) => postData.food.includes(item.menu)) || { menu: '', color: '' };
  const geoCode = [postData.latitude, postData.longitude];

  return (
    <PostContainer>
      <BasicPadding>
        <div className="post-box">
          <h2>{postData.title}</h2>
          <div className="user-menu-wrap">
            <div className="user-info">
              <div className="photo" onClick={() => handleProfileImage(postData.nickname)}>
                <img src={postData.image} alt="프로필" />
              </div>
              <div>
                <div className="nickname">{postData.nickname}</div>
                <div className="created-date">{postData.createdDate}</div>
              </div>
            </div>
            <div>
              <MenuLabel $menuColor={selectedFoods.color} $isSelected={true}>
                {selectedFoods.menu}
              </MenuLabel>
            </div>
          </div>

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: postData.content,
            }}
          ></div>
          <MeetingInfoGrid>
            <div className="meeting-name">
              <div className="sub-title">모임명</div>
              <div>{postData.name}</div>
            </div>
            <div className="where">
              <div className="sub-title">어디서?</div>
              <div>
                <strong>{postData.storeName}</strong>
              </div>
              <div>{postData.storeAddress}</div>
            </div>
            <div className="when">
              <div className="sub-title">언제?</div>
              <div>{postData.date}</div>
            </div>
          </MeetingInfoGrid>

          <MapContainer>
            <KakaoMap geoCode={geoCode} />
          </MapContainer>

          <div className="basic-buttons-wrap">
            <BasicButton $fontSize="12px" onClick={() => handleAttend('모임', '모임에 참여할까요?')}>
              모임 참여
            </BasicButton>
            <BasicButton
              $fontSize="12px"
              onClick={() => handleAttend('대화', '대화에 참여할까요?')}
              $backgdColor="#c0c0c0"
              $hoverBackgdColor="#b6b6b6"
            >
              대화 참여
            </BasicButton>
          </div>

          <RightAlign>
            <div className="personnel">
              {postData.current} / {postData.maximum}
              <span>명</span>
            </div>

            {signedInUserNickname === postData.nickname && (
              <div>
                <SmallGrayButton
                  onClick={() => navigation(`/findfoodmate/modify/${postData.groupId}`, { state: { postData } })}
                >
                  수정
                </SmallGrayButton>{' '}
                <SmallGrayButton onClick={handleDelete}>삭제</SmallGrayButton>
              </div>
            )}
          </RightAlign>
        </div>
        {signedInUserNickname && <CreateComment groupId={Number(groupId)} />}
        <Comments
          commentsData={commentsData.content}
          setSelectedUserInfo={setSelectedUserInfo}
          handleProfileModal={setIsProfileModalOpen}
        />

        {isOpenedAlertModal && (
          <AlertModal handleYesClick={alertModalContent.func} handleAlertModal={setIsOpenedAlertModal}>
            {alertModalContent.question}
          </AlertModal>
        )}

        {isProfileModalOpened && selectedUserInfo && (
          <ProfileModal
            userInfo={selectedUserInfo}
            setSelectedUserInfo={setSelectedUserInfo}
            handleProfileModal={setIsProfileModalOpen}
          />
        )}
      </BasicPadding>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  margin: 120px 0;

  .post-box {
    margin: 50px auto;
    width: 60%;
    height: fit-content;
    border-radius: 12px;
    padding: 32px 24px;
    background-color: ${(props) => props.theme.color.LIGHT_GRAY};

    h2 {
      font-size: 20px;
    }
  }

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

  .user-menu-wrap {
    margin: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-info {
      display: flex;
      align-items: center;
      gap: 6px;

      .nickname {
        font-weight: 600;
        font-size: 12px;
      }

      .created-date {
        color: #999999;
        font-size: 11px;
      }
    }
  }

  .description {
    background-color: #fff;
    border-radius: 12px;
    width: 100%;
    padding: 16px;
    margin: 24px 0;
    height: fit-content;
    min-height: 120px;
  }

  .basic-buttons-wrap {
    button {
      margin: 0 4px;
    }
  }
`;

const MeetingInfoGrid = styled.div`
  font-size: 14px;
  margin: 32px 0;
  display: grid;
  gap: 16px;
  grid-template-areas:
    'meeting-name when'
    'where where';

  .sub-title {
    font-weight: 600;
    color: #009a5f;

    & + div {
    }
  }

  .meeting-name {
    grid-area: meeting-name;
  }

  .where {
    grid-area: where;
  }

  .when {
    grid: when;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin: 32px 0;
  border-radius: 12px;
`;

const RightAlign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .personnel {
    font-size: 24px;
    font-weight: 600;

    span {
      font-size: 12px;
      margin-left: 4px;
    }
  }
`;
