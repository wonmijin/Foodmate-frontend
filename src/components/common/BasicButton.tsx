import styled from "styled-components";

interface BasicButtonPropsType {
    children: React.ReactNode;
    $fontSize: string;
    $fontColor?: string;
    $backgdColor?: string;
    $borderColor?: string;
    $hoverFontColor?: string;
    $hoverBackgdColor?: string;
    onClick?: () => void;
}

export const BasicButton = ({
    children,
    $fontColor = "#212121",
    $backgdColor = "#FFCE00",
    $borderColor = $backgdColor,
    $hoverFontColor,
    $hoverBackgdColor = "#ffbf00",
    $fontSize,
}: BasicButtonPropsType) => {
    return (
        <Button
            $fontColor={$fontColor}
            $backgdColor={$backgdColor}
            $borderColor={$borderColor}
            $hoverFontColor={$hoverFontColor}
            $hoverBackgdColor={$hoverBackgdColor}
            $fontSize={$fontSize}
        >
            {children}
        </Button>
    );
};

const Button = styled.button<BasicButtonPropsType>`
    padding: 8px 12px;
    background-color: ${(props) => props.$backgdColor};
    border: 1px solid ${(props) => props.$borderColor};
    color: ${(props) => props.$fontColor};
    border-radius: 8px;
    font-size: ${(props) => props.$fontSize};
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        color: ${(props) => props.$hoverFontColor};
        background-color: ${(props) => props.$hoverBackgdColor};
    }
`;
