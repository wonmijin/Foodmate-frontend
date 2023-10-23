import { useState } from 'react';
import styled from 'styled-components';
import { MenuLabel } from '../common/MenuLabel';
import { AiFillCloseCircle } from 'react-icons/ai';
import { LABELCOLOR } from '../../constants/menu';
import { BasicButton } from '../common/BasicButton';

interface MenuLabelsPropsType {
  handleMenuLabelModal: (isOpen: boolean) => void;
  handleSelectedMenus: (menu: string[]) => void;
}

export const MenuLabels = ({ handleMenuLabelModal, handleSelectedMenus }: MenuLabelsPropsType) => {
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);

  const handleLabels = (menu: string) => {
    const updatedSelectedMenus = selectedMenus.includes(menu)
      ? selectedMenus.filter((selectedMenu) => selectedMenu !== menu)
      : [...new Set([...selectedMenus, menu])];
    setSelectedMenus(updatedSelectedMenus);
  };

  const handleSelectComplete = () => {
    const modifiedArr = selectedMenus.map((item) => {
      return item.replace(/·/g, '');
    });

    handleSelectedMenus(modifiedArr);
    handleMenuLabelModal(false);
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
      <div className="close-button" onClick={() => handleMenuLabelModal && handleMenuLabelModal(false)}>
        <AiFillCloseCircle />
      </div>
      <BasicButton
        onClick={handleSelectComplete}
        $fontSize="12px"
        $backgdColor="#acacac"
        $fontColor="#fff"
        $hoverBackgdColor="#8c8c8c"
      >
        선택 완료
      </BasicButton>
    </MenuLabelsContainer>
  );
};

const MenuLabelsContainer = styled.div`
  font-size: 12px;
  border: 1px solid #c0c0c0;
  border-radius: 12px;
  width: 650px;
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;

  .close-button {
    font-size: 22px;
    color: ${(props) => props.theme.color.ORANGE}90;
    position: absolute;
    top: 3px;
    right: 6px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: ${(props) => props.theme.color.ORANGE};
    }
  }

  & > button {
    width: 20%;
    margin-top: 12px;
  }
`;
