import { useGetCityTripByPage, useResetCityTrip } from '@/apis';
import { Pagination } from '@/components';
import { CityTripTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CityTripByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetCityTrip } = useResetCityTrip();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: cityTripByPage, isLoading: isLoading } = useGetCityTripByPage(params);

  useEffect(() => {
    resetCityTrip();
  }, [before, resetCityTrip]);

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
