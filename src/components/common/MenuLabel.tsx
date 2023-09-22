import styled from "styled-components";

interface MenuLabelPropsType {
    children: React.ReactNode;
    $menuColor: string;
    $isSelected?: boolean;
    onClick?: () => void;
}

export const MenuLabel = ({
    children,
    $menuColor,
    $isSelected,
    onClick,
}: MenuLabelPropsType) => {
    return (
        <Label
            $menuColor={$menuColor}
            onClick={onClick}
            $isSelected={$isSelected}
        >
            {children}
        </Label>
    );
};

const Label = styled.span<MenuLabelPropsType>`
    padding: 6px 12px;
    background-color: ${(props) =>
        props.$isSelected ? `${props.$menuColor}30` : ""};
    color: ${(props) => props.$menuColor};
    font-size: 13px;
    font-weight: 600;
    border-radius: 16px;
    border: 2px solid ${(props) => props.$menuColor}50;
    cursor: pointer;
`;
