import { Nav } from './nav-interface';

import { usimsNav } from './usims';
import { staysNav } from './stays';
import { toursNav } from './tours';
import { snapsNav } from './snaps';
import { ticketsNav } from './tickets';
import { systemsNav } from './systems';
import { musicalsNav } from './musicals';
import { shuttlesNav } from './shuttles';
import { toursSuburbsNav } from './tours-suburbs';

export const navs: Nav[] = [ticketsNav, usimsNav, toursNav, toursSuburbsNav, shuttlesNav, snapsNav, staysNav, musicalsNav, systemsNav];

export type { Nav } from './nav-interface';

export { usimsNav } from './usims';
export { staysNav } from './stays';
export { toursNav } from './tours';
export { snapsNav } from './snaps';
export { ticketsNav } from './tickets';
export { systemsNav } from './systems';
export { musicalsNav } from './musicals';
export { shuttlesNav } from './shuttles';
export { toursSuburbsNav } from './tours-suburbs';