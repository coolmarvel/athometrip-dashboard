import { RequiredKeysOf } from 'type-fest';
import { readDB, writeDB } from '../db';
import { Order, User as UserOrigin } from '../types';
import axios from 'axios';
import { Scheme } from '@/apis';
import { UseYnEnum } from '@/enums/use-yn.enum';

/**
 * 유저 관리 API
 *
 * @author 이성현
 */
const API_GET_USERS_URL = process.env.NEXT_PUBLIC_APIS_USERS;
const API_CREATE_USER_URL = process.env.NEXT_PUBLIC_API_CREATE_USER;

export interface User extends Scheme {
  userId: string;
  userName: string;
  emailAddress: string;
  password: string;
  companyCode: string;
  department: string;
  useYn: UseYnEnum;
  users?: Array<User>;
}

export const getUser = async (sort?: RequiredKeysOf<User>, order?: Order, search?: string): Promise<any> => {
  try {

    const db = await axios.get(`${API_GET_USERS_URL}`);
    let users = db.data;
    if (search && search.length > 0) {
      users = users.filter((user: User) => {
        return user.userName.toLowerCase().includes(search.toLowerCase()) || user.emailAddress.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (sort && order) {
      users = users.sort((a: User, b: User) => {
        const ac = a[sort];
        const bc = b[sort];
        if (ac > bc) return order === 'desc' ? -1 : 1;
        else if (ac < bc) return order === 'desc' ? 1 : -1;
        else return 0;
      });
    }
    return users;
  } catch (error) {
    console.log('Failed to read db.json');
    throw error;
  }
};

export const createUsers = async (user: User[]) => {
  try {
    const response = await axios.post(`${API_CREATE_USER_URL}`, user);
    if (response.status !== 200) {
      console.log('Failed to save the users in the database');
      throw new Error('Failed to save the users in the database');
    }
  } catch (error) {
    console.log('Failed to write db.json');
    throw error;
  }
};

export const readUsers = async (sort?: RequiredKeysOf<UserOrigin>, order?: Order, search?: string): Promise<UserOrigin[]> => {
  try {
    const db = await readDB();
    let users = db.users;
    if (search && search.length > 0) {
      users = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.phone.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (sort && order) {
      users = users.sort((a, b) => {
        const ac = a[sort];
        const bc = b[sort];
        if (ac > bc) return order === 'desc' ? -1 : 1;
        else if (ac < bc) return order === 'desc' ? 1 : -1;
        else return 0;
      });
    }
    return users;
  } catch (err) {
    console.log('Failed to read db.json');
    throw err;
  }
};

export const writeUsers = async (users: UserOrigin[]) => {
  try {
    const db = await readDB();
    await writeDB({ ...db, users });
  } catch (err) {
    console.log('Failed to write db.json');
    throw err;
  }
};
