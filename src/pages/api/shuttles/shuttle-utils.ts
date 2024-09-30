import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { OrderType } from '@/types';
import { getKeys, getValue } from '../redis';

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return (await getValue(key)) as OrderType[];
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

export const sortShuttle = (shuttles: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        shuttles = shuttles.filter(
          (shuttle: any) =>
            shuttle.order.id.includes(search.toLowerCase()) ||
            shuttle.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            shuttle.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase())
        );
      }

      if (sort && order) {
        const resolvedSortPath = sortMap[sort] || sort;
        const deepValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

        shuttles.sort((a: any, b: any) => {
          const valueA = deepValue(a, resolvedSortPath);
          const valueB = deepValue(b, resolvedSortPath);

          if (typeof valueA === 'string' && typeof valueB === 'string') return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          if (valueA < valueB) return order === 'asc' ? -1 : 1;

          return 0;
        });
      }

      resolve(shuttles);
    } catch (error) {
      reject(error);
    }
  });
};

export const filterShuttle = (shuttles: any, after: string, before: string, day?: boolean) => {
  return shuttles.filter((shuttle: any) => {
    const dateCondition = shuttle.order.date_created_gmt >= after && shuttle.order.date_created_gmt <= before;

    let scheduleCondition = true;
    const shuttleTime = shuttle.order.meta_data?.jfk_shuttle_time ?? shuttle.order.meta_data?.jfk_shuttle_time2 ?? shuttle.line_items[0].name;

    if (day === true) scheduleCondition = shuttleTime.includes('낮 스케줄') || shuttleTime === undefined;
    else if (day === false) scheduleCondition = shuttleTime.includes('밤 스케줄');

    return dateCondition && scheduleCondition;
  });
};
