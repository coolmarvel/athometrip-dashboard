import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface WashingtonDCDrawerProps {
  washingtonDC: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const WashingtonDCDrawer = ({ washingtonDC, setMutate, onClose }: WashingtonDCDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: washingtonDC.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: washingtonDC.billing?.email ?? 'Email' },
      { label: t('Phone'), value: washingtonDC.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${washingtonDC.payment?.payment_method_title ?? 'Payment method'} (${washingtonDC.payment?.transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(washingtonDC.order.meta_data)['washington_tour_date'] ?? handleStringKeyValue(washingtonDC.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];

          return `${date}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: washingtonDC.order.id,
        onEdit: () => handleMemoEdit(),
        value: washingtonDC.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, washingtonDC, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: washingtonDC.line_items[0]?.name ?? '',
        quantity: washingtonDC.line_items[0]?.quantity ?? '',
        total: washingtonDC.line_items[0]?.total ?? '',
      },
    ],
    [washingtonDC],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={washingtonDC} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default WashingtonDCDrawer;
