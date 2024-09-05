import { Avatar, Flex } from '@chakra-ui/react';

interface UserNameProps {
  name: any;
  profile?: any;
}

const UserName = ({ name, profile }: UserNameProps) => {
  return (
    <Flex gap={'4'} align={'center'}>
      <Avatar name={name} src={profile} w={'10'} h={'10'} />
      {name}
    </Flex>
  );
};

export default UserName;
