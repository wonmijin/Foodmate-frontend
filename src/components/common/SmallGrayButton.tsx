import React from "react";
import styled from "styled-components";

export const SmallGrayButton = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <Button>{children}</Button>;
};
const Button = styled.button`
    background-color: #d8d8d8;
    border: none;
    padding: 4px 8px;
    border-radius: 8px;
    margin: 12px 0 0 4px;
    cursor: pointer;
    font-size: 10px;
    transition: all 0.4s;

    &:hover {
        background-color: #cecece;
    }
`;
