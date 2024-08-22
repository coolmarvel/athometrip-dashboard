import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useCallback, useState } from 'react';
import { format, subWeeks } from 'date-fns';
import { ko } from 'date-fns/locale';

import { useSafePush } from '@/hooks';

interface DatePickerOptionsProps {
  setMutate: () => void;
}

const DatePickerOptions = ({ setMutate }: DatePickerOptionsProps) => {
  const { router, push } = useSafePush();

  const after = router.query?.after as string ?? subWeeks(new Date(), 1).toISOString().split('T')[0];
  const before = router.query?.before as string ?? new Date().toISOString().split('T')[0];
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date(after), new Date(before)]);

  const handleDateChange = useCallback((dates: Date[]) => {
    setSelectedDates(dates);

    if (dates.length === 2) {
      setMutate();

      const formattedDates = dates.map((date) => format(date, 'yyyy-MM-dd', { locale: ko }));
      push({ query: { ...router.query, page: 1, after: formattedDates[0], before: formattedDates[1] } });
    }
  }, [push, router.query, setMutate]);

  return <RangeDatepicker selectedDates={selectedDates} onDateChange={handleDateChange} />;
};

export default DatePickerOptions;
