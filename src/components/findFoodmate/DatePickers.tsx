import styled from 'styled-components';
import { BasicButton } from '../common/BasicButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { DatePickerInput } from './DatePickerInput';
import { AiFillCloseCircle } from 'react-icons/ai';
import { formatDate } from '../../utils/formatDate';

interface DatePickerPropsType {
  handleDatePickerModal?: (isOpen: boolean) => void;
  handleSelectedDates: (dates: string[]) => void;
}

export const DatePickers = ({ handleDatePickerModal, handleSelectedDates }: DatePickerPropsType) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleCompleteClick = () => {
    if (handleDatePickerModal) {
      handleDatePickerModal(false);
    }
    if (handleSelectedDates) {
      handleSelectedDates([formatDate(startDate), formatDate(endDate)]);
    }
  };

  return (
    <DatePickerContaiener>
      <div className="pickers">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(date);
          }}
          minDate={new Date()}
          customInput={<DatePickerInput />}
        />{' '}
        -{' '}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate || new Date()}
          customInput={<DatePickerInput />}
        />
      </div>
      <BasicButton
        $fontSize="12px"
        $backgdColor="#acacac"
        $fontColor="#fff"
        $hoverBackgdColor="#8c8c8c"
        onClick={handleCompleteClick}
      >
        선택 완료
      </BasicButton>
      <div className="close-button" onClick={() => handleDatePickerModal && handleDatePickerModal(false)}>
        <AiFillCloseCircle />
      </div>
    </DatePickerContaiener>
  );
};

const DatePickerContaiener = styled.div`
  font-size: 12px;
  border: 1px solid #c0c0c0;
  border-radius: 12px;
  padding: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;

  .pickers {
    display: flex;
    align-items: center;

    button {
      margin: 0 6px;
    }
  }

  .close-button {
    font-size: 22px;
    color: ${(props) => props.theme.color.ORANGE}90;
    position: absolute;
    top: 3px;
    right: 6px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: ${(props) => props.theme.color.ORANGE};
    }
  }
`;
