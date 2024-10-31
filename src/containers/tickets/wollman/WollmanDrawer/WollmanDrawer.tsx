import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { extractText } from '@/utils';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, } from '@/types';

interface WollmanDrawerProps {
  wollman: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const WollmanDrawer = ({ wollman, setMutate, onClose }: WollmanDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => wollman.line_items.find((item: any) => item.order_item_name.includes('울먼')), [wollman]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: wollman.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: wollman.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: wollman.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${wollman.meta_data._payment_method_title ?? 'Payment method'} (${wollman.meta_data._transaction_id ?? 'Transaction ID'})` },
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
  }, [isEdit, handleMemoEdit, wollman, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: wollman.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={wollman} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default WollmanDrawer;
