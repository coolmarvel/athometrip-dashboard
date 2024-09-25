import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface WhitneyDocentDrawerProps {
  whitneyDocent: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const WhitneyDocentDrawer = ({ whitneyDocent, setMutate, onClose }: WhitneyDocentDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: whitneyDocent.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: whitneyDocent.billing?.email ?? 'Email' },
      { label: t('Phone'), value: whitneyDocent.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${whitneyDocent.payment?.payment_method_title ?? 'Payment method'} (${whitneyDocent.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(whitneyDocent.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(whitneyDocent.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(whitneyDocent.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: whitneyDocent.order.id,
        onEdit: () => handleMemoEdit(),
        value: whitneyDocent.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, whitneyDocent, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: whitneyDocent.line_items[0]?.name ?? '',
        quantity: whitneyDocent.line_items[0]?.quantity ?? '',
        total: whitneyDocent.line_items[0]?.total ?? '',
      },
    ],
    [whitneyDocent],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={whitneyDocent} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default WhitneyDocentDrawer;
