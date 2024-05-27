import { useSafePush } from '@/hooks';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

const DatePickerOptions = () => {
  const { router, push } = useSafePush();
  // const [selectedDates, setSelectedDates] = useState<Date[]>([subMonths(new Date(), 1), new Date()]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(router.query.startDate as string), new Date(router.query.endDate as string)]);

  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);

    if (dates.length === 2) {
      const formattedDates = dates.map((date) => format(date, 'yyyy-MM-dd', { locale: ko }));
      push({ query: { ...router.query, startDate: formattedDates[0], endDate: formattedDates[1] } });
    }
  };

  return <RangeDatepicker selectedDates={selectedDates} onDateChange={handleDateChange} />;
};

export default DatePickerOptions;
