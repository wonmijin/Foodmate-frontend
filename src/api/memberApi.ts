import { registerType, emailType, nicknameType } from '../types/registerType';
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

// 회원가입
export const registerMember = async ({ email, nickname, password, image, food }: registerType) => {
  const requestData = {
    email,
    nickname,
    password,
    image,
    food,
  };
  try {
    const response = await axios.post('/api/member/signup', requestData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 이메일 중복확인
export const emailConfirm = async ({ email }: emailType) => {
  try {
    const response = await axios.get('/api/member/email', { params: { email } });
    console.log('response>>>>>>>>>>>>>>' + response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 닉네임 중복확인
export const nicknameConfirm = async ({ nickname }: nicknameType) => {
  try {
    const response = await axios.get('/api/member/nickname', { params: { nickname } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
