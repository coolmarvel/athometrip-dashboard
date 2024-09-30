import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { getKeys, getValue } from '../redis';

export const getTourById = async (tourName: string, tourId: string): Promise<any> => {
  const keys = await getKeys(`${tourName}_*`);
  for (const key of keys) {
    const toursData: any = await getValue(key);
    if (toursData) {
      const tour = toursData.find((tour: any) => tour.order.id === tourId);
      if (tour) return tour;
    }
  }

  return null;
};

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

export const sortTour = (tours: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        tours = tours.filter(
          (tour: any) =>
            tour.order.id.includes(search.toLowerCase()) ||
            tour.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            tour.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase())
        );
      }

      if (sort && order) {
        const resolvedSortPath = sortMap[sort] || sort;
        const deepValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

        tours.sort((a: any, b: any) => {
          const valueA = deepValue(a, resolvedSortPath);
          const valueB = deepValue(b, resolvedSortPath);

          if (typeof valueA === 'string' && typeof valueB === 'string') return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          if (valueA < valueB) return order === 'asc' ? -1 : 1;

          return 0;
        });
      }

      resolve(tours);
    } catch (error) {
      reject(error);
    }
  });
};

export const filterTour = (tours: any, after: string, before: string) => {
  return tours.filter((tour: any) => {
    return tour.order.date_created_gmt >= after && tour.order.date_created_gmt <= before;
  });
};
