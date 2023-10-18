import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { NeighborhoodCardList } from '../components/neighborhood/NeighborhoodCardList';
import { CurrentLocation } from '../components/kakao/CurrentLocation';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { useQuery } from '@tanstack/react-query';
import { getNearGroups } from '../api/groupApi';

export const Neighborhood = () => {
  const myLocation = useCurrentLocation();

  const { data, isLoading, error } = useQuery(
    ['nearGroups', myLocation],
    () => myLocation && getNearGroups(myLocation),
  );
  if (isLoading) return '...loading';
  if (error) return '...error';

  console.log(data);

  return (
    <>
      <BasicPadding>
        <NeighborhoodWrap>
          <h2>내 근처 모임</h2>
          <NeighborhoodContainer>
            <ListSection>
              {!data.content ? (
                <NeighborhoodCardList cardData={data.content} />
              ) : (
                <div className="null-group">반경 5km내 모임이 없어요!</div>
              )}
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

  .null-group {
    padding: 24px 0;
    text-align: center;
    margin-top: 36px;
    margin-left: 8px;
    background-color: #fff;
    border-radius: 12px;
  }
`;

const NeighborhoodContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 12px;
`;

const ListSection = styled.div`
  background-color: ${(props) => props.theme.color.LIGHT_GRAY};
  padding: 12px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${(props) => props.theme.color.GRAY};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.color.GRAY}10;
  }
`;

const MapSection = styled.div`
  flex: 1;
  border-radius: 12px;
  height: 100%;
`;
