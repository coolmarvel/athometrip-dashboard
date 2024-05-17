import axios from 'axios';
import { isProd } from '../db';

export const getDatas = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // axios production
      if (isProd) {
        const datas = await axios.post('http://localhost:3000/api/production/adapter/types').then((response: any) => response.data);

        return resolve(datas);
      }
      // axios staging
      else if (!isProd) {
        const datas = await axios.post('http://localhost:3000/api/staging/adapter/types').then((response: any) => response.data);

        return resolve(datas);
      }
    } catch (error) {
      return reject(error);
    }
  });
};
