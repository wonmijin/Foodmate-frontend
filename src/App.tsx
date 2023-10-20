import { Route, Routes } from 'react-router-dom';
import { Drawer } from './components/common/Drawer';
import Footer from './components/common/Footer';
import Nav from './components/common/Nav';
import Chat from './pages/Chat';
import { CreateGroupPost } from './pages/CreateGroupPost';
import { FindFoodmate } from './pages/FindFoodmate';
import { History } from './pages/History';
import { Inquiry } from './pages/Inquiry';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { MeetingPostDetailView } from './pages/MeetingPostDetailView';
import { Neighborhood } from './pages/Neighborhood';
import { Password } from './pages/Password';
import { Profile } from './pages/Profile';
import { Quit } from './pages/Quit';
import { Register } from './pages/Register';
import ScrollToTop from './utils/ScrollToTop';
import { ModifyPost } from './pages/ModifyPost';

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
        <Route path="/findfoodmate/modify" element={<ModifyPost />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
        <Route path="/register" element={<Register />} />
        <Route path="meeting-info/history" element={<History />} />
        <Route path="meeting-info/inquiry" element={<Inquiry />} />
        <Route path="mypage/modify-profile" element={<Profile />} />
        <Route path="mypage/modify-password" element={<Password />} />
        <Route path="mypage/modify-quit" element={<Quit />} />
      </Routes>
      <Chat />
      <Footer />
      <Drawer />
    </>
  );
};
