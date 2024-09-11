import { useTranslation } from 'react-i18next';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

type Column = {
  name: string;
  quantity: string;
  total: string;
};

interface DataDrawerBodyTableProps {
  columns: Column[];
}

export const DataDrawerBodyTable = ({ columns }: DataDrawerBodyTableProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>{t('Product')}</Th>
            <Th isNumeric>{t('Quantity')}</Th>
            <Th isNumeric>{t('Total')}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {columns.map((product: any, idx: any) => (
            <Tr key={idx}>
              <Td fontSize={'small'}>{product.name}</Td>
              <Td isNumeric fontSize={'small'}>
                {product.quantity}
              </Td>
              <Td isNumeric fontSize={'small'}>
                ${product.total}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};