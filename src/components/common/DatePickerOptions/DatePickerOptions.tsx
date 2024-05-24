import DatePicker from 'react-datepicker';
import { Dispatch, SetStateAction } from 'react';
import './DatePickerOption.css';

import { ko } from 'date-fns/locale';
import { getMonth, getYear } from 'date-fns';
import _ from 'lodash';

const getDate = (date: any) => {
  return new Date(date).toISOString().split('T')[0];
};

interface IProps {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}

const DatePickerOptions = (props: IProps) => {
  // 연도 선택 select box에 보여질 데이터 : range(시작 연도, 끝 연도, 연도 간격)
  const years = _.range(2022, getYear(new Date()) + 5, 1);

  // 월 선택 select box에 보여질 데이터
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  return (
    <div className="custom-react-datepicker__wrapper">
      <span className="custom-react-datepicker__label-span">일자</span>
      {/* 시작 날짜를 지정하는 데이트 피커 */}
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div className="custom-react-datepicker__select-wrapper">
            {/* 이전 월로 이동하는 버튼 */}
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <img src="/datePicker/decreaseMonth.png" />
            </button>
            <div className="custom-react-datepicker__select-item">
              {/* 연도 선택 select box */}
              <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>년</span>
            </div>
            <div className="custom-react-datepicker__select-item">
              {/* 월 선택 select box */}
              <select value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>월</span>
            </div>
            {/* 다음 월로 이동하는 버튼 */}
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <img src="/datePicker/increaseMonth.png" />
            </button>
          </div>
        )}
        locale={ko} // (월~일 부분) 한국어로 변환
        dateFormat="yyyy.MM.dd" // 선택된 날짜를 input box에 나타내는 형식
        selected={new Date(props.startDate)}
        onChange={(date) => props.setStartDate(getDate(date))} // 선택한 날짜를 state에 저장
        selectsStart
        startDate={new Date(props.startDate)}
        endDate={new Date(props.endDate)}
      />
      <span className="custom-react-datepicker__split-span">~</span>
      {/* 종료 날짜를 지정하는 데이트 피커 */}
      <DatePicker
        renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div className="custom-react-datepicker__select-wrapper">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <img src="/datePicker/decreaseMonth.png" />
            </button>
            <div className="custom-react-datepicker__select-item">
              <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>년</span>
            </div>
            <div className="custom-react-datepicker__select-item">
              <select value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>월</span>
            </div>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <img src="/datePicker/increaseMonth.png" />
            </button>
          </div>
        )}
        locale={ko}
        dateFormat="yyyy.MM.dd"
        selected={new Date(props.endDate)}
        onChange={(date) => props.setEndDate(getDate(date))}
        selectsEnd
        startDate={new Date(props.startDate)}
        endDate={new Date(props.endDate)}
        minDate={new Date(props.startDate)}
      />
    </div>
  );
};

export default DatePickerOptions;
