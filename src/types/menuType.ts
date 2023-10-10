export interface MenuLabelPropsType {
  children: React.ReactNode;
  $menuColor: string;
  $isSelected?: boolean;
  onClick?: () => void;
}

export interface LabelColorType {
  menu: string;
  color: string;
}
