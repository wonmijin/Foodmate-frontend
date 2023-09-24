import { styled } from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicInput } from '../components/common/BasicInput';
import { BasicButton } from '../components/common/BasicButton';
import { useState, useEffect } from 'react';
import { MenuLabels } from '../components/findFoodmate/MenuLabels';
import { PostCardsList } from '../components/common/PostCardsList';

const categories = [
  { key: 'total', label: '전체' },
  { key: 'distance', label: '거리순' },
  { key: 'date', label: '날짜별' },
  { key: 'menu', label: '메뉴별' },
];

export const FindFoodmate = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('total');
  const [menuLabelModalOpened, setMenuLabelModalOpened] = useState<boolean>(false);

  const handleCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMenuLabelModal = (bool: boolean) => {
    setMenuLabelModalOpened(bool);
  };

  useEffect(() => {
    if (selectedCategory === 'menu') {
      handleMenuLabelModal(true);
    } else {
      handleMenuLabelModal(false);
    }
  }, [selectedCategory]);

  return (
    <BasicPadding>
      <FindFoodmateContainer>
        <div className="upper">
          <h2>밥 친구 구해요!</h2>
          <div className="input-button-container">
            <BasicInput $backgdColor="#e8e8e8" placeholder="제목이나 닉네임을 입력하세요" />
            <BasicButton $fontSize="12px">모임 만들기</BasicButton>
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
                <MenuLabels handleMenuLabelModal={handleMenuLabelModal} />
              </div>
            )}
          </div>
        </div>
        <PostCardsList />
      </FindFoodmateContainer>
    </BasicPadding>
  );
};

const FindFoodmateContainer = styled.div`
  margin: 28px 0;

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

  .menu-label {
    background-color: #fff;
    position: absolute;
    bottom: -100px;
  }
`;
