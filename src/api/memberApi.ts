import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

// 로그인
export const onSignIn = async (email: string, password: string) => {
  try {
    const result = await axios.post(`/api/member/signin`, {
      email,
      password,
    });
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      alert(axiosError.response.data);
    } else {
      console.error('서버 응답 없음');
    }
  }
};

// 카카오로 로그인
export const kakaoSignIn = async () => {
  try {
    const result = await axios.get('/api/oauth2/authorization/kakao');
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
