import styled from 'styled-components';
import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Food } from '../components/register/Food';

interface RegisterForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}

export const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterForm>({ mode: 'onBlur' });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmitHandler: SubmitHandler<RegisterForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <RegisterWrap>
        <RegisterTitle>회원가입</RegisterTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <hr></hr>
          <RegisterBox>
            <RegisterInBox>
              <p>이메일</p>
              <InputBoxWrap>
                <div>
                  <input
                    {...register('email', {
                      required: '필수 값입니다.',
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: '이메일을 올바르게 입력해주세요.',
                      },
                    })}
                    placeholder="이메일을 입력해주세요."
                  />
                  <p>{errors?.email?.message}</p>
                </div>
                <ConfirmButton type="button">중복확인</ConfirmButton>
              </InputBoxWrap>
            </RegisterInBox>

            <RegisterInBox>
              <p>비밀번호</p>
              <InputBoxWrap2>
                <input
                  type="password"
                  {...register('password', {
                    required: '필수 값입니다.',
                    minLength: {
                      value: 8,
                      message: '비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.',
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: '비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.',
                    },
                  })}
                  placeholder="비밀번호를 입력해주세요."
                />
                <p>{errors?.password?.message}</p>
              </InputBoxWrap2>
            </RegisterInBox>

            <RegisterInBox>
              <p>비밀번호 확인</p>
              <InputBoxWrap2>
                <input
                  type="password"
                  {...register('passwordConfirm', {
                    required: '필수 값입니다.',
                    minLength: {
                      value: 8,
                      message: '비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.',
                    },
                    validate: (value) => value === passwordRef.current,
                  })}
                  placeholder="비밀번호를 한번 더 입력해주세요"
                />
                <p>{errors?.passwordConfirm?.message}</p>
              </InputBoxWrap2>
            </RegisterInBox>

            <RegisterInBox>
              <p>닉네임</p>
              <InputBoxWrap>
                <div>
                  <input
                    {...register('nickname', {
                      required: '필수 값입니다.',
                      minLength: {
                        value: 3,
                        message: '3글자 이상 입력해주세요.',
                      },
                      pattern: {
                        value: /^[A-za-z0-9가-힣]{3,10}$/,
                        message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자',
                      },
                    })}
                    placeholder="닉네임을 입력해주세요."
                  />
                  <p>{errors?.nickname?.message}</p>
                </div>
                <ConfirmButton type="button">중복확인</ConfirmButton>
              </InputBoxWrap>
            </RegisterInBox>

            <RegisterInBox>
              <p>
                선호 음식
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

          <RegisterButton>회원가입</RegisterButton>
          {errors?.extraError?.message && <p>{errors?.extraError?.message}</p>}
        </form>
      </RegisterWrap>
    </>
  );
};

const RegisterWrap = styled.div`
  margin: 100px auto 0;
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
  align-items: flex-start;
  padding: 10px 0;

  p {
    width: 140px;
    min-width: 140px;
    max-width: 140px;
    font-size: 14px;
    color: #212121;
    font-weight: 600;
    line-height: 48px;

    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      display: block;
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
  margin: 30px auto 130px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  align-items: flex-start;

  p {
    color: red;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
    white-space: nowrap;
    margin-left: 10px;
    margin-top: 4px;
  }
`;
const InputBoxWrap2 = styled.div`
  p {
    color: red;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
    white-space: nowrap;
    margin-left: 10px;
    margin-top: 4px;
  }
`;
