import { styled } from "styled-components";
import { BasicPadding } from "../components/common/BasicPadding";
import { BasicInput } from "../components/common/BasicInput";
import { BasicButton } from "../components/common/BasicButton";
import { useState } from "react";
import { MenuLabels } from "../components/findFoodmate/MenuLabels";

const categories = [
  { key: "total", label: "전체" },
  { key: "distance", label: "거리순" },
  { key: "date", label: "날짜별" },
  { key: "menu", label: "메뉴별" },
];

export const FindFoodmate = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("total");

  const handleCategories = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <BasicPadding>
      <FindFoodmateContainer>
        <h2>밥 친구 구해요!</h2>
        <div className="input-button-container">
          <BasicInput
            $backgdColor="#e8e8e8"
            placeholder="제목이나 닉네임을 입력하세요"
          />
          <BasicButton $fontSize="16px">모임 만들기</BasicButton>
        </div>
        <div className="filters">
          {categories.map((category) => (
            <div
              key={category.key}
              onClick={() => handleCategories(category.key)}
              className={selectedCategory === category.key ? "active" : ""}
            >
              {category.label}
            </div>
          ))}
        </div>
        {selectedCategory === "menu" && <MenuLabels />}
      </FindFoodmateContainer>
    </BasicPadding>
  );
};

const FindFoodmateContainer = styled.div`
  margin: 28px 0;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;

  .input-button-container {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .filters {
    display: flex;

    div {
      border: 1px solid #c0c0c0;
      padding: 8px;
      width: 106px;
      text-align: center;
      border-right: none;
      font-size: 14px;
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
`;
