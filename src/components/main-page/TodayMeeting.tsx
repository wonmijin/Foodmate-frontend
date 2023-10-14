import { IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import { postCardData } from '../../mocks/postCardData';
import { PostCard } from '../common/PostCard';
import { Link } from 'react-router-dom';

const TodayMeetingContainer = styled.div`
  padding: var(--basic-padding);

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
    a {
      color: #a4a4a4;
    }
  }

  img {
    cursor: pointer;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow:
      0px 14px 32px 0px rgba(255, 178, 14, 0.29),
      0px 5px 8px 0px rgba(222, 151, 0, 0.24);

    &:hover {
      filter: brightness(105%);
    }
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
  min-width: 40%;
  padding: 0 2%;
`;

export const TodayMeeting = () => {
  let sliderRef: Slider | null;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    dots: false,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
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
            <Link to="/findfoodmate">
              모임전체보기
              <IoIosArrowForward />
            </Link>
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
            <TodayCardContainer key={card.groupId}>
              <PostCard cardData={card} key={card.groupId} />
            </TodayCardContainer>
          );
        })}
      </Slider>
    </TodayMeetingContainer>
  );
};
