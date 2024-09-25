import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface NiagaraOneDayAthometripDrawerProps {
  niagaraOneDayAthometrip: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const NiagaraOneDayAthometripDrawer = ({ niagaraOneDayAthometrip, setMutate, onClose }: NiagaraOneDayAthometripDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraOneDayAthometrip.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraOneDayAthometrip.billing?.email ?? 'Email' },
      { label: t('Phone'), value: niagaraOneDayAthometrip.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraOneDayAthometrip.payment?.payment_method_title ?? 'Payment method'} (${niagaraOneDayAthometrip.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(niagaraOneDayAthometrip.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(niagaraOneDayAthometrip.order.meta_data)['niagara_day_bus_tour_date'] ?? handleStringKeyValue(niagaraOneDayAthometrip.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(niagaraOneDayAthometrip.order.meta_data)['niagara_day_bus_tour_time'] ?? handleStringKeyValue(niagaraOneDayAthometrip.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: niagaraOneDayAthometrip.order.id,
        onEdit: () => handleMemoEdit(),
        value: niagaraOneDayAthometrip.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, niagaraOneDayAthometrip, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: niagaraOneDayAthometrip.line_items[0]?.name ?? '',
        quantity: niagaraOneDayAthometrip.line_items[0]?.quantity ?? '',
        total: niagaraOneDayAthometrip.line_items[0]?.total ?? '',
      },
    ],
    [niagaraOneDayAthometrip],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={niagaraOneDayAthometrip} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default NiagaraOneDayAthometripDrawer;
