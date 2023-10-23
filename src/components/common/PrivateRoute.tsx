import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isSignedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any> | React.ComponentClass<any>; // 클래스 컴포넌트도 허용
}

export const PrivateRoute = ({ isSignedIn, component: Component }: PrivateRouteProps) => {
  if (isSignedIn) {
    return <Component />;
  } else {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" />;
  }
};
