import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface BostonDrawerProps {
  boston: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const BostonDrawer = ({ boston, setMutate, onClose }: BostonDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: boston.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: boston.billing?.email ?? 'Email' },
      { label: t('Phone'), value: boston.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${boston.payment?.payment_method_title ?? 'Payment method'} (${boston.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(boston.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(boston.order.meta_data)['boston_tour_date'] ?? handleStringKeyValue(boston.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';

          return `${date}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: boston.order.id,
        onEdit: () => handleMemoEdit(),
        value: boston.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, boston, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: boston.line_items[0]?.name ?? '',
        quantity: boston.line_items[0]?.quantity ?? '',
        total: boston.line_items[0]?.total ?? '',
      },
    ],
    [boston],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={boston} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default BostonDrawer;
