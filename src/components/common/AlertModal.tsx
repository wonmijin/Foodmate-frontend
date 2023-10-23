import styled from 'styled-components';
import { BasicButton } from './BasicButton';
import { AiFillAlert } from 'react-icons/ai';

interface AlertModalType {
  handleAlertModal: (isOpen: boolean) => void;
  handleYesClick: () => void;
  children: React.ReactNode;
}

export const AlertModal = (props: AlertModalType) => {
  const { handleAlertModal, handleYesClick, children } = props;
  const yesClicked = () => {
    handleYesClick();
    handleAlertModal(false);
  };

  return (
    <>
      <Overlay onClick={() => handleAlertModal(false)} />
      <AlertModalContainer>
        <p className="question">
          <span className="icon">
            <AiFillAlert />
          </span>
          <span>{children}</span>
        </p>
        <Buttons>
          <div>
            <BasicButton $fontSize="12px" onClick={yesClicked}>
              네
            </BasicButton>
          </div>
          <div onClick={() => handleAlertModal(false)}>
            <BasicButton $fontSize="12px" $backgdColor="#c0c0c0" $hoverBackgdColor="#b0b0b0">
              아니오
            </BasicButton>
          </div>
        </Buttons>
      </AlertModalContainer>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.5);
  z-index: 999;
`;

const AlertModalContainer = styled.div`
  width: 450px;
  height: 150px;
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

  .icon {
    color: ${(props) => props.theme.color.ORANGE};
    font-size: 24px;
  }

  .question {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    color: ${(props) => props.theme.color.BLACK};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  button {
    margin-left: 12px;
  }
`;
