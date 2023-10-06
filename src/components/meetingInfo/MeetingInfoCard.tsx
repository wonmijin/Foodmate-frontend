import styled from 'styled-components';

interface MeetingInfoDataType {
  date: string;
  location: string;
  name: string;
  count: number;
  state: string;
  image: string;
}

export const MeetingInfoCard = ({ meetingInfoData }: { meetingInfoData: MeetingInfoDataType }) => {
  return (
    <CardContainer>
      <div className="profile-image">
        <img src={meetingInfoData.image} alt="프로필 사진" />
      </div>
      <div>
        <div className="date">{meetingInfoData.date}</div>
        <div className="location">{meetingInfoData.location}</div>
        <div className="info">
          {meetingInfoData.name} (총 {meetingInfoData.count}명)
        </div>
        <div className="state">{meetingInfoData.state}</div>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  min-width: 400px;

  height: 140px;
  background-color: ${(props) => props.theme.color.GRAY}60;
  border-radius: 12px;
  padding: 0 24px;

  display: flex;
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

  .date {
    font-weight: 900;
  }

  .location,
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
