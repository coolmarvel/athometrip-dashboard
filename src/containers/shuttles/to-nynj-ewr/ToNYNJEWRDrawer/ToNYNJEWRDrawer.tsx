import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToNYNJEWRDrawerProps {
  toNYNJEWR: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToNYNJEWRDrawer = ({ toNYNJEWR, setMutate, onClose }: ToNYNJEWRDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNJEWR.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNJEWR.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toNYNJEWR.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNJEWR.payment?.payment_method_title ?? 'Payment method'} (${toNYNJEWR.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toNYNJEWR.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toNYNJEWR.line_items[0]?.quantity ?? 'Personnel' },
      {
        label: t('Pickup Date'),
        value: (() => convertDate(toNYNJEWR.order.meta_data.ewr_arrive_date ?? handleStringKeyValue(toNYNJEWR.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0])(),
      },
      { label: t('Boarding Area'), value: toNYNJEWR.order.meta_data.ewr_pickup ?? handleStringKeyValue(toNYNJEWR.line_items[0].meta_data)['하차 장소'] ?? '' },
      { label: t('Flight Number'), value: toNYNJEWR.order.meta_data.ewr_flght_num2 ?? handleStringKeyValue(toNYNJEWR.line_items[0].meta_data)['EWR 탑승 항공편명'] ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toNYNJEWR.order.id,
        onEdit: () => handleMemoEdit(),
        value: toNYNJEWR.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toNYNJEWR, convertDate, t],
  );

  const columns = useMemo(() =>
    [{
      name: toNYNJEWR.line_items[0]?.name ?? '',
      quantity: toNYNJEWR.line_items[0]?.quantity ?? '',
      total: toNYNJEWR.line_items[0]?.total ?? '',
    }], [toNYNJEWR]);

  return <DataDrawer columns={columns} attributes={attributes} data={toNYNJEWR} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToNYNJEWRDrawer;
