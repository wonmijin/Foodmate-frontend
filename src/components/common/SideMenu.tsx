import { useState } from 'react';
import styled from 'styled-components';
import { NAV_MENUS } from '../../constants/nav-menus';
import { useNavigate } from 'react-router-dom';

interface SideMenuListType {
  sideMenuList: {
    title: string;
    list: string[];
  };
  // handleSideMenu: (menu: string) => void;
}

export const SideMenu = (props: SideMenuListType) => {
  const navigation = useNavigate();
  const { sideMenuList } = props;

  // 요청 조회 만들 때 동적으로 수정하기!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSideMenu, setSelectedSideMenu] = useState('history');

  const getSubListPath = (submenu: string) => {
    const subMenuData = NAV_MENUS[2].subList?.find((sub) => sub.title === submenu);
    return subMenuData?.path || '';
  };

  const handleSideMenu = (subListPath: string) => {
    navigation('/' + subListPath);
  };

  return (
    <SideMenuContainer>
      <div className="sidemenu-title">
        <div className="foodmate">FOODMATE</div>
        <div>{sideMenuList.title}</div>
      </div>

      {sideMenuList.list.map((menu: string, idx: number) => {
        const subListPath = getSubListPath(menu);

        return (
          <div
            key={idx}
            className={subListPath === selectedSideMenu ? 'selected-sidemenu' : ''}
            onClick={() => handleSideMenu(subListPath)}
          >
            {menu}
          </div>
        );
      })}
    </SideMenuContainer>
  );
};

const SideMenuContainer = styled.aside`
  .sidemenu-title {
    border-top: 1px solid #c0c0c0;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: ${(props) => props.theme.color.DARK_GRAY};
    color: #fff;
    padding: 38px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .foodmate {
    color: ${(props) => props.theme.color.YELLOW};
    font-size: 12px;
  }

  & > div {
    padding: 16px 38px;
    border: 1px solid #c0c0c0;
    border-top: 0;
  }

  & > div:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  & > div:not(:first-child) {
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background-color: ${(props) => props.theme.color.YELLOW};
    }
  }

  .selected-sidemenu {
    background-color: ${(props) => props.theme.color.YELLOW};
  }
`;
