import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { handleStringKeyValue, OrderType } from '@/types';
import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';

interface UNTourDrawerProps {
  unTour: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const UNTourDrawer = ({ unTour, setMutate, onClose }: UNTourDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: unTour.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: unTour.billing?.email ?? 'Email' },
      { label: t('Phone'), value: unTour.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${unTour.payment?.payment_method_title ?? 'Payment method'} (${unTour.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(unTour.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(unTour.order.meta_data?.['un_tour_date'] ?? handleStringKeyValue(unTour.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = unTour.order.meta_data['un_tour_time3'] ?? handleStringKeyValue(unTour.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: unTour.order.id,
        onEdit: () => handleMemoEdit(),
        value: unTour.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, unTour, convertDate, t],
  );

  const columns = useMemo(() => [{ name: unTour.line_items[0]?.name, quantity: unTour.line_items[0]?.quantity, total: unTour.line_items[0]?.total }] ?? [], [unTour]);

  return <DataDrawer columns={columns} attributes={attributes} data={unTour} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default UNTourDrawer;