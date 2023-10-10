import { useState } from 'react';
import styled from 'styled-components';
import { BasicButton } from '../common/BasicButton';
import { AlertModal } from '../common/AlertModal';

interface MeetingInfoDataType {
  enrollmentId: number;
  groupId: number;
  memberId: number;
  nickname: string;
  image: string;
  title: string;
  name: string;
  food: string;
  date: string;
  time: string;
  maximum: number;
  storeName: string;
  storeAddress: string;
}

export const MeetingInfoRequestCard = ({ meetingInfoData }: { meetingInfoData: MeetingInfoDataType }) => {
  const [isOpenedAlertModal, setIsOpenedAlertModal] = useState(false);
  const [alertModalContent, setAlertModalContent] = useState({
    question: '',
    func: (() => {}) as () => void,
  });

  const handleAccept = () => {
    alert('수락했어요!');
  };
  const handleRefuse = () => {
    alert('거절했어요!');
  };

  const handelButtons = (result: string, question: string) => {
    setIsOpenedAlertModal(true);
    setAlertModalContent((prev) => ({ ...prev, question: question }));

    if (result === '수락') {
      setAlertModalContent((prev) => ({ ...prev, func: handleAccept }));
    } else if (result === '거절') {
      setAlertModalContent((prev) => ({ ...prev, func: handleRefuse }));
    }
  };

  return (
    <CardContainer>
      <LeftSection>
        <div className="profile-image">
          <img src={meetingInfoData.image} alt="프로필 사진" />
        </div>
        <div>
          <div className="nickname">{meetingInfoData.nickname}</div>
          <div className="info">
            <strong>{meetingInfoData.title}</strong> <br />
            {meetingInfoData.storeName} | {meetingInfoData.name} (총 {meetingInfoData.maximum}명)
          </div>
        </div>
      </LeftSection>
      <RightSection>
        <BasicButton $fontSize="14px" onClick={() => handelButtons('수락', '모임에 참여 시킬까요?')}>
          수락
        </BasicButton>
        <BasicButton
          $fontSize="14px"
          $backgdColor="inherit"
          $borderColor="#9c9c9c"
          $fontColor="#9c9c9c"
          $hoverBackgdColor="#9c9c9c30"
          onClick={() => handelButtons('거절', '정말 거절할까요?')}
        >
          거절
        </BasicButton>
      </RightSection>

      {isOpenedAlertModal && (
        <AlertModal handleYesClick={alertModalContent.func} handleAlertModal={setIsOpenedAlertModal}>
          {alertModalContent.question}
        </AlertModal>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${(props) => props.theme.color.GRAY}60;
  border-radius: 12px;
  padding: 0 24px;

  display: flex;
  align-items: center;
`;

const LeftSection = styled.div`
  width: 100%;
  min-width: 400px;
  display: flex;
  flex: 1;

  align-items: center;
  gap: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-image {
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
  }

  .nickname {
    font-weight: 900;
  }

  .info {
    font-size: 14px;
    color: ${(props) => props.theme.color.DARK_GRAY};
    margin: 4px 0;
  }

  .state {
    font-size: 14px;
    font-weight: 900;
    color: ${(props) => props.theme.color.ORANGE};
  }
`;

const RightSection = styled.div`
  button {
    padding: 8px 21px;
    margin-left: 8px;
  }
`;