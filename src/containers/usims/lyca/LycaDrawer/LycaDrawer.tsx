import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { extractText } from '@/utils';

interface LycaDrawerProps {
  lyca: any;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const LycaDrawer = ({ lyca, setMutate, onClose }: LycaDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const targetLineItem = useMemo(() => lyca.line_items.find((item: any) => item.order_item_name.includes('라이카') || item.order_item_name.includes('lyca')), [lyca]);

  const attributes = useMemo(() => {
    if (!targetLineItem) return [];

    return [
      { label: t('Name'), value: lyca.meta_data._billing_first_name.toUpperCase() ?? 'Name' },
      { label: t('Email'), value: lyca.meta_data._billing_email.toLowerCase() ?? 'Email' },
      { label: t('Phone'), value: lyca.meta_data._billing_phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${lyca.meta_data._payment_method_title ?? 'Payment method'} (${lyca.meta_data._transaction_id ?? 'Transaction ID'})` },
      {
        label: t('Period'),
        value: (() => {
          const period = targetLineItem.order_item_name;
          const match = period.match(/\d+/);

          if (match) return `${match[0]}일`;
          else return '';
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: targetLineItem.order_item_id,
        value: targetLineItem.memo ?? '',
        onEdit: () => handleMemoEdit(),
      },
    ];
  }, [isEdit, handleMemoEdit, lyca, convertDate, t, targetLineItem]);

  const columns = useMemo(() => {
    if (!targetLineItem) return [];
    return [{ name: extractText(targetLineItem.order_item_name), quantity: lyca.quantity, total: targetLineItem.meta_data._line_total }];
  }, [targetLineItem]);

  return <DataDrawer columns={columns} attributes={attributes} data={lyca} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default LycaDrawer;
