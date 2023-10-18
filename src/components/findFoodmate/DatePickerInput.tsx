import { LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';

interface DatePickerInputPropsType {
  value?: string;
  onClick?: () => void;
}

export const DatePickerInput = forwardRef(
  ({ value, onClick }: DatePickerInputPropsType, ref: LegacyRef<HTMLButtonElement> | undefined) => (
    <PickerButton className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </PickerButton>
  ),
);

const PickerButton = styled.button`
  border: 1px solid ${(props) => props.theme.color.GRAY};
  padding: 8px 12px;
  border-radius: 8px;
`;
