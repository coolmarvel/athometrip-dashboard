import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface H2OEsimDrawerProps {
  h2oEsim: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const H2OEsimDrawer = ({ h2oEsim, setMutate, onClose }: H2OEsimDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: h2oEsim.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: h2oEsim.billing?.email ?? 'Email' },
      { label: t('Phone'), value: h2oEsim.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${h2oEsim.payment?.payment_method_title ?? 'Payment method'} (${h2oEsim.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(h2oEsim.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('period'),
        value: (() => {
          let period;
          if (handleStringKeyValue(h2oEsim.line_items[0]?.meta_data)['이용-기간-선택']) period = handleStringKeyValue(h2oEsim.line_items[0].meta_data)['이용-기간-선택'];
          else if (handleStringKeyValue(h2oEsim.line_items[0]?.meta_data)['플랜-선택']) period = handleStringKeyValue(h2oEsim.line_items[0].meta_data)['플랜-선택'];
          else if (h2oEsim.line_items[0]?.meta_data && handleStringKeyValue(h2oEsim.line_items[0].meta_data)['상품-옵션']) {
            const optionValue = handleStringKeyValue(h2oEsim.line_items[0].meta_data)['상품-옵션'];
            const match = optionValue.match(/\d+/);
            if (match) period = `${match[0]}일`;
          }

          return period as string;
        })(),
      },
      { label: t('model'), value: h2oEsim.usim_info?.esim_device ?? '' },
      { label: t('activate'), value: (() => convertDate(h2oEsim.usim_info?.att_tmobile_date ?? '').split(' ')[0])() },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: h2oEsim.order.id,
        onEdit: () => handleMemoEdit(),
        value: h2oEsim.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, h2oEsim, t, convertDate],
  );

  const columns = useMemo(() =>
    [{
      name: h2oEsim.line_items[0]?.name ?? '',
      quantity: h2oEsim.line_items[0]?.quantity ?? '',
      total: h2oEsim.line_items[0]?.total ?? '',
    }], [h2oEsim]);

  return <DataDrawer columns={columns} attributes={attributes} data={h2oEsim} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default H2OEsimDrawer;
