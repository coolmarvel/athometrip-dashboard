import { useGetLandmarkByPage, useResetLandmark } from '@/apis';
import { Pagination } from '@/components';
import { LandmarkTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LandmarkByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetLandmark } = useResetLandmark();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: landmarkByPage, isLoading: isLoading } = useGetLandmarkByPage(params);

  useEffect(() => {
    resetLandmark();
  }, [before, resetLandmark]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <LandmarkTable landmark={landmarkByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={landmarkByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default LandmarkByPage;
