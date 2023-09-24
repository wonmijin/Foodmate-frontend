import { BrowserRouter } from 'react-router-dom';
import Nav from './components/common/Nav';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
};
