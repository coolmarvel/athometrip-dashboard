import { Box, Center, Spinner, Table } from '@chakra-ui/react';
import { Table as ReactTable, Row } from '@tanstack/react-table';
import DataTableBody from './DataTableBody';
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';

interface DataTableProps<T> {
  table: ReactTable<T>;
  isLoading?: boolean;
  onRowClick?: (row: Row<T>) => void;
}

const DataTable = <T, >({ table, isLoading, onRowClick }: DataTableProps<T>) => {
  return (
    <>
      {/*<Box maxH="calc(425px)" overflowY="auto" overflowX="auto" borderWidth="1px" borderRadius="md" borderColor="gray.200">*/}
        <Table variant="striped" colorScheme="blue" width="full">
          <DataTableHeader table={table} />
          {!isLoading && <DataTableBody table={table} onRowClick={onRowClick} />}
          {/*<DataTableFooter table={table} />*/}
        </Table>
      {/*</Box>*/}
      {isLoading && (
        <Center my={'4'}>
          <Spinner color={'primary.500'} />
        </Center>
      )}
    </>
  );
};

export default DataTable;
