import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToJFKDrawerProps {
  toJFK: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToJFKDrawer = ({ toJFK, setMutate, onClose }: ToJFKDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFK.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toJFK.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toJFK.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFK.payment?.payment_method_title ?? 'Payment method'} (${toJFK.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toJFK.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toJFK.line_items[0]?.quantity ?? 'Personnel' },
      {
        label: t('Pickup Date'),
        value: (() =>
            convertDate(
              toJFK.order.meta_data?.pickup_date_30 ??
              toJFK.order.meta_data?.pickup_date_10 ??
              toJFK.order.meta_data?.pickup_date_fromnj ??
              handleStringKeyValue(toJFK.line_items[0].meta_data)['날짜'],
            ).split(' ')[0] ??
            ''
        )(),
      },
      {
        label: t('Boarding Area'), value: (() =>
            toJFK.order.meta_data?.drop_add_2 ??
            toJFK.order.meta_data?.drop_add ??
            toJFK.order.meta_data?.jfk_shuttle_pickup_nj ??
            handleStringKeyValue(toJFK.line_items[0].meta_data)['승차장소'] ??
            ''
        )(),
      },
      {
        label: t('Flight Number'), value: (() =>
            toJFK.order.meta_data?.flight_num2 ??
            toJFK.order.meta_data?.fligh_num ??
            handleStringKeyValue(toJFK.line_items[0].meta_data)['JFK 탑승 항공편명'] ??
            ''
        )(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toJFK.order.id,
        onEdit: () => handleMemoEdit(),
        value: toJFK.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toJFK, convertDate, t],
  );

  const columns = useMemo(() =>
    [{
      name: toJFK.line_items[0]?.name ?? '',
      quantity: toJFK.line_items[0]?.quantity ?? '',
      total: toJFK.line_items[0]?.total ?? '',
    }], [toJFK]);
  return <DataDrawer columns={columns} attributes={attributes} data={toJFK} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToJFKDrawer;
