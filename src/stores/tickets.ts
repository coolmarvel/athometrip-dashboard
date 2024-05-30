import { Order } from '@/apis';
import { useShallow } from '@/hooks';
import axios from 'axios';
import { RequiredKeysOf } from 'type-fest';
import { create } from 'zustand';

interface T {
  activeTicket: string;
  tickets: any;

  setTickets: (tickets: any) => any;
  setActiveTicket: (name: any) => any;

  clearTicket: () => any;
  fetchTicket: (name: string, url: string) => Promise<any>;
  sortTicket: (tickets?: any, sort?: RequiredKeysOf<any>, order?: Order) => Promise<any>;
}

export const ticketStore = create<T>((set, get) => ({
  activeTicket: '',
  tickets: [],

  setTickets: (tickets: any) => set({ tickets: tickets }),
  setActiveTicket: (name: any) => set({ activeTicket: name }),

  clearTicket: () => set({ activeTicket: '', tickets: [] }),

  fetchTicket: async (name, url) => {
    const { data } = await axios.get(url);
    set({ activeTicket: name, tickets: data });
  },

  sortTicket: async (tickets, sort, order) => {
    if (sort && order) {
      let sortedTickets = [...get().tickets].map((ticket) => ({ ...ticket, id: parseInt(ticket.order.id, 10) }));
      sortedTickets = sortedTickets.sort((a, b) => {
        const ac = a[sort];
        const bc = b[sort];

        if (ac > bc) return order === 'desc' ? -1 : 1;
        else if (ac < bc) return order === 'desc' ? 1 : -1;
        else return 0;
      });

      set({ tickets: sortedTickets });
    }
  },
}));

export const useTicketStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(ticketStore, keys);
};
