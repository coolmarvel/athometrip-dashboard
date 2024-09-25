import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useConvertDate } from '@/hooks';
import { DataDrawer } from '@/components';
import { handleStringKeyValue, OrderType } from '@/types';

interface AMNHDocentDrawerProps {
  amnhDocent: OrderType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const AMNHDocentDrawer = ({ amnhDocent, setMutate, onClose }: AMNHDocentDrawerProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: amnhDocent.billing?.first_name ?? 'Name' },
      { label: t('Email'), value: amnhDocent.billing?.email ?? 'Email' },
      { label: t('Phone'), value: amnhDocent.billing?.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${amnhDocent.payment?.payment_method_title ?? 'Payment method'} (${amnhDocent.payment?.transaction_id ?? 'Transaction ID'})` },
      { label: t('Type'), value: handleStringKeyValue(amnhDocent.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
      {
        label: t('Schedule'),
        value: (() => {
          const date = convertDate(handleStringKeyValue(amnhDocent.order.meta_data)['amnh_docent_date'] ?? handleStringKeyValue(amnhDocent.line_items[0].meta_data)['날짜'] ?? '').split(' ')[0];
          const time = handleStringKeyValue(amnhDocent.order.meta_data)['anmh_docent_time'] ?? handleStringKeyValue(amnhDocent.line_items[0].meta_data)['시간'] ?? '';

          return `${date} ${time}`;
        })(),
      },
      {
        label: t('Memo'),
        isMemo: true,
        isEdit: isEdit,
        id: amnhDocent.order.id,
        onEdit: () => handleMemoEdit(),
        value: amnhDocent.order.memo ?? '',
      },
    ],
    [isEdit, handleMemoEdit, amnhDocent, convertDate, t],
  );

  const columns = useMemo(
    () => [
      {
        name: amnhDocent.line_items[0]?.name ?? '',
        quantity: amnhDocent.line_items[0]?.quantity ?? '',
        total: amnhDocent.line_items[0]?.total ?? '',
      },
    ],
    [amnhDocent],
  );

  return <DataDrawer columns={columns} attributes={attributes} data={amnhDocent} setMutate={setMutate} setIsEdit={setIsEdit} onClose={onClose} />;
};

export default AMNHDocentDrawer;
