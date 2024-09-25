import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { handleStringKeyValue, OrderType } from '@/types';
import { DataDrawer } from '@/components';
import { useConvertDate } from '@/hooks';

interface EmpireDrawerProps {
  empire: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const EmpireDrawer = ({ empire, setMutate, onClose }: EmpireDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: empire.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: empire.billing?.email ?? 'Email' },
      { label: t('Phone'), value: empire.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${empire.payment?.payment_method_title ?? 'Payment method'} (${empire.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(empire.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(
            empire.order.meta_data?.date_empire ??
            empire.order.meta_data?.empire_night_date ??
            empire.tour?.date_empire ??
            empire.tour?.empire_night_date ??
            handleStringKeyValue(empire.line_items?.[0]?.meta_data)['날짜'],
          ).split(' ')[0];
          const time =
            empire.order.meta_data?.empire_daytime_time ??
            empire.order.meta_data?.empire_night_time ??
            empire.tour?.empire_daytime_time ??
            empire.tour?.empire_night_time ??
            handleStringKeyValue(empire.line_items[0]?.meta_data)['입장 희망시간(1순위)'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(
            empire.order.meta_data?.date_empire ??
            empire.order.meta_data?.empire_night_date ??
            empire.tour?.date_empire ??
            empire.tour?.empire_night_date ??
            handleStringKeyValue(empire.line_items?.[0]?.meta_data)['날짜'],
          ).split(' ')[0];
          const time =
            empire.tour?.empire_night_time ??
            empire.order.meta_data?.summ_time_2 ??
            empire.tour?.summ_time_2 ??
            handleStringKeyValue(empire.line_items[0]?.meta_data)['입장 희망시간(2순위)'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: empire.order.id,
        onEdit: () => handleMemoEdit(),
        value: empire.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, empire, convertDate, t],
  );

  const columns = useMemo(() => [{ name: empire?.line_items?.[0]?.name, quantity: empire?.line_items?.[0]?.quantity, total: empire?.line_items?.[0]?.total }], [empire]);

  return <DataDrawer columns={columns} attributes={attributes} data={empire} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default EmpireDrawer;