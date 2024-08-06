import { useRouter } from 'next/router';

import { GaiaHead, ResponsiveLayout } from '@/components';
import { UserCard } from '@/containers';
import { QueryParser } from '@/utils';
import { useGetUser } from '@/apis';

const UserPage = () => {
  const router = useRouter();
  const { data: user } = useGetUser(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <UserCard data={user} />
      </ResponsiveLayout>
    </>
  );
};

export default UserPage;
