import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { extractText } from '@/utils';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue } from '@/types';

interface OneWorldDrawerProps {
  oneWorld: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const OneWorldDrawer = ({ oneWorld, setMutate, onClose }: OneWorldDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => oneWorld.line_items.find((item: any) => item.order_item_name.includes('원 월드')), [oneWorld]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: oneWorld.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: oneWorld.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: oneWorld.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${oneWorld.meta_data._payment_method_title ?? 'Payment method'} (${oneWorld.meta_data._transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(targetLineItem.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(targetLineItem.meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(targetLineItem.meta_data)['입장 희망시간'] ?? '';

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
  }, [isEdit, handleMemoEdit, oneWorld, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: oneWorld.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={oneWorld} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default OneWorldDrawer;
