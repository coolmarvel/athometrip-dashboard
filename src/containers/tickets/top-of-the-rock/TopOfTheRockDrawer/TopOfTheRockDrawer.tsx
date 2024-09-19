import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface TopOfTheRockDrawerProps {
  topOfTheRock: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const TopOfTheRockDrawer = ({ topOfTheRock, setMutate, onClose }: TopOfTheRockDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: topOfTheRock.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: topOfTheRock.billing?.email ?? 'Email' },
      { label: t('Phone'), value: topOfTheRock.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${topOfTheRock.payment?.payment_method_title ?? 'Payment method'} (${topOfTheRock.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(topOfTheRock.tour?.top_date ?? topOfTheRock.order?.meta_data?.top_date ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['날짜']).split(' ')[0];
          const time = topOfTheRock.tour?.top_sunset ?? topOfTheRock.order?.meta_data?.top_sunset ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['입장 희망시간(1순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(topOfTheRock.tour?.top_date ?? topOfTheRock.order?.meta_data?.top_date ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
          const time = topOfTheRock.tour?.tor_time_2 ?? topOfTheRock.order?.meta_data?.tor_time_2 ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['입장 희망시간(2순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: topOfTheRock.order.id,
        onEdit: () => handleMemoEdit(),
        value: topOfTheRock.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, topOfTheRock, convertDate, t],
  );

  const columns = useMemo(() => [{ name: topOfTheRock?.line_items?.[0]?.name, quantity: topOfTheRock?.line_items?.[0]?.quantity, total: topOfTheRock?.line_items?.[0]?.total }] ?? [], [topOfTheRock]);

  return <DataDrawer columns={columns} attributes={attributes} data={topOfTheRock} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default TopOfTheRockDrawer;
