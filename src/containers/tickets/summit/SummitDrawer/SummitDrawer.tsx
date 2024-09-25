import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { handleStringKeyValue, OrderType } from '@/types';
import { DataDrawer } from '@/components';
import { useConvertDate } from '@/hooks';

interface SummitDrawerProps {
  summit: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const SummitDrawer = ({ summit, setMutate, onClose }: SummitDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: summit.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: summit.billing?.email ?? 'Email' },
      { label: t('Phone'), value: summit.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${summit.payment?.payment_method_title ?? 'Payment method'} (${summit.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(summit.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(
            summit.order.meta_data?.date_summit ??
            summit.order.meta_data?.summit_night_date ??
            summit.tour?.date_summit ??
            summit.tour?.summit_night_date ??
            handleStringKeyValue(summit.line_items?.[0]?.meta_data)['날짜'],
          ).split(' ')[0];
          const time =
            summit.order.meta_data?.summit_daytime_time ??
            summit.order.meta_data?.summit_night_time ??
            summit.tour?.summit_daytime_time ??
            summit.tour?.summit_night_time ??
            handleStringKeyValue(summit.line_items[0]?.meta_data)['입장 희망시간(1순위)'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(
            summit.order.meta_data?.date_summit ??
            summit.order.meta_data?.summit_night_date ??
            summit.tour?.date_summit ??
            summit.tour?.summit_night_date ??
            handleStringKeyValue(summit.line_items?.[0]?.meta_data)['날짜'],
          ).split(' ')[0];
          const time =
            summit.tour?.summit_night_time ??
            summit.order.meta_data?.summ_time_2 ??
            summit.tour?.summ_time_2 ??
            handleStringKeyValue(summit.line_items[0]?.meta_data)['입장 희망시간(2순위)'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: summit.order.id,
        onEdit: () => handleMemoEdit(),
        value: summit.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, summit, convertDate, t],
  );

  const columns = useMemo(() => [{ name: summit?.line_items?.[0]?.name, quantity: summit?.line_items?.[0]?.quantity, total: summit?.line_items?.[0]?.total }], [summit]);

  return <DataDrawer columns={columns} attributes={attributes} data={summit} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default SummitDrawer;