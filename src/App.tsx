import { Route, Routes } from 'react-router-dom';
import Nav from './components/common/Nav';
import ScrollToTop from './utils/ScrollToTop';
import Footer from './components/common/Footer';
import MainPage from './pages/MainPage';
import { CreateGroupPost } from './pages/CreateGroupPost';
import { FindFoodmate } from './pages/FindFoodmate';
import { History } from './pages/History';
import { Inquiry } from './pages/Inquiry';
import Login from './pages/Login';
import { MeetingPostDetailView } from './pages/MeetingPostDetailView';
import { Neighborhood } from './pages/Neighborhood';
import { Register } from './pages/Register';
import Chat from './pages/Chat';

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
        <Route path="/register" element={<Register />} />
        <Route path="meeting-info/history" element={<History />} />
        <Route path="meeting-info/inquiry" element={<Inquiry />} />
      </Routes>
      <Chat />
      <Footer />
    </>
  );
};
