import { BasicPadding } from '../components/common/BasicPadding';
import { SideMenu } from '../components/common/SideMenu';
import { MYPAGE_CATEGORY } from '../constants/mypage';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef } from 'react';
import { LoginButton } from '../components/common/LoginButton';

interface PasswordForm {
  nowpassword: string;
  newpassword: string;
  passwordConfirm: string;
  extraError?: string;
}

export const Password = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<PasswordForm>({ mode: 'onBlur' });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('newpassword');

  const onSubmitHandler: SubmitHandler<PasswordForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <BasicPadding>
        <PasswordWrap>
          <SideMenu sideMenuList={MYPAGE_CATEGORY} navMenuIdx={3} />
          <PasswordBox>
            <h3>비밀번호 변경</h3>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <hr></hr>
              <PasswordPaddig>
                <PasswordInBox>
                  <p>현재 비밀번호</p>
                  <div>
                    <input
                      type="password"
                      {...register('nowpassword', {
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
                      placeholder="현재 비밀번호를 입력해주세요."
                    />
                    <p>{errors?.newpassword?.message}</p>
                  </div>
                </PasswordInBox>

                <PasswordInBox>
                  <p>새 비밀번호</p>
                  <div>
                    <input
                      type="password"
                      {...register('newpassword', {
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
                      placeholder="새로운 비밀번호를 입력해주세요."
                    />
                    <p>{errors?.newpassword?.message}</p>
                  </div>
                </PasswordInBox>

                <PasswordInBox>
                  <p>새 비밀번호 확인</p>
                  <div>
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
                  </div>
                </PasswordInBox>
              </PasswordPaddig>
              <hr></hr>
              <LoginButton $fontSize="16px">비밀번호 변경</LoginButton>
            </form>
          </PasswordBox>
        </PasswordWrap>
      </BasicPadding>
    </>
  );
};

const PasswordWrap = styled.div`
  display: flex;
  margin: 120px 0 259px 0;
`;

const PasswordBox = styled.div`
  width: 640px;
  margin: 0 auto;

  h3 {
    font-size: 24px;
    color: #212121;
    text-align: center;
    margin-bottom: 50px;
  }

  hr {
    width: 640px;
    border: 1px solid #f1f1f1;
  }
`;

const PasswordInBox = styled.div`
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
  }

  input {
    width: 300px;
    max-width: 300px;
    height: 48px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding-left: 15px;
  }

  div {
    p {
      color: red;
      font-size: 12px;
      font-weight: 400;
      line-height: 1.2;
      white-space: nowrap;
      margin-left: 10px;
      margin-top: 4px;
    }
  }
`;

const PasswordPaddig = styled.div`
  margin: 10px 0;
  padding: 0 20px;
`;
