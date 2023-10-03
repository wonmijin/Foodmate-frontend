import styled from 'styled-components';
import { BasicPadding } from '../components/common/BasicPadding';
import { BasicInput } from '../components/common/BasicInput';

export const Neighborhood = () => {
  return (
    <>
      <BasicPadding>
        <NeighborhoodContainer>
          <ListSection>
            <div>
              <BasicInput $backgdColor="#fff" />
            </div>
          </ListSection>
          <MapSection>d</MapSection>
        </NeighborhoodContainer>
      </BasicPadding>
    </>
  );
};

const NeighborhoodContainer = styled.div`
  margin: 120px 0;

  width: 100%;
  height: 500px;
  border-radius: 12px;
  padding: 32px 24px;

  display: flex;
`;

const ListSection = styled.div`
  background-color: ${(props) => props.theme.color.LIGHT_GRAY};
  width: 35%;
  border-radius: 12px;
  display: flex;
`;

const MapSection = styled.div`
  background-color: blue;
  flex: 1;
  border-radius: 12px;
`;
