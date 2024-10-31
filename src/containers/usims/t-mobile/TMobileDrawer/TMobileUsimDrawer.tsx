import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { extractText } from '@/utils';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue } from '@/types';

interface TMobileUsimDrawerProps {
  tMobile: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const TMobileUsimDrawer = ({ tMobile, setMutate, onClose }: TMobileUsimDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => tMobile.line_items.find((item: any) => item.order_item_name.includes('티모') || item.order_item_name.includes('티 모')), [tMobile]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: tMobile.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: tMobile.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: tMobile.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${tMobile.meta_data._payment_method_title ?? 'Payment method'} (${tMobile.meta_data._transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Period'),
        value: (() => {
          const period = targetLineItem.order_item_name;
          const match = period.match(/\d+/);

          if (match) return `${match[0]}일`;
          else return 'period';
        })(),
      },
      { label: t('Model'), value: tMobile.meta_data?.esim_device ?? 'Model' },
      { label: t('Activate'), value: (() => convertDate(tMobile.meta_data?.att_tmobile_date).split(' ')[0] ?? 'Activate')() },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: targetLineItem.order_item_id,
        value: targetLineItem.memo ?? '',
        onEdit: () => handleMemoEdit(),
      },
    ];
  }, [isEdit, handleMemoEdit, tMobile, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: tMobile.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={tMobile} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default TMobileUsimDrawer;
