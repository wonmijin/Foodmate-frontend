import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicInput } from '../components/common/BasicInput';
import { NeighborhoodCardList } from '../components/neighborhood/NeighborhoodCardList';
import { CurrentLocation } from '../components/kakao/CurrentLocation';

export const Neighborhood = () => {
  //CurrentLocation에서 내 위치를 보내고 데이터를 받은 후, 리스트를 뿌려줘야 함

  return (
    <>
      <BasicPadding>
        <NeighborhoodWrap>
          <h2>내 근처 모임</h2>
          <NeighborhoodContainer>
            <ListSection>
              <div>
                <div className="input-wrap">
                  <BasicInput $backgdColor="#fff" placeholder="제목이나 닉네임을 입력하세요" />
                </div>
                <NeighborhoodCardList />
              </div>
            </ListSection>
            <MapSection>
              <CurrentLocation />
            </MapSection>
          </NeighborhoodContainer>
        </NeighborhoodWrap>
      </BasicPadding>
    </>
  );
};

const NeighborhoodWrap = styled.div`
  margin: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NeighborhoodContainer = styled.div`
  width: 100%;
  height: 100vh;
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  gap: 12px;
`;

const ListSection = styled.div`
  background-color: ${(props) => props.theme.color.LIGHT_GRAY};
  padding: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;

  .input-wrap {
    margin-bottom: 12px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${(props) => props.theme.color.ORANGE};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.ORANGE}10;
  }
`;

const MapSection = styled.div`
  flex: 1;
  border-radius: 12px;
  height: 100%;
`;
