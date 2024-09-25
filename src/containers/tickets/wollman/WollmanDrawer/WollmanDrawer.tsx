import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface WollmanDrawerProps {
  wollman: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const WollmanDrawer = ({ wollman, setMutate, onClose }: WollmanDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: wollman.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: wollman.billing?.email ?? 'Email' },
      { label: t('Phone'), value: wollman.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${wollman.payment?.payment_method_title ?? 'Payment method'} (${wollman.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(wollman.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(wollman.order.meta_data?.['wollman_date'] ?? wollman.order.meta_data?.['wollman_high_date'] ?? '').split(' ')[0];
          const time = wollman.order.meta_data?.['wollman_time'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(wollman.order.meta_data?.['wollman_date'] ?? wollman.order.meta_data?.['wollman_high_date'] ?? '').split(' ')[0];
          const time = wollman.order.meta_data?.['wollman_time_2'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: wollman.order.id,
        onEdit: () => handleMemoEdit(),
        value: wollman.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, wollman, convertDate, t],
  );

  const columns = useMemo(() => [{ name: wollman.line_items[0]?.name, quantity: wollman.line_items[0]?.quantity, total: wollman.line_items[0]?.total }], [wollman]);

  return <DataDrawer columns={columns} attributes={attributes} data={wollman} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default WollmanDrawer;
