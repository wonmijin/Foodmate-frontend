import Nav from './components/main-page/Nav';
import { BrowserRouter } from 'react-router-dom';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
};
