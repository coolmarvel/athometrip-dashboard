import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface SingleDocentsDrawerProps {
  singleDocents: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const SingleDocentsDrawer = ({ singleDocents, setMutate, onClose }: SingleDocentsDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: singleDocents.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: singleDocents.billing?.email ?? 'Email' },
      { label: t('Phone'), value: singleDocents.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${singleDocents.payment?.payment_method_title ?? 'Payment method'} (${singleDocents.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Personal'), value: handleStringKeyValue(singleDocents.line_items[0].meta_data)['인원'] ?? 'Personal' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(singleDocents.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(singleDocents.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: singleDocents.order.id,
        onEdit: () => handleMemoEdit(),
        value: singleDocents.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, singleDocents, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: singleDocents.line_items[0]?.name ?? '',
        quantity: singleDocents.line_items[0]?.quantity ?? '',
        total: singleDocents.line_items[0]?.total ?? '',
      },
    ],
    [singleDocents],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={singleDocents} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default SingleDocentsDrawer;
