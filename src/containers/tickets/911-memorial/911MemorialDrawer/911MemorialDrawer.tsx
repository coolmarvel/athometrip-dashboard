import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface Memorial911DrawerProps {
  memorial911: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const Memorial911Drawer = ({ memorial911, setMutate, onClose }: Memorial911DrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: memorial911.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: memorial911.billing?.email ?? 'Email' },
      { label: t('Phone'), value: memorial911.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${memorial911.payment?.payment_method_title ?? 'Payment method'} (${memorial911.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(memorial911.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(memorial911.tour?.date_911 ?? handleStringKeyValue(memorial911.line_items[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
          const time = memorial911.tour?.time_911 ?? handleStringKeyValue(memorial911.line_items[0]?.meta_data)['입장 희망시간(1순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(memorial911.tour?.date_911_2 ?? handleStringKeyValue(memorial911.line_items[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
          const time = memorial911.tour?.time_911_2 ?? handleStringKeyValue(memorial911.line_items[0]?.meta_data)['입장 희망시간(2순위)'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: memorial911.order.id,
        onEdit: () => handleMemoEdit(),
        value: memorial911.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, memorial911, convertDate, t]
  );

  const columns = useMemo(() => [{ name: memorial911.line_items[0]?.name, quantity: memorial911.line_items[0]?.quantity, total: memorial911.line_items[0]?.total }] ?? [], [memorial911]);

  return <DataDrawer columns={columns} attributes={attributes} data={memorial911} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default Memorial911Drawer;
