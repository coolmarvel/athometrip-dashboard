import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface LycaDrawerProps {
  lyca: OrderType;
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

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: lyca.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: lyca.billing?.email ?? 'Email' },
      { label: t('Phone'), value: lyca.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${lyca.payment?.payment_method_title ?? 'Payment method'} (${lyca.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(lyca.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('period'),
        value: (() => {
          let period;
          if (handleStringKeyValue(lyca.line_items[0]?.meta_data)['이용-기간-선택']) period = handleStringKeyValue(lyca.line_items[0].meta_data)['이용-기간-선택'];
          else if (handleStringKeyValue(lyca.line_items[0]?.meta_data)['플랜-선택']) period = handleStringKeyValue(lyca.line_items[0].meta_data)['플랜-선택'];
          else if (lyca.line_items[0]?.meta_data && handleStringKeyValue(lyca.line_items[0].meta_data)['상품-옵션']) {
            const optionValue = handleStringKeyValue(lyca.line_items[0].meta_data)['상품-옵션'];
            const match = optionValue.match(/\d+/);
            if (match) period = `${match[0]}일`;
          }

          return period as string;
        })(),
      },
      { label: t('model'), value: lyca.usim_info?.esim_device ?? '' },
      { label: t('activate'), value: (() => convertDate(lyca.usim_info?.att_tmobile_date ?? '').split(' ')[0])() },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: lyca.order.id,
        onEdit: () => handleMemoEdit(),
        value: lyca.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, lyca, t, convertDate],
  );

  const columns = useMemo(() =>
    [{
      name: lyca.line_items[0]?.name ?? '',
      quantity: lyca.line_items[0]?.quantity ?? '',
      total: lyca.line_items[0]?.total ?? '',
    }], [lyca]);

  return <DataDrawer columns={columns} attributes={attributes} data={lyca} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default LycaDrawer;
