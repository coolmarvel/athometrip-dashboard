import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface ModernDrawerProps {
  modern: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const ModernDrawer = ({ modern, setMutate, onClose }: ModernDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: modern.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: modern.billing?.email ?? 'Email' },
      { label: t('Phone'), value: modern.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${modern.payment?.payment_method_title ?? 'Payment method'} (${modern.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(modern.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(modern.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(modern.line_items[0].meta_data)['촬영 시작 희망시간 (1순위)'];

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(modern.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(modern.line_items[0].meta_data)['촬영 시작 희망시간 (2순위)'];

          return `${date} ${time}`;
        })(),
      },
      { label: t('Personnel'), value: handleStringKeyValue(modern.line_items[0].meta_data)['인원'] ?? 'Personnel' },
      {
        label: t('Marketing Opt-in'),
        value: (() => handleStringKeyValue(modern.line_items[0].meta_data)['홍보 목적 사용 동의'] ?? '')(),
      },
      {
        label: t('On-site Payment'),
        value: String(Number(handleStringKeyValue(modern.line_items[0].meta_data)['_full_amount']) - Number(modern.line_items[0].subtotal)) ?? '',
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: modern.order.id,
        onEdit: () => handleMemoEdit(),
        value: modern.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, modern, convertDate, t]
  );

  const columns = useMemo(
    () => [
      {
        name: modern.line_items[0]?.name ?? '',
        quantity: modern.line_items[0]?.quantity ?? '',
        total: modern.line_items[0]?.total ?? '',
      },
    ],
    [modern]
  );

  return <DataDrawer columns={columns} attributes={attributes} data={modern} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default ModernDrawer;
