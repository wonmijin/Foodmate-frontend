import styled from 'styled-components';
import mainbg from '../../assets/mainbg.png';
import { BasicButton } from '../common/BasicButton';
import { ImSearch } from 'react-icons/im';

const MainBg = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${mainbg}) no-repeat center;

  .bg-filter {
    width: 100%;
    height: 97vh;
    position: absolute;
    background-color: rgb(130, 130, 130, 0.5);
  }
`;
const MainText = styled.h2`
  color: #fff;
  /* position: absolute; */
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  font-size: 50px;
  width: 100%;
  text-align: center;
  > span {
    color: #ffe782;
  }
`;

const MainSearchContainer = styled.div`
  padding: 18px;
  background-color: #fff;
  border-radius: 8px;
  width: 50%;
  margin-top: 32px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  > input {
    display: inline-block;
    padding: 14px;
    background-color: #f5f5f5;
    border: none;
    width: 80%;
    margin-right: 18px;
    border-radius: 8px;
    /* margin: 24px; */
  }
`;
const MainContentsContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Shortcuts = styled.div`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  .iconDiv {
    margin-right: 10px;
    font-size: 12px;
  }
`;

export const MainSearchbar = () => {
  return (
    <MainBg>
      <div className='bg-filter'></div>
      <MainContentsContainer>
        <MainText>
          당신의 <span>Food Mate</span>를 찾아보세요
        </MainText>
        <MainSearchContainer>
          <input placeholder='원하는 음식으로 활성화된 모임을 찾아보세요(ex. 🍕, 🍗, 🍷)'></input>
          <BasicButton
            $fontSize={'16px'}
            $fontColor='#fff'
            $backgdColor={'#f96223'}
          >
            <Shortcuts>
              <div className='iconDiv'>
                <ImSearch />
              </div>
              모임 바로가기
            </Shortcuts>
          </BasicButton>
        </MainSearchContainer>
      </MainContentsContainer>
    </MainBg>
  );
};
