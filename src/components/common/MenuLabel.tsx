import styled from "styled-components";

interface MenuLabelPropsType {
  children: React.ReactNode;
  $menuColor: string;
}

export const MenuLabel = ({ children, $menuColor }: MenuLabelPropsType) => {
  return <Label $menuColor={$menuColor}>{children}</Label>;
};

const Label = styled.span<MenuLabelPropsType>`
  padding: 8px 12px;
  background-color: ${(props) => props.$menuColor}30;
  color: ${(props) => props.$menuColor};
  font-size: 14px;
  font-weight: 600;
  border-radius: 16px;
  border: 2px solid ${(props) => props.$menuColor}50;
  cursor: pointer;
`;
