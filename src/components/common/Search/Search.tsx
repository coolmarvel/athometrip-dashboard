import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { Box, IconButton, Input, InputGroup, InputRightElement, Flex } from '@chakra-ui/react';

interface SearchProps {
  onSubmit: (data: string) => void;
  placeholder?: string;
}

const Search = ({ onSubmit, placeholder }: SearchProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<{ search: string }>();
  const { t } = useTranslation();
  const searchValue = watch('search');

  const clearSearch = useCallback(() => {
    setValue('search', '', { shouldValidate: true });
    handleSubmit((data) => onSubmit(data.search))();
  }, [setValue, handleSubmit, onSubmit]);

  return (
    <Box as={'form'} onSubmit={handleSubmit((data) => onSubmit(data.search))}>
      <InputGroup>
        <Input placeholder={placeholder ?? t('Search')} {...register('search')} />
        <InputRightElement width="4.5rem">
          <Flex justify="right" width="100%">
            {searchValue && <IconButton aria-label="Clear search" icon={<IoCloseOutline />} onClick={clearSearch} size="sm" variant="ghost" mr="2" />}
            <IconButton aria-label="Search" icon={<IoSearchOutline />} type="submit" size="sm" variant="ghost" />
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
