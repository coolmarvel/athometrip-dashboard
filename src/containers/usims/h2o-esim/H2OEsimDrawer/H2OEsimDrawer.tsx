import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue } from '@/types';
import { extractText } from '@/utils';

interface H2OEsimDrawerProps {
  h2oEsim: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const H2OEsimDrawer = ({ h2oEsim, setMutate, onClose }: H2OEsimDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => h2oEsim.line_items.find((item: any) => item.order_item_name.includes('h2o') || item.order_item_name.includes('H20')), [h2oEsim]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: h2oEsim.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: h2oEsim.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: h2oEsim.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${h2oEsim.meta_data._payment_method_title ?? 'Payment method'} (${h2oEsim.meta_data._transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Period'),
        value: (() => {
          const period = targetLineItem.order_item_name;
          const match = period.match(/\d+/);

          if (match) return `${match[0]}일`;
          else return '';
        })(),
      },
      { label: t('Model'), value: h2oEsim.meta_data?.esim_device.split(',') ?? '' },
      { label: t('Eid'), value: h2oEsim.meta_data?.esim_eid ?? '' },
      { label: t('Esim_imei'), value: h2oEsim.meta_data?.esim_imei ?? '' },
      {
        label: t('Activate'),
        value: (() => convertDate(h2oEsim.meta_data?.att_h2oEsim_date).split(' ')[0] ?? '')(),
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
  }, [isEdit, handleMemoEdit, h2oEsim, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: h2oEsim.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={h2oEsim} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default H2OEsimDrawer;
