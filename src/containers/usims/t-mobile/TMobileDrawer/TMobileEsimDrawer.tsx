import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface TMobileEsimDrawerProps {
  tMobile: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const TMobileEsimDrawer = ({ tMobile, setMutate, onClose }: TMobileEsimDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: tMobile.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: tMobile.billing?.email ?? 'Email' },
      { label: t('Phone'), value: tMobile.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${tMobile.payment?.payment_method_title ?? 'Payment method'} (${tMobile.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(tMobile.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('period'),
        value: (() => {
          let period;
          if (handleStringKeyValue(tMobile.line_items[0]?.meta_data)['이용-기간-선택']) period = handleStringKeyValue(tMobile.line_items[0].meta_data)['이용-기간-선택'];
          else if (handleStringKeyValue(tMobile.line_items[0]?.meta_data)['플랜-선택']) period = handleStringKeyValue(tMobile.line_items[0].meta_data)['플랜-선택'];
          else if (tMobile.line_items[0]?.meta_data && handleStringKeyValue(tMobile.line_items[0].meta_data)['상품-옵션']) {
            const optionValue = handleStringKeyValue(tMobile.line_items[0].meta_data)['상품-옵션'];
            const match = optionValue.match(/\d+/);
            if (match) period = `${match[0]}일`;
          }

          return period as string;
        })(),
      },
      { label: t('model'), value: tMobile.usim_info?.esim_device ?? '' },
      { label: t('eid'), value: tMobile.usim_info?.esim_eid ?? '' },
      { label: t('esim_imei'), value: tMobile.usim_info?.esim_imei ?? '' },
      { label: t('activate'), value: (() => convertDate(tMobile.usim_info?.att_tmobile_date ?? '').split(' ')[0])() },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: tMobile.order.id,
        onEdit: () => handleMemoEdit(),
        value: tMobile.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, tMobile, t, convertDate],
  );

  const columns = useMemo(() =>
    [{
      name: tMobile.line_items[0]?.name ?? '',
      quantity: tMobile.line_items[0]?.quantity ?? '',
      total: tMobile.line_items[0]?.total ?? '',
    }], [tMobile]);

  return <DataDrawer columns={columns} attributes={attributes} data={tMobile} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default TMobileEsimDrawer;
