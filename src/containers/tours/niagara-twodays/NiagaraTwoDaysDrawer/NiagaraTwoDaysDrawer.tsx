import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface NiagaraTwoDaysDrawerProps {
  niagaraTwoDays: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const NiagaraTwoDaysDrawer = ({ niagaraTwoDays, setMutate, onClose }: NiagaraTwoDaysDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraTwoDays.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraTwoDays.billing?.email ?? 'Email' },
      { label: t('Phone'), value: niagaraTwoDays.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraTwoDays.payment?.payment_method_title ?? 'Payment method'} (${niagaraTwoDays.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(niagaraTwoDays.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(niagaraTwoDays.order.meta_data)['niagara_tour_date'] ?? handleStringKeyValue(niagaraTwoDays.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];

          return `${date}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: niagaraTwoDays.order.id,
        onEdit: () => handleMemoEdit(),
        value: niagaraTwoDays.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, niagaraTwoDays, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: niagaraTwoDays.line_items[0]?.name ?? '',
        quantity: niagaraTwoDays.line_items[0]?.quantity ?? '',
        total: niagaraTwoDays.line_items[0]?.total ?? '',
      },
    ],
    [niagaraTwoDays],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={niagaraTwoDays} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default NiagaraTwoDaysDrawer;
