import { ModeQueries } from '@/constants';
import { useSafePush } from '@/hooks';
import { Select } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

const options = [
  {
    label: capitalize(ModeQueries.Usim),
    query: { mode: ModeQueries.Usim, page: 1, limit: 10, sort: 'id', order: 'desc' },
  },
  {
    label: capitalize(ModeQueries.Esim),
    query: { mode: ModeQueries.Esim, limit: 10, sort: 'id', order: 'desc' },
  },
];

const ModeOptions = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  return (
    <Select
      w={'fit-content'}
      value={router.query?.mode}
      onChange={(e) => {
        const option = options.find((option) => option.query.mode === e.target.value);
        if (!option) return;
        push({ query: { ...router.query, ...option.query } });
      }}
    >
      {options.map((option) => (
        <option key={option.label} value={option.query.mode}>
          {t(option.label)}
        </option>
      ))}
    </Select>
  );
};

export default ModeOptions;
