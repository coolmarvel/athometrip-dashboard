import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToNYNightDrawerProps {
  toNYNight: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToNYNightDrawer = ({ toNYNight, setMutate, onClose }: ToNYNightDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNight.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNight.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toNYNight.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNight.payment?.payment_method_title ?? 'Payment method'} (${toNYNight.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toNYNight.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toNYNight.line_items[0]?.quantity ?? 'Personnel' },
      { label: t('Pickup Date'), value: (() => convertDate(toNYNight.order.meta_data?.jfk_shuttle_date2 ?? '').split(' ')[0])() },
      { label: t('Boarding Area'), value: toNYNight.order.meta_data?.jfk_shuttle_stop2 ?? '' },
      { label: t('Flight Number'), value: toNYNight.order.meta_data?.flight_num ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toNYNight.order.id,
        onEdit: () => handleMemoEdit(),
        value: toNYNight.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toNYNight, convertDate, t]
  );

  const columns = useMemo(
    () => [
      {
        name: toNYNight.line_items[0]?.name ?? '',
        quantity: toNYNight.line_items[0]?.quantity ?? '',
        total: toNYNight.line_items[0]?.total ?? '',
      },
    ],
    [toNYNight]
  );

  return <DataDrawer columns={columns} attributes={attributes} data={toNYNight} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToNYNightDrawer;
