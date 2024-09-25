import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface NiagaraOneDayKingKongDrawerProps {
  niagaraOneDayKingKong: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const NiagaraOneDayKingKongDrawer = ({ niagaraOneDayKingKong, setMutate, onClose }: NiagaraOneDayKingKongDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraOneDayKingKong.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraOneDayKingKong.billing?.email ?? 'Email' },
      { label: t('Phone'), value: niagaraOneDayKingKong.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraOneDayKingKong.payment?.payment_method_title ?? 'Payment method'} (${niagaraOneDayKingKong.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(niagaraOneDayKingKong.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(niagaraOneDayKingKong.order.meta_data)['nicagara_day_date'] ?? handleStringKeyValue(niagaraOneDayKingKong.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];

          return `${date}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: niagaraOneDayKingKong.order.id,
        onEdit: () => handleMemoEdit(),
        value: niagaraOneDayKingKong.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, niagaraOneDayKingKong, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: niagaraOneDayKingKong.line_items[0]?.name ?? '',
        quantity: niagaraOneDayKingKong.line_items[0]?.quantity ?? '',
        total: niagaraOneDayKingKong.line_items[0]?.total ?? '',
      },
    ],
    [niagaraOneDayKingKong],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={niagaraOneDayKingKong} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default NiagaraOneDayKingKongDrawer;
