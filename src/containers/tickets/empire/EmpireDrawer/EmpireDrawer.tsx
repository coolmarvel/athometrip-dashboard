import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { extractText } from '@/utils';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue } from '@/types';

interface EmpireDrawerProps {
  empire: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const EmpireDrawer = ({ empire, setMutate, onClose }: EmpireDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => empire.line_items.find((item: any) => item.order_item_name.includes('엠파이어')), [empire]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: empire.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: empire.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: empire.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${empire.meta_data._payment_method_title ?? 'Payment method'} (${empire.meta_data._transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(targetLineItem.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(targetLineItem.meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(targetLineItem.meta_data)['입장 희망시간(1순위)'] ?? '';

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
  }, [isEdit, handleMemoEdit, empire, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: empire.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={empire} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default EmpireDrawer;
