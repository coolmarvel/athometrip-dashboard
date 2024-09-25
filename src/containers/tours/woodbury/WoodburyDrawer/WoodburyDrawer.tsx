import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface WoodburyDrawerProps {
  woodbury: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const WoodburyDrawer = ({ woodbury, setMutate, onClose }: WoodburyDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: woodbury.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: woodbury.billing?.email ?? 'Email' },
      { label: t('Phone'), value: woodbury.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${woodbury.payment?.payment_method_title ?? 'Payment method'} (${woodbury.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(woodbury.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(woodbury.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(woodbury.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: woodbury.order.id,
        onEdit: () => handleMemoEdit(),
        value: woodbury.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, woodbury, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: woodbury.line_items[0]?.name ?? '',
        quantity: woodbury.line_items[0]?.quantity ?? '',
        total: woodbury.line_items[0]?.total ?? '',
      },
    ],
    [woodbury],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={woodbury} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default WoodburyDrawer;
