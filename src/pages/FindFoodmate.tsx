import { styled } from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { useState, useEffect } from 'react';
import { MenuLabels } from '../components/findFoodmate/MenuLabels';
import { PostCardsList } from '../components/common/PostCardsList';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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

const categories = [
  { key: 'total', label: '전체' },
  { key: 'distance', label: '거리순' },
  { key: 'date', label: '날짜별' },
  { key: 'menu', label: '메뉴별' },
];

export const FindFoodmate = () => {
  const navigation = useNavigate();
  const myLocation = useCurrentLocation();
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
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleRefresh = () => {
    setSearchedData(null);
    setSearchText('');
  };

  let categoryFunction;
  if (selectedCategory === 'total') {
    categoryFunction = getAllGroups;
  } else if (selectedCategory === 'distance') {
    categoryFunction = myLocation ? () => getCloseGroups(myLocation) : () => null;
  } else if (selectedCategory === 'date' && selectedDates.length !== 0) {
    categoryFunction = () => getDateSortedGroups(selectedDates[0], selectedDates[1]);
  } else if (selectedCategory === 'menu' && selectedMenus.length !== 0) {
    categoryFunction = () => getSelectedMenuGroups(selectedMenus);
  }

  const { data, error, isLoading } = useQuery(
    ['getGroups', selectedCategory, selectedDates, selectedMenus],
    categoryFunction || getAllGroups,
  );
  if (isLoading) return 'Loading...';
  if (error) return 'error!';

  return (
    <BasicPadding>
      <FindFoodmateContainer>
        <div className="upper">
          <h2>밥 친구 구해요!</h2>
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
            <BasicButton $fontSize="12px" onClick={() => navigation('/findfoodmate/newpost')}>
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
        {data.content.length === 0 && !searchedData ? (
          <div>데이터가 없어요</div>
        ) : (
          <PostCardsList groupsData={searchedData || data.content} />
        )}
      </FindFoodmateContainer>
    </BasicPadding>
  );
};

const FindFoodmateContainer = styled.div`
  margin: 120px 0;

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
