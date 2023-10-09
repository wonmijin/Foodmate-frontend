import { useState } from 'react';
import styled from 'styled-components';
import { MenuLabel } from './MenuLabel';
import { LABELCOLOR } from '../../constants/menu';

export const Food = () => {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

  const handleLabels = (menu: string) => {
    const updatedSelectedMenus = selectedMenus.includes(menu)
      ? selectedMenus.filter((selectedMenu) => selectedMenu !== menu)
      : [...selectedMenus, menu];
    setSelectedMenus(updatedSelectedMenus);
  };

  return (
    <MenuLabelsContainer>
      {LABELCOLOR.map((item, idx) => {
        const isSelected = selectedMenus.includes(item.menu);

        return (
          <MenuLabel $menuColor={item.color} key={idx} onClick={() => handleLabels(item.menu)} $isSelected={isSelected}>
            {item.menu}
          </MenuLabel>
        );
      })}
    </MenuLabelsContainer>
  );
};

const MenuLabelsContainer = styled.div`
  font-size: 12px;
  width: 430px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 4px;
`;
