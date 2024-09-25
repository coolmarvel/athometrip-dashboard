import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface MetroDocentDrawerProps {
  metroDocent: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const MetroDocentDrawer = ({ metroDocent, setMutate, onClose }: MetroDocentDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: metroDocent.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: metroDocent.billing?.email ?? 'Email' },
      { label: t('Phone'), value: metroDocent.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${metroDocent.payment?.payment_method_title ?? 'Payment method'} (${metroDocent.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(metroDocent.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(
            handleStringKeyValue(metroDocent.order.meta_data)['docent_tour_met'] ??
            handleStringKeyValue(metroDocent.line_items[0].meta_data)['날짜'] ??
            handleStringKeyValue(metroDocent.order.meta_data)['docent_tour_met_art'] ??
            '').split(' ')[0];
          const time =
            handleStringKeyValue(metroDocent.order.meta_data)['met_docent_time'] ??
            handleStringKeyValue(metroDocent.line_items[0].meta_data)['시간'] ??
            handleStringKeyValue(metroDocent.order.meta_data)['docent_tour_met_art2'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: metroDocent.order.id,
        onEdit: () => handleMemoEdit(),
        value: metroDocent.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, metroDocent, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: metroDocent.line_items[0]?.name ?? '',
        quantity: metroDocent.line_items[0]?.quantity ?? '',
        total: metroDocent.line_items[0]?.total ?? '',
      },
    ],
    [metroDocent],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={metroDocent} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default MetroDocentDrawer;
