/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { useState, useEffect } from 'react';
import { MenuLabels } from '../components/findFoodmate/MenuLabels';
import { PostCardsList } from '../components/common/PostCardsList';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  getAllGroups,
  getCloseGroups,
  getDateSortedGroups,
  getSearchGroups,
  getSelectedMenuGroups,
} from '../api/groupApi';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { DatePickers } from '../components/findFoodmate/DatePickers';
import { BsSearchHeart } from 'react-icons/bs';
import { FiRefreshCcw } from 'react-icons/fi';
import { GeocodeType } from '../types/mapType';
import { useInfiniteQuery } from '@tanstack/react-query';

const categories = [
  { key: 'total', label: '전체' },
  { key: 'distance', label: '거리순' },
  { key: 'date', label: '날짜별' },
  { key: 'menu', label: '메뉴별' },
];

export const FindFoodmate = () => {
  const navigation = useNavigate();
  const myLocation = useCurrentLocation();
  const token = sessionStorage.getItem('accessToken');

  const [selectedCategory, setSelectedCategory] = useState<string>('total');
  const [menuLabelModalOpened, setMenuLabelModalOpened] = useState<boolean>(false);
  const [datePickerModalOpened, setDatePickerModalOpened] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState(null);

  useEffect(() => {
    if (selectedCategory === 'menu') {
      handleMenuLabelModal(true);
    } else {
      handleMenuLabelModal(false);
    }
  }, [selectedCategory]);

  const handleCategories = (category: string) => {
    if (selectedCategory !== 'date') {
      setSelectedDates([]);
    }

    if (selectedCategory !== 'menu') {
      setSelectedMenus([]);
    }

    if (category === 'menu') {
      setMenuLabelModalOpened((prev) => !prev);
    } else {
      setMenuLabelModalOpened(false);
    }

    if (category === 'date') {
      setDatePickerModalOpened((prev) => !prev);
    } else {
      setDatePickerModalOpened(false);
    }

    setSelectedCategory(category);
  };

  const handleMenuLabelModal = (isOpen: boolean) => {
    setMenuLabelModalOpened(isOpen);
  };

  const handleDatePickerModal = (isOpen: boolean) => {
    setDatePickerModalOpened(isOpen);
  };

  const handleSelectedDates = (dates: string[]) => {
    setSelectedDates(dates);
  };

  const handleSelectedMenus = (menu: string[]) => {
    setSelectedMenus(menu);
  };

  const handleSearchClick = async () => {
    setSearchText(searchText);
    if (searchText) {
      try {
        const results = await getSearchGroups(searchText);
        setSearchedData(results.content);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRefresh = () => {
    setSearchedData(null);
    setSearchText('');
  };

  const handlePost = () => {
    if (token) {
      navigation('/findfoodmate/newpost');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const queryFetchGroups = async (
    {
      queryKey,
    }: {
      queryKey: [string, string, string[], string[], GeocodeType | null];
    },
    page: number,
  ) => {
    const [_, selectedCategory, selectedDates, selectedMenus, myLocation] = queryKey;

    switch (selectedCategory) {
      case 'total':
        return getAllGroups(page);
      case 'distance':
        return myLocation ? getCloseGroups(myLocation, page) : null;
      case 'date':
        return selectedDates.length ? getDateSortedGroups(selectedDates[0], selectedDates[1], page) : null;
      case 'menu':
        return selectedMenus.length ? getSelectedMenuGroups(selectedMenus, page) : null;
      default:
        return getAllGroups(page);
    }
  };

  const { data, error, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['getGroups', selectedCategory, selectedDates, selectedMenus, myLocation],
    ({ pageParam = 0 }) =>
      queryFetchGroups(
        { queryKey: ['getGroups', selectedCategory, selectedDates, selectedMenus, myLocation] },
        pageParam,
      ),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.content.length > 0) {
          return lastPage.number + 1;
        }
        return undefined;
      },
    },
  );

  if (isLoading) return 'loading...';
  if (error) return 'error!';

  return (
    <BasicPadding>
      <FindFoodmateContainer>
        <div className="upper">
          <h2>
            <span>#</span> Food Mate 구해요!
          </h2>
          <div className="input-button-container">
            <div className="input-box">
              <BasicInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                $backgdColor="#e8e8e8"
                placeholder="제목이나 닉네임을 입력하세요"
              />
              <div className="icon">
                <div role="button" onClick={handleSearchClick}>
                  <BsSearchHeart />
                </div>
                <div role="button" onClick={handleRefresh}>
                  <FiRefreshCcw />
                </div>
              </div>
            </div>
            <BasicButton $fontSize="12px" onClick={handlePost}>
              모임 만들기
            </BasicButton>
          </div>
          <div className="filters">
            {categories.map((category) => (
              <div
                key={category.key}
                onClick={() => handleCategories(category.key)}
                className={selectedCategory === category.key ? 'active' : ''}
              >
                {category.label}
              </div>
            ))}
          </div>
          <div className="menu-label">
            {menuLabelModalOpened && (
              <div>
                <MenuLabels handleMenuLabelModal={handleMenuLabelModal} handleSelectedMenus={handleSelectedMenus} />
              </div>
            )}
          </div>
          <div className="date-picker">
            {datePickerModalOpened && (
              <div>
                <DatePickers handleDatePickerModal={handleDatePickerModal} handleSelectedDates={handleSelectedDates} />
              </div>
            )}
          </div>
        </div>
        <InfiniteScroll
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '60px 16px',
          }}
          dataLength={(data && data.pages.length) || 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={hasNextPage ? null : <NullBox>더 이상 모임이 없어요.</NullBox>}
        >
          {(data?.pages || [])
            .flatMap((page) => page?.content || [])
            .map((item, idx) => (
              <div key={idx}>{item && <PostCardsList groupsData={searchedData ? searchedData : [item]} />}</div>
            ))}
        </InfiniteScroll>
      </FindFoodmateContainer>
    </BasicPadding>
  );
};

const FindFoodmateContainer = styled.div`
  margin: 60px 0;

  h2 > span {
    color: ${(props) => props.theme.color.ORANGE};
  }

  .upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .input-button-container {
    display: flex;
    gap: 12px;
    margin-top: 24px;

    .input-box {
      position: relative;

      .icon {
        position: absolute;
        right: 16px;
        top: 6px;
        display: flex;
        gap: 12px;
        font-size: 19px;

        div {
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            color: ${(props) => props.theme.color.ORANGE};
          }
        }
      }
    }
  }

  .filters {
    padding: 12px 0 48px 0;
    display: flex;

    div {
      border: 1px solid #c0c0c0;
      padding: 8px;
      width: 100px;
      text-align: center;
      border-right: none;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: ${(props) => props.theme.color.YELLOW};
      }

      &:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }

      &:last-child {
        border-right: 1px solid ${(props) => props.theme.color.GRAY};
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &.active {
        background-color: ${(props) => props.theme.color.YELLOW};
        font-weight: 600;
      }
    }
  }

  .menu-label,
  .date-picker {
    background-color: #fff;
    position: absolute;
    bottom: -150px;
  }

  .date-picker {
    bottom: -55px;
  }
`;

const NullBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #888;
`;
