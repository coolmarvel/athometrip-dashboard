import { format } from 'date-fns';

const useConvertDate = (date: any) => {
  date = new Date(date);

  return format(date, 'MM/dd/yyyy HH:mm:ss');
};

export default useConvertDate;
