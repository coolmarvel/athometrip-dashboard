import { format } from 'date-fns';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useConvertDate = () => {
  const { t } = useTranslation();

  return useCallback(
    (value?: any) => {
      if (!value) return '';

      const date = new Date(value);

      return format(date, 'yyyy/MM/dd HH:mm:ss');
    },
    [t]
  );
};

export default useConvertDate;
