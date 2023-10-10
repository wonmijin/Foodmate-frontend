import { styled } from 'styled-components';
import { BsSearchHeart } from 'react-icons/bs';

interface BasicInputPropsType {
  placeholder?: string;
  $backgdColor: string;
}

export const BasicInput = ({ placeholder, $backgdColor }: BasicInputPropsType) => {
  return (
    <InputContainer $backgdColor={$backgdColor}>
      <input type="text" placeholder={placeholder} />
      <div className="icon">
        <BsSearchHeart />
      </div>
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

  .icon {
    font-size: 24px;
    position: absolute;
    right: 8px;
    top: 4px;
    color: #000;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: ${(props) => props.theme.color.ORANGE};
    }
  }
`;
