import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { handleStringKeyValue } from '@/types';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { extractText } from '@/utils';

interface UNTourDrawerProps {
  unTour: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const UNTourDrawer = ({ unTour, setMutate, onClose }: UNTourDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => unTour.line_items.find((item: any) => item.order_item_name.includes('UN')), [unTour]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: unTour.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: unTour.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: unTour.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${unTour.meta_data._payment_method_title ?? 'Payment method'} (${unTour.meta_data._transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(targetLineItem.meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(targetLineItem.meta_data)['시간'] ?? '';

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
  }, [isEdit, handleMemoEdit, unTour, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: unTour.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={unTour} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default UNTourDrawer;
