import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';
import kakao from '../assets/kakao_login_large.png';
import { kakaoSignIn, onSignIn, signedMemberInfo } from '../api/memberApi';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BasicPadding } from '../components/common/BasicPadding';
import { PasswordModal } from '../components/login/passwordModal';
import { fetchCall } from '../api/fetchCall';
import { refreshTokens } from '../utils/getRefreshTokenCookie';

const LoginWrap = styled.div`
  margin: 120px auto;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;
`;
const InputWrap = styled.div`
  margin-bottom: 15px;

  input {
    width: 340px;
    height: 54px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding-left: 15px;
  }

  p {
    margin-top: 4px;
    color: red;
    font-size: 12px;
    margin-left: 4px;
  }
`;

const LoginButton = styled.button`
  width: 340px;
  height: 54px;
  padding: 8px 12px;
  background-color: #ffce00;
  border: 1px solid #ffce00;
  color: #212121;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 15px;
`;

const RegisterButton = styled.button`
  width: 340px;
  height: 54px;
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #ffce00;
  color: #212121;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 30px;
`;

const SimpleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  hr {
    width: 95px;
    border: 1px solid #ccc;
  }

  span {
    width: 150px;
    text-align: center;
    font-size: 13px;
    color: #212121;
  }
`;

const KakaoLogin = styled.button`
  background-image: url(${kakao});
  width: 340px;
  height: 45px;
  margin-top: 15px;
  border: 0;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

const PasswordFind = styled.span`
  font-size: 13px;
  color: #212121;
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  margin-right: 11px;
  margin-top: 15px;
  cursor: pointer;
`;

export type FormValues = {
  email: string;
  password: string;
};

interface ErrorResponse {
  error: string;
  message: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const tokens = await onSignIn(data.email, data.password);
    successSignIn(tokens.refreshToken, tokens.accessToken);
  };

  const successSignIn = async (refreshToken: string, accessToken: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 14);
      (document.cookie = `refreshToken=${refreshToken}; expires=${expirationDate.toUTCString()}; path=/;`), [];

      sessionStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`;

      const userInfo = await fetchCall('get', '/member');
      sessionStorage.setItem('nickname', userInfo.nickname);

      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        if (axiosError.response.status === 401 && axiosError.response.data.error === 'TOKEN_INVALID') {
          const newTokens = await refreshTokens();
          if (newTokens) {
            successSignIn(newTokens.refreshToken, newTokens.accessToken);
          } else {
            console.log('재발급 실패');
          }
        } else {
          alert(axiosError.response.data);
        }
      } else {
        console.log('서버 응답 없음');
      }
    }
  };

  //TODO : CORS 에러 해결 후 테스트 요망
  const handleKakaoSignIn = async () => {
    const tokens = await kakaoSignIn();
    successSignIn(tokens.refreshToken, tokens.accessToken);
  };

  const [isOpenedPasswordModal, setIsOpenedPasswordModal] = useState(false);
  const onModalOpen = () => {
    setIsOpenedPasswordModal(!isOpenedPasswordModal);
  };

  return (
    <>
      <BasicPadding>
        <LoginWrap>
          <LoginTitle>로그인</LoginTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrap>
              <input placeholder="이메일을 입력하세요" {...register('email', { required: '이메일을 입력해주세요' })} />
              {errors.email && <p>{errors.email.message}</p>}
            </InputWrap>

            <InputWrap>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '최소 6자 이상의 비밀번호를 입력해주세요',
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </InputWrap>
            <LoginButton>로그인</LoginButton>
            <Link to={'/register'}>
              <RegisterButton>회원가입</RegisterButton>
            </Link>
            <SimpleWrap>
              <hr></hr>
              <span>간편로그인</span>
              <hr></hr>
            </SimpleWrap>
            <KakaoLogin onClick={handleKakaoSignIn}></KakaoLogin>
            <PasswordFind onClick={onModalOpen}>비밀번호 찾기</PasswordFind>
          </form>
        </LoginWrap>

        {isOpenedPasswordModal && <PasswordModal handlePasswordModal={setIsOpenedPasswordModal} />}
      </BasicPadding>
    </>
  );
};

export default Login;
