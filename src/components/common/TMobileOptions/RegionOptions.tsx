import { RegionQueries } from '@/constants';
import { useSafePush } from '@/hooks';
import { Select } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

const options = [
  {
    label: capitalize(RegionQueries.USA),
    query: { region: RegionQueries.USA, page: 1, limit: 10, sort: 'id', order: 'desc' },
  },
  {
    label: capitalize(RegionQueries.Other),
    query: { region: RegionQueries.Other, limit: 10, sort: 'id', order: 'desc' },
  },
];

const RegionOptions = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  return (
    <Select
      w={'fit-content'}
      value={router.query?.region}
      onChange={(e) => {
        const option = options.find((option) => option.query.region === e.target.value);
        if (!option) return;
        push({ query: { ...router.query, ...option.query } });
      }}
    >
      {options.map((option) => (
        <option key={option.label} value={option.query.region}>
          {t(option.label.toUpperCase())}
        </option>
      ))}
    </Select>
  );
};

export default RegionOptions;
