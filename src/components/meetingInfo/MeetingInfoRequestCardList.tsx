import styled from 'styled-components';
import { MeetingInfoRequestCard } from './MeetingInfoRequestCard';

export const MeetingInfoRequestCardList = () => {
  //inquiry에서 분기처리 후 데이터를 해당 컴포넌트에 내려줘야 함
  const meetingInfoData = [
    {
      enrollmentId: 123,
      groupId: 2,
      memberId: 7,
      nickname: '띠띠뽀',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
      title: '치킨 먹을 사람 있나요?????',
      name: '치맥러버',
      food: '치킨',
      date: '2023-09-15',
      time: '18:30',
      maximum: 8,
      storeName: 'BBQ 홍대점',
      storeAddress: '서울특별시 마포구 동교동 147-4',
    },
    {
      enrollmentId: 124,
      groupId: 3,
      memberId: 6,
      nickname: '타요',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
      title: '떡볶이 먹을 사람! 매운 것 좋아하는 사람!',
      name: '떡볶이중독',
      food: '분식',
      date: '2023-09-18',
      time: '18:30',
      maximum: 8,
      storeName: '응급실 떡볶이 서면점',
      storeAddress: '부산광역시 서면로 147-4',
    },
    {
      enrollmentId: 125,
      groupId: 4,
      memberId: 5,
      nickname: '루피',
      image: 'https://image.ytn.co.kr/general/jpg/2022/0720/202207200953502382_d.jpg',
      title: '마라 중독자들 모여라',
      name: '마라쨩',
      food: '중식',
      date: '2023-10-06',
      time: '18:30',
      maximum: 8,
      storeName: '마라집 김해점',
      storeAddress: '경상남도 김해시 삼계로 200',
    },
  ];

  return (
    <MeetingInfoCardListContainer>
      {meetingInfoData.map((data, idx) => {
        return <MeetingInfoRequestCard meetingInfoData={data} key={idx} />;
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
