import styled from 'styled-components';
import { TodayMeeting } from '../components/main-page/TodayMeeting';
import Ranking from '../components/main-page/Ranking';
import { Search } from '../components/main-page/Search';

const MainPageContainer = styled.div``;
const Section = styled.section`
  padding-top: 3rem;
  padding-bottom: 2rem;
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <Search />
      <Section>
        <TodayMeeting />
      </Section>
      <Section>
        <Ranking />
      </Section>
    </MainPageContainer>
  );
};

export default MainPage;
