import styled from 'styled-components';
import { MeetingInfoRequestCard } from './MeetingInfoRequestCard';
import { MeetingRequestDataType } from '../../types/postCardType';

export const MeetingInfoRequestCardList = ({ requestData }: { requestData: MeetingRequestDataType[] | undefined }) => {
  if (!requestData) {
    return null;
  }

  return (
    <MeetingInfoCardListContainer>
      {requestData.map((data) => {
        return <MeetingInfoRequestCard meetingInfoData={data} key={data.enrollmentId} />;
      })}
    </MeetingInfoCardListContainer>
  );
};

const MeetingInfoCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
`;
