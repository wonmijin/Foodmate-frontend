import styled from 'styled-components';
import { MeetingInfoCard } from './MeetingInfoCard';

export const MeetingInfoCardList = () => {
  //history에서 분기처리 후 데이터를 해당 컴포넌트에 내려줘야 함
  const meetingInfoData = [
    {
      date: '2023년 09월 12일 20:00',
      location: '부산광역시 부산진구 서면로 56',
      name: '수료시켜조',
      count: 7,
      state: '신청 완료',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
    },
    {
      date: '2023년 09월 12일 21:00',
      location: '경상남도 김해시 부원로 56',
      name: '개발자시켜조',
      count: 7,
      state: '거절됨',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
    },
    {
      date: '2023년 09월 12일 22:00',
      location: '부산광역시 부산진구 서면로 56',
      name: '취업시켜조',
      count: 7,
      state: '신청 완료',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
    },
  ];

  return (
    <MeetingInfoCardListContainer>
      {meetingInfoData.map((data) => {
        return <MeetingInfoCard meetingInfoData={data} />;
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
