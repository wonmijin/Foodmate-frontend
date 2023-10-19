import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/logo2.png';
import { NAV_MENUS } from '../../constants/nav-menus';
import Dropdown, { MenuItem } from './Dropdown';
import { BasicButton } from './BasicButton';
import { HiOutlineMenu } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import drawerState from '../../store/drawer';
import { useMediaQuery } from 'react-responsive';

// TODO: 로그인 후 필요한 아이콘
// import { BsPersonFill } from 'react-icons/bs';
// import { BiSolidDownArrow } from 'react-icons/bi';

const FakeNav = styled.div`
  height: 60px;
`;

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

  @media only screen and (min-width: 1200px) {
    padding: var(--basic-padding);
  }

  @media only screen and (max-width: 992px) {
    padding: 0 10px;
  }
`;

const NavContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

const NavLeftContent = styled.div`
  display: flex;
  align-items: center;
  width: 63%;
  justify-content: space-between;

  @media only screen and (max-width: 1200px) {
    width: 76%;
  }

  @media only screen and (max-width: 768px) {
    width: 75%;
  }

  h1 {
    img {
      display: block;
      height: 2.65rem;
      margin: auto;

      @media only screen and (max-width: 768px) {
        height: 2rem;
      }
    }
  }
`;

const LinksContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  .sub-nav-title {
    padding: 8px 0;
  }

  > li {
    position: relative;
    text-align: center;
  }

  span {
    font-size: 15px;
  }
`;

const Hamburger = styled.button`
  display: none;
  width: 2.65rem;
  height: 2.65rem;
  padding: 8px;
  margin-right: 10px;
  color: #212121;

  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    border: 1px solid #ffce00;
    width: 2rem;
    height: 2rem;
  }
`;

// TODO: 로그인 회원가입 버튼 스타일
const SignInUp = styled.div`
  display: flex;
  white-space: nowrap;

  button:first-child {
    margin-right: 10px;

    @media only screen and (max-width: 992px) {
      margin-right: 5px;
    }
  }

  button > span {
    font-weight: 400;
  }
`;

const MenuTitle = styled.span`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;

  &:hover {
    color: #f96223;
    font-weight: bold;
  }
`;

//TODO: 로그인 후, 스타일
// const SignInContainer = styled.div`
//   width: 160px;
//   height: 50px;
//   display: flex;
//   justify-content: end;
//   align-items: center;
// `;

// const DefaultProfile = styled.div`
//   display: flex;
//   align-items: center;
//   position: absolute;
//   right: 0px;

//   .profile-bg {
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     background-color: #e8e8e8;
//     margin-right: 10px;
//     align-items: center;
//     display: flex;
//     justify-content: center;
//   }

//   .nick-name {
//     margin-right: 5px;
//   }
// `;

const SubMenuTitle = styled.a`
  font-size: 14px;
`;

const Nav = () => {
  const navigate = useNavigate();
  const setIsOpen = useRecoilState<boolean>(drawerState)[1];
  const isTablet = useMediaQuery({ query: '(max-width : 768px)' });

  //TODO: 로그인 이후, 프로필 드롭메뉴
  // const myProfileDropMenu = [
  //   {
  //     children: <SubMenuTitle>마이페이지</SubMenuTitle>,
  //     onClick: () => {
  //       navigate(`/mypage/profile`);
  //     },
  //   },
  //   {
  //     children: <SubMenuTitle>로그아웃</SubMenuTitle>,
  //     onClick: () => {
  //       console.log('로그아웃');
  //     },
  //   },
  // ];

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
    <>
      <FakeNav />
      <StyledNavContainer>
        <NavContent>
          <Hamburger onClick={() => setIsOpen(true)}>
            <HiOutlineMenu size="26" color="#212121" />
          </Hamburger>
          <NavLeftContent>
            <h1>
              <Link to="/">
                <img src={Logo} alt="푸드메이트 로고" />
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
          </NavLeftContent>
          <SignInUp>
            <BasicButton $fontSize={isTablet ? '12px' : '13px'} onClick={() => navigate('/login')}>
              <span>로그인</span>
            </BasicButton>
            <BasicButton
              $fontSize={isTablet ? '12px' : '13px'}
              $backgdColor={'#fff'}
              $borderColor={'#FFCE00'}
              onClick={() => navigate('/register')}
            >
              <span>회원가입</span>
            </BasicButton>
          </SignInUp>
          {/* 
          // TODO: 로그인 이후 사용될 마크업
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
          </DefaultProfile> */}
        </NavContent>
      </StyledNavContainer>
    </>
  );
};

export default Nav;
