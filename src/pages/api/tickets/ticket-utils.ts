import { RequiredKeysOf } from 'type-fest';

import { Order } from '@/apis';
import { getKeys, getValue } from '@/pages/api';

export const checkExistingDataInRange = async (name: string, after: string, before: string) => {
  const keys = await getKeys(`${name}_*`);
  for (const key of keys) {
    const [_, savedAfter, savedBefore] = key.split('_');
    if (new Date(savedAfter) <= new Date(after) && new Date(savedBefore) >= new Date(before)) return (await getValue(key)) as any[];
  }

  return null;
};

const sortMap: any = {
  id: 'id',
  order_id: 'id',
  email: 'meta_data._billing_email',
  order_date_created: 'date_created',
  name: 'meta_data._billing_first_name',
  billing_email: 'meta_data._billing_email',
  billing_name: 'meta_data._billing_first_name',
};

export const sortTicket = (tickets: any, sort: RequiredKeysOf<any>, order: Order, search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (search.length > 0) {
        tickets = tickets.filter((ticket: any) => {
          const ticketId = ticket.id.toString();
          const email = ticket.meta_data._billing_email.toLowerCase();
          const name = ticket.meta_data._billing_first_name.toLowerCase();

          return ticketId.includes(search.toLowerCase()) || email.includes(search.toLowerCase()) || name.includes(search.toLowerCase());
        });
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

export const filterTicket = (tickets: any, after: string, before: string) => {
  const afterDate = new Date(`${after}T00:00:00`);
  const beforeDate = new Date(`${before}T23:59:59`);

  return tickets.filter((ticket: any) => {
    const ticketDate = new Date(ticket.date_created);

    return ticketDate >= afterDate && ticketDate <= beforeDate;
  });
};
