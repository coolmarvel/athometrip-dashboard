import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetCityTripByPage } from '@/apis';
import { CityTripTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const CityTripByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: cityTripByPage, isLoading: isLoading } = useGetCityTripByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <CityTripTable cityTrip={cityTripByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={cityTripByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default CityTripByPage;
