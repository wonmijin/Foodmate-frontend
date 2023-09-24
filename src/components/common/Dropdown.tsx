import { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps extends ButtonStyle {
  children: React.ReactNode;
  trigger?: 'all' | 'hover' | 'click';
  menus: MenuItem[];
}

type ButtonStyle = {
  bgColor?: string;
  hoverBgColor?: string;
  border?: string;
  fontWeight?: string;
};

export type MenuItem = {
  children: React.ReactNode;
  onClick: () => void;
};

const DropdownContainer = styled.div`
  text-align: center;
  overflow: visible;
  position: relative;
  background-color: rgba(255, 255, 255, 0.01);

  /* &:hover {
    display: block;
  } */

  a {
    padding: 16px 12px;
    font-weight: 400;
    padding: 10px;
    cursor: pointer;
    &:hover {
      font-weight: bold;
      color: #f96223;
    }
  }
`;

const Ul = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  z-index: 9;
  width: 140px;
  left: 50%;
  transform: translate(-50%);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};

  > li {
    display: flex;
    flex-direction: column;
    /* transform: translate(-50%, -50%); */
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
    padding: 5px 0;
  }
`;

const SubmenuList = styled.div`
  cursor: pointer;
  padding: 5px;
`;

const MenuButton = styled.div<ButtonStyle>`
  cursor: pointer;
  font-weight: ${(props) => (props.fontWeight === undefined ? '400' : props.fontWeight)};
  background-color: ${(props) => (props.bgColor === undefined ? '#fff' : props.bgColor)};
  border: ${(props) => (props.border === undefined ? 'none' : props.border)};
`;

const Dropdown = ({ children, trigger = 'all', menus, ...style }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownContainer
      onMouseLeave={() => {
        if (trigger === 'hover' || trigger === 'all') {
          setIsOpen(false);
        }
      }}
      onMouseEnter={() => {
        if (trigger === 'hover' || trigger === 'all') {
          setIsOpen(true);
        }
      }}
    >
      <MenuButton
        {...style}
        onClick={() => {
          if (trigger === 'click' || trigger === 'all') {
            setIsOpen(!isOpen);
          }
        }}
      >
        {children}
      </MenuButton>

      <Ul isOpen={isOpen}>
        <li>
          {menus?.map((menu, index) => (
            <SubmenuList key={index} onClick={menu.onClick}>
              {menu.children}
            </SubmenuList>
          ))}
        </li>
      </Ul>
    </DropdownContainer>
  );
};
export default Dropdown;
