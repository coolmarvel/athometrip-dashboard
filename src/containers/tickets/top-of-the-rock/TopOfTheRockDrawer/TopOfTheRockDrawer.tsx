import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { extractText } from '@/utils';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue } from '@/types';

interface TopOfTheRockDrawerProps {
  topOfTheRock: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const TopOfTheRockDrawer = ({ topOfTheRock, setMutate, onClose }: TopOfTheRockDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => topOfTheRock.line_items.find((item: any) => item.order_item_name.includes('탑 오브 더 락')), [topOfTheRock]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: topOfTheRock.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: topOfTheRock.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: topOfTheRock.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${topOfTheRock.meta_data._payment_method_title ?? 'Payment method'} (${topOfTheRock.meta_data._transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(targetLineItem.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(targetLineItem.meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(targetLineItem.meta_data)['입장 희망시간(1순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(targetLineItem.meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(targetLineItem.meta_data)['입장 희망시간(2순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: targetLineItem.order_item_id,
        value: targetLineItem.memo ?? '',
        onEdit: () => handleMemoEdit(),
      },
    ];
  }, [isEdit, handleMemoEdit, topOfTheRock, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: topOfTheRock.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={topOfTheRock} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default TopOfTheRockDrawer;
