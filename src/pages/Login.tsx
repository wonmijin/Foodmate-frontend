import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface FormValue {
    email: string;
    password: string;
}

const LoginForm = (props : any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<FormValue>({ mode: "onChange "});
};

return(
    <form onSubmit={handleSubmit{props.onSubmit}}>
        <div>
            <label htmlFor="email">이메일</label>
            <input
                id="email"
                type="text"
                placeholder="test@email.com"
                {...register("email", {
                    required: "이메일은 필수 입력입니다.",
                    pattern: {
                    value:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                    },
                })}
            />
        </div>
        {errors.email && <small role="alert">{errors.email.message}</small>}
    </form>
)

export default LoginForm