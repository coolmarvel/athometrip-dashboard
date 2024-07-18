import { useAlphaColor } from '@/hooks';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import { Table as ReactTable, Row, flexRender } from '@tanstack/react-table';

interface DataTableBodyProps<T> {
  table: ReactTable<T>;
  onRowClick?: (row: Row<T>) => void;
}

const DataTableBody = <T,>({ table, onRowClick }: DataTableBodyProps<T>) => {
  const alphaColor = useAlphaColor();

  // TODO 새로고침하면 에러 발생하는 문제 및 검색 결과 없는 결과 노출로 수정 필요
  if (!table.getRowModel.length && !table.getRowModel().rows) {
    const columnCount = table?.getAllColumns().length;

    return (
      <Tbody>
          <Tr>
            <Td colSpan={columnCount} textAlign="center">검색 결과가 없어요.</Td>
          </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => (
        <Tr key={row.id} onClick={() => onRowClick?.(row)} _hover={{ cursor: onRowClick ? 'pointer' : 'default', bgColor: onRowClick ? alphaColor(50) : undefined }}>
          {row.getVisibleCells().map((cell) => (
            <Td key={cell.id} py={'2'} px={'4'}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default DataTableBody;
