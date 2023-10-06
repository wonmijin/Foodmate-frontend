import { Route, Routes } from 'react-router-dom';
import Nav from './components/common/Nav';
import { FindFoodmate } from './pages/FindFoodmate';
import { MeetingPostDetailView } from './pages/MeetingPostDetailView';
import { CreateGroupPost } from './pages/CreateGroupPost';
import { Neighborhood } from './pages/Neighborhood';
import { Register } from './pages/Register';

export const App = (): JSX.Element => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/findfoodmate" element={<FindFoodmate />} />
        <Route path="/findfoodmate/:groupId" element={<MeetingPostDetailView />} />
        <Route path="/findfoodmate/newpost" element={<CreateGroupPost />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
