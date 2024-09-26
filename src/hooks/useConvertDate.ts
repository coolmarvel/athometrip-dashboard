import { parse, isValid, format } from 'date-fns';
import { useCallback } from 'react';

const useConvertDate = () => {
  return useCallback((value?: string) => {
    if (!value) return '';

    // 다양한 날짜 형식을 처리할 수 있는 파싱 로직
    const dateFormats = ['yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', 'MM/dd/yy', 'MM/dd/yyyy', 'yyyy/MM/dd'];
    let date: Date | null = null; // null로 초기화

    // 여러 날짜 형식을 시도하며 파싱
    for (const dateFormat of dateFormats) {
      date = parse(value, dateFormat, new Date());
      if (isValid(date)) break;
    }

    // 유효한 날짜를 찾은 경우, 포맷을 적용하여 반환
    if (date && isValid(date)) {
      // date가 null이 아닌지도 확인
      return format(date, 'yyyy/MM/dd HH:mm:ss');
    } else {
      return 'Invalid Date'; // 유효하지 않은 경우 처리
    }
  }, []);
};

export default useConvertDate;
