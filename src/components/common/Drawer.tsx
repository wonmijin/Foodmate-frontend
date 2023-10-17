import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import styled from 'styled-components';
import drawerState from '../../store/drawer';
import FoodMateLogo from '../../assets/logo2.png';
import { NAV_MENUS } from '../../constants/nav-menus';
import { Link, useLocation } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);

  ${(props) =>
    props.$isOpen
      ? ` 
      opacity: 1;
      z-index: 11;
      visibility: visible;
    `
      : ` 
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    transition: 325ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  `}
`;

const DrawerDiv = styled.div<{ $isOpen: boolean }>`
  top: 0;
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  outline: 0;
  z-index: 1200;
  position: fixed;
  overflow-y: auto;
  flex-direction: column;
  left: 0;
  right: auto;

  background-color: #ffffff;
  width: 300px;
  flex-shrink: 0;

  transition:
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${(props) =>
    props.$isOpen
      ? `
  visibility: visible;
  transform: none;
  box-shadow:
    0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  `
      : ` 
  visibility: hidden;
  width: 240px;
  transform: translateX(-240px);
  flex-shrink: 0;
  transition: 325ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  `}
`;

const Header = styled.header`
  min-height: 60px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  h1 {
    height: 56px;
    display: flex;
    align-items: center;
  }

  img {
    height: 2.65rem;
    vertical-align: middle;
  }
`;

const CloseButton = styled.button`
  width: 2.625rem;
  height: 2.625rem;
  border-radius: 8px;
  border: 1px solid #ffce00;
  padding: 8px;
`;

const MainNav = styled.div`
  padding: 0 0.5rem 1rem;

  nav {
    padding: 8px;

    li {
      padding: 12px 14px;
    }

    a,
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      width: 254px;
      flex-wrap: wrap;
      cursor: pointer;
    }
  }

  .drawer-submenu {
    display: none;
    margin-top: 10px;

    > li {
      padding: 4px;
    }

    a {
      display: flex;
      font-size: 1rem;
      color: #7c7c7c;
    }
  }

  svg {
    transition: all 0.3s;
  }

  .active {
    svg {
      transform: rotate(180deg);
    }

    > .drawer-submenu {
      display: block;
    }
  }
`;

export const Drawer = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(drawerState);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} aria-hidden="true"></Overlay>
      <DrawerDiv $isOpen={isOpen}>
        <Header>
          <h1>
            <Link to="/">
              <img src={FoodMateLogo} alt="foodmate" />
            </Link>
          </h1>
          <CloseButton onClick={() => setIsOpen(false)}>
            <IoCloseOutline size="26" color="#212121" />
          </CloseButton>
        </Header>
        <MainNav>
          <nav>
            {NAV_MENUS.map((menu) => {
              return (
                <li key={menu.path}>
                  {menu.subList === undefined ? (
                    <Link to={`${menu.path}`}>{menu.title}</Link>
                  ) : (
                    <div
                      onClick={(e) => {
                        const element = e.currentTarget as Element;
                        if (element.classList.contains('active')) {
                          element.classList.remove('active');
                        } else {
                          element.classList.add('active');
                        }
                      }}
                    >
                      <button>
                        {menu.title}
                        <span>
                          <MdKeyboardArrowDown size="26" color="#4F4F4F" />
                        </span>
                      </button>
                      <ul className="drawer-submenu">
                        {menu.subList.map(({ title, path }) => {
                          return (
                            <li key={path}>
                              <Link to={`/${path}`}>{title}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </nav>
        </MainNav>
      </DrawerDiv>
    </>
  );
};
