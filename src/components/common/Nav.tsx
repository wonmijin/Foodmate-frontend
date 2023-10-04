import { BsPersonFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FoodMateLogo from '../../assets/logo2.png';
import { NAV_MENUS } from '../../constants/nav-menus';
import Dropdown, { MenuItem } from './Dropdown';
import { BiSolidDownArrow } from 'react-icons/bi';

const StyledNavContainer = styled.div`
  display: flex;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding: var(--basic-padding);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  h1 {
    margin-right: 50px;
  }
  img {
    display: block;
    height: 50px;
    margin: auto;
  }
`;

const MenuTitle = styled.span`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;

  &:hover {
    color: #f96223;
    font-weight: bold;
  }
`;

const LinksContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sub-nav-title {
    padding: 8px 0;
  }
  > li {
    position: relative;
    width: 140px;
    text-align: center;
    > a {
      cursor: pointer;
      font-size: 16px;
    }
  }
`;
// TODO: 로그인 회원가입 버튼 스타일
// const SignInUp = styled.div`
//   position: absolute;
//   right: 0px;

//   button:first-child {
//     margin-right: 10px;
//   }
// `;

const SignInContainer = styled.div`
  width: 160px;
  height: 50px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const DefaultProfile = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;

  .profile-bg {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #e8e8e8;
    margin-right: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .nick-name {
    margin-right: 5px;
  }
`;

const SubMenuTitle = styled.a`
  font-size: 14px;
`;
const Nav = () => {
  const navigate = useNavigate();

  const myProfileDropMenu = [
    {
      children: <SubMenuTitle>마이페이지</SubMenuTitle>,
      onClick: () => {
        navigate(`/mypage`);
      },
    },
    {
      children: <SubMenuTitle>로그아웃</SubMenuTitle>,
      onClick: () => {
        console.log('로그아웃');
      },
    },
  ];

  const getMenus = (subList: { path: string; title: string }[]): MenuItem[] => {
    return subList.map<MenuItem>(({ title, path }) => {
      const menuItem: MenuItem = {
        children: <SubMenuTitle>{title}</SubMenuTitle>,
        onClick: () => {
          navigate(`/${path}`);
        },
      };

      return menuItem;
    });
  };

  return (
    <StyledNavContainer>
      <NavContent>
        <h1>
          <Link to="/">
            <img src={FoodMateLogo} alt="foodmate Logo" />
          </Link>
        </h1>
        <LinksContainer>
          {NAV_MENUS.map((menu) => {
            return (
              <li key={menu.path}>
                {menu.subList === undefined ? (
                  <Link to={`/${menu.path}`}>
                    <MenuTitle>{menu.title}</MenuTitle>
                  </Link>
                ) : (
                  <Dropdown trigger="hover" menus={getMenus(menu.subList)}>
                    <MenuTitle
                      onClick={() => {
                        navigate(`/${menu.subList![0].path}`);
                      }}
                    >
                      {menu.title}
                    </MenuTitle>
                  </Dropdown>
                )}
              </li>
            );
          })}
        </LinksContainer>
        {/* <SignInUp>
          <BasicButton $fontSize={'16px'}>로그인</BasicButton>
          <BasicButton
            $fontSize={'16px'}
            $backgdColor={'#fff'}
            $borderColor={'#FFCE00'}
          >
            회원가입
          </BasicButton>
        </SignInUp> */}
        <DefaultProfile>
          <div>
            <Dropdown fontWeight="600" trigger="all" menus={myProfileDropMenu}>
              <SignInContainer>
                <div className="profile-bg">
                  <BsPersonFill size="30" color="#fff" />
                </div>
                <span className="nick-name">{'sera1313 '}</span>
                <BiSolidDownArrow style={{ color: '#c5c4c4' }} />
              </SignInContainer>
            </Dropdown>
          </div>
        </DefaultProfile>
      </NavContent>
    </StyledNavContainer>
  );
};

export default Nav;
