import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface MomaDocentDrawerProps {
  momaDocent: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const MomaDocentDrawer = ({ momaDocent, setMutate, onClose }: MomaDocentDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: momaDocent.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: momaDocent.billing?.email ?? 'Email' },
      { label: t('Phone'), value: momaDocent.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${momaDocent.payment?.payment_method_title ?? 'Payment method'} (${momaDocent.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(momaDocent.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(momaDocent.order.meta_data)['docent_tour_moma'] ?? handleStringKeyValue(momaDocent.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(momaDocent.order.meta_data)['moma_docent_time'] ?? handleStringKeyValue(momaDocent.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: momaDocent.order.id,
        onEdit: () => handleMemoEdit(),
        value: momaDocent.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, momaDocent, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: momaDocent.line_items[0]?.name ?? '',
        quantity: momaDocent.line_items[0]?.quantity ?? '',
        total: momaDocent.line_items[0]?.total ?? '',
      },
    ],
    [momaDocent],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={momaDocent} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default MomaDocentDrawer;
