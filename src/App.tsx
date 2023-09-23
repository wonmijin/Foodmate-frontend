import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};