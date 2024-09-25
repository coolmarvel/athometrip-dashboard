import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface MLBMetsDrawerProps {
  mlbMets: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const MLBMetsDrawer = ({ mlbMets, setMutate, onClose }: MLBMetsDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: mlbMets.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: mlbMets.billing?.email ?? 'Email' },
      { label: t('Phone'), value: mlbMets.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${mlbMets.payment?.payment_method_title ?? 'Payment method'} (${mlbMets.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(mlbMets.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(
            mlbMets.order.meta_data?.['yankees_peak_date'] ??
              mlbMets.order.meta_data?.['yankees_off_date'] ??
              handleStringKeyValue(mlbMets.line_items[0]?.meta_data)['yankees_off_date'] ??
              handleStringKeyValue(mlbMets.line_items[0]?.meta_data)['날짜'] ??
              ''
          ).split(' ')[0];
          const time =
            mlbMets.order.meta_data?.['yankees_peak_time'] ??
            mlbMets.order.meta_data?.['yankees_off_time'] ??
            handleStringKeyValue(mlbMets.line_items[0]?.meta_data)['yankees_off_time'] ??
            handleStringKeyValue(mlbMets.line_items[0]?.meta_data)['시간'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: mlbMets.order.id,
        onEdit: () => handleMemoEdit(),
        value: mlbMets.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, mlbMets, convertDate, t]
  );

  const columns = useMemo(() => [{ name: mlbMets.line_items[0]?.name, quantity: mlbMets.line_items[0]?.quantity, total: mlbMets.line_items[0]?.total }], [mlbMets]);

  return <DataDrawer columns={columns} attributes={attributes} data={mlbMets} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default MLBMetsDrawer;
