import { TbCheck } from 'react-icons/tb';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';

interface UserApprovedProps {
  approved: boolean;
  onApprove: MouseEventHandler<HTMLButtonElement>;
}

const UserApproved = ({ approved, onApprove }: UserApprovedProps) => {
  const { t } = useTranslation();

  return (
    <Flex>
      {approved ? (
        t('Approved')
      ) : (
        <Tooltip hasArrow label={t('Approve User')}>
          <IconButton aria-label="approve" icon={<TbCheck />} onClick={onApprove} />
        </Tooltip>
      )}
    </Flex>
  );
};

export default UserApproved;
