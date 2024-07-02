import { Order } from '@/apis';
import { RequiredKeysOf } from 'type-fest';
import { getKeys, getValue } from '../redis';

export const getTourById = async (ticketName: string, ticketId: string): Promise<any> => {
  const keys = await getKeys(`${ticketName}_*`);
  for (const key of keys) {
    const ticketsData: any = await getValue(key);
    if (ticketsData) {
      const ticket = ticketsData.find((ticket: any) => ticket.order.id === ticketId);
      if (ticket) return ticket;
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
  order_date_created: 'order.date_created',
};

export const sortTour = (tickets: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        tickets = tickets.filter(
          (ticket: any) =>
            ticket.order.id.includes(search.toLowerCase()) ||
            ticket.billing.email.toLowerCase().includes(search.toLowerCase()) ||
            ticket.billing.first_name.toLowerCase().includes(search.toLocaleLowerCase()),
        );
      }

      if (sort && order) {
        const resolvedSortPath = sortMap[sort] || sort;
        const deepValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

        tickets.sort((a: any, b: any) => {
          const valueA = deepValue(a, resolvedSortPath);
          const valueB = deepValue(b, resolvedSortPath);

          if (typeof valueA === 'string' && typeof valueB === 'string') return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          if (valueA < valueB) return order === 'asc' ? -1 : 1;

          return 0;
        });
      }

      resolve(tickets);
    } catch (error) {
      reject(error);
    }
  });
};

export const filterTour = (tours: any, after: string, before: string, day: string) => {
  const start = new Date(after);
  const end = new Date(before);

  return tours.filter((tour: any) => {
    const tourDate = new Date(tour.order.date_created);
    const dateCondition = tourDate >= start && tourDate <= end;

    const dayCondition = (day: string, tour: any) => {
      if (day === 'one-day') return tour.lineItem.name.includes('당일');
      else if (day === 'two-day') return tour.lineItem.name.includes('1박');

      return false;
    };

    return dateCondition && dayCondition(day, tour);
  });
};
