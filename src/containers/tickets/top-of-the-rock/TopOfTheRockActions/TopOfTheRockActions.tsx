import { MouseEventHandler } from 'react';
import { TbTrash } from 'react-icons/tb';
import { ViewIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';

interface TopOfTheRockActionsProps {
  onView: MouseEventHandler<HTMLButtonElement>;
}

const TopOfTheRockActions = ({ onView }: TopOfTheRockActionsProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={'2'}>
      <Tooltip hasArrow label={t('View Details')}>
        <IconButton aria-label="edit" icon={<ViewIcon />} onClick={onView} />
      </Tooltip>
      <Tooltip hasArrow label={t('Delete User')}>
        <IconButton aria-label="delete" icon={<TbTrash />} />
      </Tooltip>
    </Flex>
  );
};

export default TopOfTheRockActions;