import styled from 'styled-components';
import { MeetingInfoCard } from './MeetingInfoCard';
import { MeetingInfoDataType } from '../../types/postCardType';

export const MeetingInfoCardList = ({ historyData }: { historyData: MeetingInfoDataType[] }) => {
  return (
    <MeetingInfoCardListContainer>
      {historyData.map((data, idx) => {
        return <MeetingInfoCard meetingInfoData={data} key={idx} />;
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
