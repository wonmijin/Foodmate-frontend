import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from "styled-components";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="이메일"
          {...register('email', { required: '이메일을 입력해주세요' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 6,
              message: '최소 6자 이상의 비밀번호를 입력해주세요',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
