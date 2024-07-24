import { Order } from '@/apis';
import { RequiredKeysOf } from 'type-fest';
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

export const sortShuttle = (shuttles: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        shuttles = shuttles.filter(
          (shuttle: any) =>
            shuttle.order.id.includes(search.toLowerCase()) ||
            shuttle.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            shuttle.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase()),
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
  const start = new Date(after);
  const end = new Date(before);

  return shuttles.filter((shuttle: any) => {
    const shuttleDate = new Date(shuttle.order.date_created);
    const dateCondition = shuttleDate >= start && shuttleDate <= end;

    let scheduleCondition = true;
    if (day === true) scheduleCondition = (shuttle.jfk_oneway?.jfk_shuttle_time || shuttle.jfk_shuttle_rt?.jfk_shuttle_time2 || '낮 스케줄') === '낮 스케줄';
    else if (day === false) scheduleCondition = (shuttle.jfk_oneway?.jfk_shuttle_time || shuttle.jfk_shuttle_rt?.jfk_shuttle_time2 || '낮 스케줄') === '밤 스케줄';

    return dateCondition && scheduleCondition;
  });
};
