import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ToNYNJDrawerProps {
  toNYNJ: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ToNYNJDrawer = ({ toNYNJ, setMutate, onClose }: ToNYNJDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNJ.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNJ.billing?.email ?? 'Email' },
      { label: t('Phone'), value: toNYNJ.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNJ.payment?.payment_method_title ?? 'Payment method'} (${toNYNJ.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(toNYNJ.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      { label: t('Personnel'), value: toNYNJ.line_items[0]?.quantity ?? 'Personnel' },
      {
        label: t('Pickup Date'),
        value: (() => convertDate(toNYNJ.order.meta_data.pickup_date_10 ?? toNYNJ.order.meta_data.pickup_date_to_nj ?? handleStringKeyValue(toNYNJ.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '')(),
      },
      { label: t('Boarding Area'), value: toNYNJ.order.meta_data.drop_add ?? toNYNJ.order.meta_data.jfk_stop_nj ?? handleStringKeyValue(toNYNJ.line_items[0].meta_data)['하차 장소'] ?? '' },
      { label: t('Flight Number'), value: toNYNJ.order.meta_data.flight_num ?? toNYNJ.order.meta_data.flight_num2 ?? handleStringKeyValue(toNYNJ.line_items[0].meta_data)['JFK 탑승 항공편명'] ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: toNYNJ.order.id,
        onEdit: () => handleMemoEdit(),
        value: toNYNJ.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, toNYNJ, convertDate, t],
  );

  const columns = useMemo(() =>
    [{
      name: toNYNJ.line_items[0]?.name ?? '',
      quantity: toNYNJ.line_items[0]?.quantity ?? '',
      total: toNYNJ.line_items[0]?.total ?? '',
    }], [toNYNJ]);

  return <DataDrawer columns={columns} attributes={attributes} data={toNYNJ} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ToNYNJDrawer;
