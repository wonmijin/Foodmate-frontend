import styled from 'styled-components';
import { BasicButton } from '../common/BasicButton';

interface PasswordModalType {
  handlePasswordModal: (isOpen: boolean) => void;
}

export const PasswordModal = (props: PasswordModalType) => {
  const { handlePasswordModal } = props;

  return (
    <>
      <Wrap onClick={() => handlePasswordModal(false)} />
      <PasswordModalContainer>
        <p>등록된 이메일을 입력하세요.</p>
        <input type="text"></input>
        <PasswordButton>
          <BasicButton $fontSize="12px">확인</BasicButton>
        </PasswordButton>
      </PasswordModalContainer>
    </>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.5);
  z-index: 999;
`;

const PasswordModalContainer = styled.div`
  width: 450px;
  height: 200px;
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;

  background-color: #fff;
  border: 3px solid ${(props) => props.theme.color.GRAY};
  border-radius: 12px;

  p {
    font-size: 16px;
    color: ${(props) => props.theme.color.BLACK};
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding-left: 15px;
    margin: 20px 0;
  }
`;

const PasswordButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
