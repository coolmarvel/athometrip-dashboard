import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface MetroDocentPaintingDrawerProps {
  metroDocentPainting: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const MetroDocentPaintingDrawer = ({ metroDocentPainting, setMutate, onClose }: MetroDocentPaintingDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: metroDocentPainting.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: metroDocentPainting.billing?.email ?? 'Email' },
      { label: t('Phone'), value: metroDocentPainting.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${metroDocentPainting.payment?.payment_method_title ?? 'Payment method'} (${metroDocentPainting.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(metroDocentPainting.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(
            handleStringKeyValue(metroDocentPainting.order.meta_data)['docent_tour_met'] ??
            handleStringKeyValue(metroDocentPainting.line_items[0].meta_data)['날짜'] ??
            handleStringKeyValue(metroDocentPainting.order.meta_data)['docent_tour_met_art'] ??
            '').split(' ')[0];
          const time =
            handleStringKeyValue(metroDocentPainting.order.meta_data)['met_docent_time'] ??
            handleStringKeyValue(metroDocentPainting.line_items[0].meta_data)['시간'] ??
            handleStringKeyValue(metroDocentPainting.order.meta_data)['docent_tour_met_art2'] ??
            '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: metroDocentPainting.order.id,
        onEdit: () => handleMemoEdit(),
        value: metroDocentPainting.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, metroDocentPainting, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: metroDocentPainting.line_items[0]?.name ?? '',
        quantity: metroDocentPainting.line_items[0]?.quantity ?? '',
        total: metroDocentPainting.line_items[0]?.total ?? '',
      },
    ],
    [metroDocentPainting],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={metroDocentPainting} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default MetroDocentPaintingDrawer;
