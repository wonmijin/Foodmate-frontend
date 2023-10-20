import axios from 'axios';

// 로그인
export const onSignIn = async (email: string, password: string) => {
  try {
    const result = await axios.post(`/api/member/signin`, {
      email,
      password,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그인된 유저 프로필
export const signedMemberInfo = async () => {
  try {
    const result = await axios.get('/api/member');
    return result.data;
  } catch (error) {
    console.error(error);
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
