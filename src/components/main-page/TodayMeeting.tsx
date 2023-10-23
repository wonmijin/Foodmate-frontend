import { IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import { PostCard } from '../common/PostCard';
import { Link } from 'react-router-dom';
import { useTodayMeeting } from '../../hooks/useTodayMeeting';
import { useEffect, useState } from 'react';
import TodayMeetingType from '../../types/todayMeetingType';
import LeftArrowBtn from '../../assets/button-arrow-left.svg';
import RightArrowBtn from '../../assets/button-arrow-right.svg';

const TodayMeetingContainer = styled.div`
  padding: var(--basic-padding);

  @media only screen and (max-width: 992px) {
    padding: 0 10px;
  }

  .title-text {
    font-weight: bold;
    font-size: 24px;

    @media only screen and (max-width: 768px) {
      font-size: 1.438rem;
    }

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
    font-weight: 400;
    font-size: 14px;

    a {
      color: #a4a4a4;
      display: flex;
      align-items: center;
    }

    @media only screen and (max-width: 768px) {
      font-size: 0.75rem;
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

    @media only screen and (max-width: 768px) {
      margin-left: 10px;
    }
  }
`;

const TodayCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-width: 40%;
  padding: 0 2%;
`;

export const TodayMeeting = () => {
  const [page, setPage] = useState<number>(0);
  const [curSlidesToShow, setCurSlidesToShow] = useState<number>(4);
  const { data: todayMeetingData } = useTodayMeeting(page);
  const [todayMeetingList, setTodayMeetingList] = useState<TodayMeetingType[]>([]);
  let sliderRef: Slider | null;

  const settings = {
    beforeChange: (currentSlide: number, nextSlide: number): void => {
      setCurSlidesToShow(nextSlide - currentSlide); // 현재 화면에 보여지는 Slider의 개수를 계산 한다.
    },
    afterChange: (currentSlide: number): void => {
      if (todayMeetingData === undefined) return;
      if (page + 1 === todayMeetingData.totalPages) return;

      // 데이터를 미리 가져오지 않을 경우, 슬라이더 페이지 전환이 동일하게 되지 않아, *2를 해서 미리 가져오도록 한다.
      if (todayMeetingData.content.length <= currentSlide + curSlidesToShow * 2) {
        setPage(page + 1);
      }
    },
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    arrows: false,
    dots: false,
    accessibility: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (todayMeetingData !== undefined) {
      const newTodayMeetingList = [...todayMeetingList];
      newTodayMeetingList.push(...todayMeetingData.content);
      setTodayMeetingList(newTodayMeetingList);

      //Slider의responsive 동작 시에 초기 데이터를 보여주지 못하는 이슈 대응
      if (page === 0) {
        sliderRef?.slickGoTo(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayMeetingData]);

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
              src={LeftArrowBtn}
              onClick={() => {
                sliderRef?.slickPrev();
              }}
              alt="이전버튼"
            />
            <img
              src={RightArrowBtn}
              onClick={() => {
                sliderRef?.slickNext();
              }}
              alt="다음버튼"
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
        {todayMeetingList.map((card) => {
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
