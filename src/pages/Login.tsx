import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from "styled-components";
import kakao from "../assets/kakao_login.png"

const LoginWrap = styled.div`
    margin: 150px auto 0;
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

    input{
        width: 340px;
        height: 54px;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding-left: 15px;
    }

    p{
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
    background-color: #FFCE00;
    border: 1px solid #FFCE00;
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
    border: 1px solid #FFCE00;
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

    hr{
        width: 95px;
        border: 1px solid #ccc;
    }

    span{
        width: 150px;
        text-align: center;
        font-size: 13px;
        color: #212121;
    }
`;

const Kakao = styled.button`
    background-image: url(${kakao});
    width: 340px;
    height: 45px;
    margin-top: 15px;
    border: 0;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    cursor:pointer;
`;

const PasswordFind = styled.a`
    font-size: 13px;
    color: #212121;
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    margin-right: 11px;
    margin-top: 15px;
`;

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <LoginWrap>
        <LoginTitle>로그인</LoginTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrap>
                <input
                placeholder="이메일을 입력하세요"
                {...register('email', { required: '이메일을 입력해주세요' })}
                />
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
            <RegisterButton>회원가입</RegisterButton>
            <SimpleWrap>
                <hr></hr>
                <span>간편로그인</span>
                <hr></hr>
            </SimpleWrap>
            <Kakao></Kakao>
            <PasswordFind href='#'>비밀번호 찾기</PasswordFind>
        </form>
    </LoginWrap>
  );
}

export default Login;
