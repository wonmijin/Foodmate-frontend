import { IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

import { postCardData } from '../../mocks/postCardData';
import { PostCard } from '../common/PostCard';

const TodayMeetingContainer = styled.div`
  padding: var(--basic-padding);
  height: 100px;
  align-items: center;
  justify-content: space-between;

  .title-text {
    font-weight: bold;
    font-size: 24px;
    .point {
      display: inline-block;
      margin-right: 10px;
      color: ${(props) => props.theme.color.ORANGE};
    }
  }
`;

const MainPageCommonTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonArrow = styled.div`
  display: flex;
  align-items: center;

  .view-all {
    display: flex;
    height: 100px;
    align-items: center;
    color: #a4a4a4;
    font-weight: 600;
    font-size: 14px;
  }

  img {
    cursor: pointer;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }
  .btn-container {
    margin-left: 20px;
    display: flex;
    gap: 10px;
  }
`;

const TodayCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-width: 309px;
  padding: 0px 15px;
`;

export const TodayMeeting = () => {
  let sliderRef: Slider | null;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  };
  return (
    <TodayMeetingContainer>
      <MainPageCommonTitle>
        <p className="title-text">
          <span className="point">#</span>
          <span>오늘모임</span>
        </p>
        <ButtonArrow>
          <div className="view-all">
            <span>모임전체보기</span>
            <IoIosArrowForward />
          </div>
          <div className="btn-container">
            <img
              src="src/assets/button-arrow-left.svg"
              onClick={() => {
                sliderRef?.slickPrev();
              }}
              alt=""
            />
            <img
              src="src/assets/button-arrow-right.svg"
              onClick={() => {
                sliderRef?.slickNext();
              }}
              alt=""
            />
          </div>
        </ButtonArrow>
      </MainPageCommonTitle>

      <Slider
        ref={(c) => {
          sliderRef = c;
        }}
        {...settings}
      >
        {postCardData.map((card) => {
          return (
            <TodayCardContainer>
              <PostCard cardData={card} key={card.id} />
            </TodayCardContainer>
          );
        })}
      </Slider>
    </TodayMeetingContainer>
  );
};
