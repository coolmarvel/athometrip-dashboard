import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface MusicalsDrawerProps {
  musicals: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const MusicalsDrawer = ({ musicals, setMutate, onClose }: MusicalsDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: musicals.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: musicals.billing?.email ?? 'Email' },
      { label: t('Phone'), value: musicals.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${musicals.payment?.payment_method_title ?? 'Payment method'} (${musicals.payment?.transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(musicals.tour?.date_911 ?? handleStringKeyValue(musicals.line_items[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
          const time = musicals.tour?.time_911 ?? handleStringKeyValue(musicals.line_items[0]?.meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: musicals.order.id,
        onEdit: () => handleMemoEdit(),
        value: musicals.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, musicals, convertDate, t],
  );

  const columns = useMemo(() =>
    [{
      name: musicals.line_items[0]?.name ?? '',
      quantity: musicals.line_items[0]?.quantity ?? '',
      total: musicals.line_items[0]?.total ?? '',
    }], [musicals]);

  return <DataDrawer columns={columns} attributes={attributes} data={musicals} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default MusicalsDrawer;
