import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToJFKNightDrawerProps {
  toJFKNight: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToJFKNightDrawer = ({ toJFKNight, setMutate, onClose }: ToJFKNightDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFKNight.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toJFKNight.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toJFKNight.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFKNight.payment?.payment_method_title ?? 'Payment method'} (${toJFKNight.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toJFKNight.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toJFKNight.line_items[0]?.quantity ?? 'Personnel' },
      {
        label: t('Pickup Date'),
        value: (() => convertDate(toJFKNight.order.meta_data?.pickup_date_night ?? toJFKNight.order.meta_data?.jfk_shuttle_date2 ?? '').split(' ')[0])(),
      },
      { label: t('Boarding Area'), value: toJFKNight.order.meta_data?.night_drop ?? toJFKNight.order.meta_data?.drop_add_2 ?? '' },
      { label: t('Flight Number'), value: toJFKNight.order.meta_data.flight_num2 ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toJFKNight.order.id,
        onEdit: () => handleMemoEdit(),
        value: toJFKNight.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toJFKNight, convertDate, t]
  );

  const columns = useMemo(
    () => [
      {
        name: toJFKNight.line_items[0]?.name ?? '',
        quantity: toJFKNight.line_items[0]?.quantity ?? '',
        total: toJFKNight.line_items[0]?.total ?? '',
      },
    ],
    [toJFKNight]
  );
  return <DataDrawer columns={columns} attributes={attributes} data={toJFKNight} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToJFKNightDrawer;
