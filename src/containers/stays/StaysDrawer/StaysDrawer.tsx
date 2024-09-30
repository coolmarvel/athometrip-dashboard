import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface StaysDrawerProps {
  stays: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const StaysDrawer = ({ stays, setMutate, onClose }: StaysDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: stays.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: stays.billing?.email ?? 'Email' },
      { label: t('Phone'), value: stays.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${stays.payment?.payment_method_title ?? 'Payment method'} (${stays.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Personnel'), value: handleStringKeyValue(stays.line_items[0].meta_data)['인원'] ?? 'Personnel' },
      { label: t('Payment Amount'), value: stays.line_items[0]?.total ?? '' },
      { label: t('Full Amount'), value: handleStringKeyValue(stays.line_items[0]?.meta_data)['_full_amount'] ?? '' },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: stays.order.id,
        onEdit: () => handleMemoEdit(),
        value: stays.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, stays, t],
  );

  const columns = useMemo(() =>
    [{
      name: stays.line_items[0]?.name ?? '',
      quantity: stays.line_items[0]?.quantity ?? '',
      total: stays.line_items[0]?.total ?? '',
    }], [stays]);

  return <DataDrawer columns={columns} attributes={attributes} data={stays} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default StaysDrawer;
