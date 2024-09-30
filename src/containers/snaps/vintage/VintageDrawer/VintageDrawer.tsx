import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface VintageDrawerProps {
  vintage: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const VintageDrawer = ({ vintage, setMutate, onClose }: VintageDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: vintage.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: vintage.billing?.email ?? 'Email' },
      { label: t('Phone'), value: vintage.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${vintage.payment?.payment_method_title ?? 'Payment method'} (${vintage.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(vintage.line_items[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule (1)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(vintage.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(vintage.line_items[0].meta_data)['촬영 시작 희망시간 (1순위)'];

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Schedule (2)'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(vintage.line_items[0].meta_data)['날짜']).split(' ')[0] ?? '';
          const time = handleStringKeyValue(vintage.line_items[0].meta_data)['촬영 시작 희망시간 (2순위)'];

          return `${date} ${time}`;
        })(),
      },
      { label: t('Personnel'), value: handleStringKeyValue(vintage.line_items[0].meta_data)['인원'] ?? 'Personnel' },
      {
        label: t('Marketing Opt-in'),
        value: (() => handleStringKeyValue(vintage.line_items[0].meta_data)['홍보 목적 사용 동의'] ?? '')(),
      },
      {
        label: t('On-site Payment'),
        value: (() => {
          const a = Number(handleStringKeyValue(vintage.line_items[0].meta_data)['_full_amount'] ?? '0');
          const b = Number(vintage.line_items[0].subtotal);

          return a - b < 0 ? '0' : String(a - b);
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: vintage.order.id,
        onEdit: () => handleMemoEdit(),
        value: vintage.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, vintage, convertDate, t]
  );

  const columns = useMemo(
    () => [
      {
        name: vintage.line_items[0]?.name ?? '',
        quantity: vintage.line_items[0]?.quantity ?? '',
        total: vintage.line_items[0]?.total ?? '',
      },
    ],
    [vintage]
  );

  return <DataDrawer columns={columns} attributes={attributes} data={vintage} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default VintageDrawer;
