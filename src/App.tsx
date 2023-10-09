import { Route, Routes } from 'react-router-dom';
import Nav from './components/common/Nav';
import ScrollToTop from './utils/ScrollToTop';
import { CreateGroupPost } from './pages/CreateGroupPost';
import { FindFoodmate } from './pages/FindFoodmate';
import { History } from './pages/History';
import { Inquiry } from './pages/Inquiry';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { MeetingPostDetailView } from './pages/MeetingPostDetailView';
import { Neighborhood } from './pages/Neighborhood';

export const App = (): JSX.Element => {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Login />} />
        <Route path="/findfoodmate" element={<FindFoodmate />} />
        <Route path="/findfoodmate/:groupId" element={<MeetingPostDetailView />} />
        <Route path="/findfoodmate/newpost" element={<CreateGroupPost />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
        <Route path="meeting-info/history" element={<History />} />
        <Route path="meeting-info/inquiry" element={<Inquiry />} />
      </Routes>
    </>
  );
};
