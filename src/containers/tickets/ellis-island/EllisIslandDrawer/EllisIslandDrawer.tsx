import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface EllisIslandDrawerProps {
  ellisIsland: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const EllisIslandDrawer = ({ ellisIsland, setMutate, onClose }: EllisIslandDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: ellisIsland.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: ellisIsland.billing?.email ?? 'Email' },
      { label: t('Phone'), value: ellisIsland.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${ellisIsland.payment?.payment_method_title ?? 'Payment method'} (${ellisIsland.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(ellisIsland.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(ellisIsland.order.meta_data?.['ellis_island_date'] ?? '').split(' ')[0];
          const ellisIslandTime = ellisIsland.order.meta_data?.['ellis_island_time'];
          const ellisIslandTime2 = ellisIsland.order.meta_data?.['ellis_island_time2'];

          let time;
          if (ellisIslandTime && ellisIslandTime2) time = `${ellisIslandTime} / ${ellisIslandTime2}`;
          else if (ellisIslandTime) time = ellisIslandTime;
          else if (ellisIslandTime2) time = ellisIslandTime2;
          else time = '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: ellisIsland.order.id,
        onEdit: () => handleMemoEdit(),
        value: ellisIsland.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, ellisIsland, convertDate, t]
  );

  const columns = useMemo(() => [{ name: ellisIsland.line_items[0]?.name, quantity: ellisIsland.line_items[0]?.quantity, total: ellisIsland.line_items[0]?.total }], [ellisIsland]);

  return <DataDrawer columns={columns} attributes={attributes} data={ellisIsland} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default EllisIslandDrawer;
