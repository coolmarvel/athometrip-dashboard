import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface GuggenheimDocentDrawerProps {
  guggenheimDocent: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const GuggenheimDocentDrawer = ({ guggenheimDocent, setMutate, onClose }: GuggenheimDocentDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: guggenheimDocent.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: guggenheimDocent.billing?.email ?? 'Email' },
      { label: t('Phone'), value: guggenheimDocent.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${guggenheimDocent.payment?.payment_method_title ?? 'Payment method'} (${guggenheimDocent.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(guggenheimDocent.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(guggenheimDocent.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(guggenheimDocent.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: guggenheimDocent.order.id,
        onEdit: () => handleMemoEdit(),
        value: guggenheimDocent.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, guggenheimDocent, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: guggenheimDocent.line_items[0]?.name ?? '',
        quantity: guggenheimDocent.line_items[0]?.quantity ?? '',
        total: guggenheimDocent.line_items[0]?.total ?? '',
      },
    ],
    [guggenheimDocent],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={guggenheimDocent} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default GuggenheimDocentDrawer;
