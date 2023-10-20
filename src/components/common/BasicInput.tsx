import { styled } from 'styled-components';

interface BasicInputPropsType {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  $backgdColor: string;
  value?: string;
}

export const BasicInput = ({ placeholder, $backgdColor, onChange, value }: BasicInputPropsType) => {
  return (
    <InputContainer $backgdColor={$backgdColor}>
      <input type="text" placeholder={placeholder} onChange={onChange} value={value} />
    </InputContainer>
  );
};

const InputContainer = styled.div<BasicInputPropsType>`
  position: relative;
  width: fit-content;

  input {
    font-size: 12px;
    padding: 12px;
    width: 300px;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => props.$backgdColor};
  }
`;
