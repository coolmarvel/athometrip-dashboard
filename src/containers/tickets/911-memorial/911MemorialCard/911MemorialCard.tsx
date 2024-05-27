import { WithLabel } from '@/components';
import { useFormatDate } from '@/hooks';
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, SkeletonCircle, Stack, StackDivider } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Memorial911CardProps {
  data?: any;
}

const Memorial911Card = ({ data: user }: Memorial911CardProps) => {
  const { t } = useTranslation();
  const formatDate = useFormatDate();

  const attributes = useMemo(
    () => [
      { label: t('Approval Status'), value: user?.approved ? 'Yes' : 'No' },
      { label: t('Email'), value: user?.email ?? 'Email' },
      { label: t('Phone'), value: user?.phone ?? 'Phone' },
      {
        label: t('Created At'),
        value: user?.createdAt ? formatDate(user.createdAt) : 'Created At',
      },
      {
        label: t('Updated At'),
        value: user?.updatedAt ? formatDate(user.updatedAt) : 'Updated At',
      },
    ],
    [formatDate, t, user]
  );

  return (
    <Card direction={'row'}>
      <Box p={'5'}>
        <SkeletonCircle isLoaded={!!user} size={'40'}>
          <Avatar name={user?.name} src={user?.profile} w={'40'} h={'40'} />
        </SkeletonCircle>
      </Box>
      <Flex flex={1} direction={'column'}>
        <CardHeader>
          <Skeleton isLoaded={!!user}>
            <Flex justify={'space-between'}>
              <Heading size={'lg'}>{user?.name ?? t('Name')}</Heading>
            </Flex>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {attributes.map((attribute) => {
              return (
                <Skeleton key={attribute.label} isLoaded={!!user}>
                  <WithLabel {...attribute} />
                </Skeleton>
              );
            })}
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default Memorial911Card;