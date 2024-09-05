import * as redis from 'redis';

const client = redis.createClient({ url: 'redis://localhost:6379' });
client.connect();

export const getKeys = async (pattern: string): Promise<any> => {
  return await client.keys(pattern);
};

export const getValue = async <T>(key: string): Promise<T | null> => {
  const result = await client.get(key);

  return result ? JSON.parse(result) : null;
};

export const setValue = async <T>(key: string, data: any): Promise<T | null> => {
  await client.set(key, JSON.stringify(data), { EX: 3600 });

  return null;
};
