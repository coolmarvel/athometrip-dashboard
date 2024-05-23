import { format } from 'date-fns';

const useConvertDate = (date: any) => {
  date = new Date(date);

  return format(date, 'yyyy/MM/dd HH:mm:ss');
};

export default useConvertDate;
