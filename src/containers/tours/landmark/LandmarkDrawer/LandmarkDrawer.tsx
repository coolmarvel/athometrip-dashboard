import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface LandmarkDrawerProps {
  landmark: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const LandmarkDrawer = ({ landmark, setMutate, onClose }: LandmarkDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: landmark.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: landmark.billing?.email ?? 'Email' },
      { label: t('Phone'), value: landmark.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${landmark.payment?.payment_method_title ?? 'Payment method'} (${landmark.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(landmark.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(landmark.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(landmark.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: landmark.order.id,
        onEdit: () => handleMemoEdit(),
        value: landmark.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, landmark, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: landmark.line_items[0]?.name ?? '',
        quantity: landmark.line_items[0]?.quantity ?? '',
        total: landmark.line_items[0]?.total ?? '',
      },
    ],
    [landmark],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={landmark} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default LandmarkDrawer;
