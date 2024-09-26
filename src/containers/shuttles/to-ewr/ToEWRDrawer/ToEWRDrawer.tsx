import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToEWRDrawerProps {
  toEWR: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToEWRDrawer = ({ toEWR, setMutate, onClose }: ToEWRDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toEWR.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toEWR.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toEWR.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toEWR.payment?.payment_method_title ?? 'Payment method'} (${toEWR.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toEWR.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toEWR.line_items[0]?.quantity ?? 'Personnel' },
      {
        label: t('Pickup Date'),
        value: (() => convertDate(toEWR.order.meta_data.ewr_arrive_date ?? '').split(' ')[0])(),
      },
      { label: t('Boarding Area'), value: toEWR.order.meta_data.ewr_pickup ?? '' },
      { label: t('Flight Number'), value: toEWR.order.meta_data.ewr_flght_num2 ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toEWR.order.id,
        onEdit: () => handleMemoEdit(),
        value: toEWR.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toEWR, convertDate, t],
  );

  const columns = useMemo(() =>
    [{
      name: toEWR.line_items[0]?.name ?? '',
      quantity: toEWR.line_items[0]?.quantity ?? '',
      total: toEWR.line_items[0]?.total ?? '',
    }], [toEWR]);

  return <DataDrawer columns={columns} attributes={attributes} data={toEWR} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToEWRDrawer;
