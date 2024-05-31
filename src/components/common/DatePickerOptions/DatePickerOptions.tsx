import { useReset911Memorial } from '@/apis';
import { useSafePush } from '@/hooks';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

const DatePickerOptions = () => {
  const { router, push } = useSafePush();

  const after = new Date(router.query?.after !== undefined ? (router.query?.after as string) : subMonths(new Date(), 1));
  const before = new Date(router.query?.before !== undefined ? (router.query?.before as string) : new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([after, before]);
  const { mutate: resetMemorial911 } = useReset911Memorial();

  const handleDateChange = (dates: Date[]) => {
    setSelectedDates(dates);

    if (dates.length === 2) {
      resetMemorial911();
      const formattedDates = dates.map((date) => format(date, 'yyyy-MM-dd', { locale: ko }));
      push({ query: { ...router.query, after: formattedDates[0], before: formattedDates[1] } });
    }
  };

  return <RangeDatepicker selectedDates={selectedDates} onDateChange={handleDateChange} />;
};

export default DatePickerOptions;
