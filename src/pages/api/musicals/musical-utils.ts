import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { getKeys, getValue } from '../redis';

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return await getValue(key);
  }

  return null;
};

const sortMap: any = {
  id: 'order.id',
  order_id: 'order.id',
  email: 'billing.email',
  billing_email: 'billing.email',
  name: 'billing.first_name',
  billing_name: 'billing.first_name',
  order_date_created_gmt: 'order.date_created_gmt',
};

export const sortMusical = (musicals: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        musicals = musicals.filter(
          (musical: any) =>
            musical.order.id.includes(search.toLowerCase()) ||
            musical.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            musical.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase()),
        );
      }

      if (sort && order) {
        const resolvedSortPath = sortMap[sort] || sort;
        const deepValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

        musicals.sort((a: any, b: any) => {
          const valueA = deepValue(a, resolvedSortPath);
          const valueB = deepValue(b, resolvedSortPath);

          if (typeof valueA === 'string' && typeof valueB === 'string') return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          if (valueA < valueB) return order === 'asc' ? -1 : 1;

          return 0;
        });
      }

      resolve(musicals);
    } catch (error) {
      reject(error);
    }
  });
};

export const filterMusical = (musicals: any, after: string, before: string) => {
  return musicals.filter((musical: any) => {
    return musical.order.date_created_gmt >= after && musical.order.date_created_gmt <= before;
  });
};
