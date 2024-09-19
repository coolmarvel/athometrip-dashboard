import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface OneWorldDrawerProps {
  oneWorld: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const OneWorldDrawer = ({ oneWorld, setMutate, onClose }: OneWorldDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: oneWorld.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: oneWorld.billing?.email ?? 'Email' },
      { label: t('Phone'), value: oneWorld.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${oneWorld.payment?.payment_method_title ?? 'Payment method'} (${oneWorld.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(oneWorld.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(oneWorld.tour?.oneworld_date ?? handleStringKeyValue(oneWorld.line_items[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
          const time = oneWorld.tour?.oneworld_time ?? handleStringKeyValue(oneWorld.line_items[0]?.meta_data)['입장 희망시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: oneWorld.order.id,
        onEdit: () => handleMemoEdit(),
        value: oneWorld.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, oneWorld, convertDate, t]
  );

  const columns = useMemo(() => [{ name: oneWorld?.line_items?.[0]?.name, quantity: oneWorld?.line_items?.[0]?.quantity, total: oneWorld?.line_items?.[0]?.total }] ?? [], [oneWorld]);

  return <DataDrawer columns={columns} attributes={attributes} data={oneWorld} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default OneWorldDrawer;
