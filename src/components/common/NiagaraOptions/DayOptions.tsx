import { DayQueries } from '@/constants';
import { useSafePush } from '@/hooks';
import { Select } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

const options = [
  {
    label: capitalize(DayQueries.OneDay),
    query: { day: DayQueries.OneDay, page: 1, limit: 10, sort: 'id', order: 'desc' },
  },
  {
    label: capitalize(DayQueries.TwoDay),
    query: { day: DayQueries.TwoDay, limit: 10, sort: 'id', order: 'desc' },
  },
];

const DayOptions = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  return (
    <Select
      w={'fit-content'}
      value={router.query?.day}
      onChange={(e) => {
        const option = options.find((option) => option.query.day === e.target.value);
        if (!option) return;
        push({ query: { ...router.query, ...option.query } });
      }}
    >
      {options.map((option) => (
        <option key={option.label} value={option.query.day}>
          {t(option.label)}
        </option>
      ))}
    </Select>
  );
};

export default DayOptions;
