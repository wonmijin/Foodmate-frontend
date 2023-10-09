import { useNavigate } from 'react-router';
import axios from 'axios';
import { emailRegExp, passwordRegExp, nickNameRegExp } from '../regex/Regex';

import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { Food } from '../components/register/food';

interface InputState {
  value: string;
  valid: boolean;
  message: string;
}

export const Register = () => {
  const navigator = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<InputState>({ value: '', valid: false, message: '' });
  const [password, setPassword] = useState<InputState>({ value: '', valid: false, message: '' });
  const [passwordConfirm, setPasswordConfirm] = useState<InputState>({ value: '', valid: false, message: '' });
  const [nickName, setNicName] = useState<InputState>({ value: '', valid: false, message: '' });

  const [showPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    validator: (value: string) => { valid: boolean; message: string },
  ) => {
    const { name, value } = e.target;
    const { valid, message } = validator(value);

    const updatedValue = { value, valid, message };

    switch (name) {
      case 'email':
        setEmail(updatedValue);
        break;
      case 'password':
        setPassword(updatedValue);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(updatedValue);
        break;
      case 'nickname':
        setNicName(updatedValue);
        break;
      default:
        break;
    }
  };

  const validateEmail = (value: string) => {
    // 이메일 유효성 검사
    if (!emailRegExp.test(value)) {
      return { valid: false, message: '이메일의 형식이 올바르지 않습니다.' };
    } else {
      return { valid: true, message: '사용 가능한 이메일 입니다.' };
    }
  };

  const validatePassword = (value: string) => {
    if (!passwordRegExp.test(value)) {
      return { valid: false, message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!' };
    } else {
      return { valid: true, message: '안전한 비밀번호 입니다.' };
    }
  };

  const validatePasswordConfirm = (value: string) => {
    if (value !== password.value) {
      return { valid: false, message: '비밀번호가 다릅니다.' };
    } else {
      return { valid: true, message: '똑같은 비밀번호를 입력했습니다.' };
    }
  };

  const validateNicName = (value: string) => {
    if (!nickNameRegExp.test(value)) {
      return { valid: false, message: '닉네임은 2글자 이상 5글자 이하로 입력 부탁드립니다.' };
    } else {
      return { valid: true, message: '사용 가능한 닉네임 입니다.' };
    }
  };

  const isFormValid = () => {
    return email.valid && password.valid && passwordConfirm.valid;
  };

  const sendSignupData = async (formData: any) => {
    try {
      const res = await axios.post('', formData);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log('gqw: ', error.response);
        return error.response.data;
      }
      console.error('API 요청 실패:', error);
      throw error;
    }
  };

  const handleSignup = async () => {
    if (isFormValid()) {
      try {
        const formData = {
          email: email.value,
          password: password.value,
          nickname: nickName.value,
        };

        const res = await sendSignupData(formData);
        console.log('error', res);
        if (res.registerOk) {
          alert(res.registerOk);
          navigator('/main');
        } else if (res) {
          console.log(res);
          setError(res);
        } else {
          setError('회원가입에 실패했습니다.');
        }
      } catch (error: any) {
        console.error('error:', error);
        setError('서버와 연결이 되지 않습니다.');
      }
    }
  };

  const sendEmailCertified = async (emailAddress: any) => {
    try {
      const res = await axios.post('', {
        email: emailAddress,
      });
      return res.data;
    } catch (error: any) {
      console.error('이메일 인증 요청 실패:', error);
      throw error;
    }
  };

  const handleEmailCertified = async () => {
    if (email.valid) {
      try {
        const response = await sendEmailCertified(email.value);
        if (response.postMailOk) {
          alert('이메일에 인증 문자를 전송했습니다.');
        } else {
          console.log(response);
          console.error('error', error);
          alert('이메일 인증 요청에 실패했습니다.');
        }
      } catch (error) {
        alert('인증 요청 실패');
      }
    }
  };

  return (
    <>
      <RegisterWrap>
        <RegisterTitle>회원가입</RegisterTitle>
        <hr></hr>
        <RegisterBox>
          <RegisterInBox>
            <p>이메일</p>
            <InputBoxWrap>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email.value}
                  onChange={(e) => handleChange(e, validateEmail)}
                  placeholder="이메일을 입력하세요."
                />
                {email.valid ? null : <p>{email.message}</p>}
              </div>
              <ConfirmButton type="button" onClick={handleEmailCertified}>
                중복확인
              </ConfirmButton>
            </InputBoxWrap>
          </RegisterInBox>

          <RegisterInBox>
            <p>비밀번호</p>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password.value}
              onChange={(e) => handleChange(e, validatePassword)}
              placeholder="비밀번호를 입력하세요."
            />
            <p>{password.message}</p>
          </RegisterInBox>

          <RegisterInBox>
            <p>비밀번호 확인</p>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm.value}
              onChange={(e) => handleChange(e, validatePasswordConfirm)}
              placeholder="비밀번호를 한번 더 입력해주세요."
            />
            {passwordConfirm.valid ? null : <p>{passwordConfirm.message}</p>}
          </RegisterInBox>

          <RegisterInBox>
            <p>닉네임</p>
            <InputBoxWrap>
              <div>
                <input
                  type="text"
                  name="nickname"
                  value={nickName.value}
                  onChange={(e) => handleChange(e, validateNicName)}
                  placeholder="닉네임을 입력하세요."
                />
                <p>{nickName.message}</p>
              </div>
              <ConfirmButton type="button">중복확인</ConfirmButton>
            </InputBoxWrap>
          </RegisterInBox>

          <RegisterInBox>
            <p>
              선호 음식 <br />
              <span>
                중복체크 가능
                <br />
                (최대 3개)
              </span>
            </p>
            <Food />
          </RegisterInBox>
        </RegisterBox>
        <hr></hr>
        <RegisterButton type="submit" className={isFormValid() ? 'active' : ''} onClick={handleSignup}>
          회원가입
        </RegisterButton>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </RegisterWrap>
    </>
  );
};

const RegisterWrap = styled.div`
  margin: 145px auto 0;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;

  hr {
    width: 640px;
    border: 1px solid #f1f1f1;
  }
`;
const RegisterTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 30px;
`;
const RegisterBox = styled.div`
  width: 640px;
  margin: 10px 0;
  padding: 0 20px;
`;

const RegisterInBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  p {
    width: 140px;
    min-width: 140px;
    max-width: 140px;
    font-size: 14px;
    color: #212121;
    font-weight: 600;

    span {
      font-size: 12px;
      font-weight: 400;
    }
  }

  input {
    width: 300px;
    max-width: 300px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding-left: 15px;
  }
`;

const RegisterButton = styled.button`
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
  margin-top: 30px;
  margin-bottom: 130px;
`;

const ConfirmButton = styled.button`
  width: 120px;
  height: 48px;
  padding: 8px 12px;
  background-color: #ccc;
  border: 1px solid #ccc;
  color: #212121;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 8px;
`;

const InputBoxWrap = styled.div`
  display: flex;
  align-items: center;
`;
