import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

/**
 * 권한 관리 API
 *
 * @author 김이안
 */
const API_GET_ROLES_URL = process.env.NEXT_PUBLIC_APIS_ROLES;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return await getRolesAll(req, res);
    default:
      // res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

/**
 * 역할 전체 조회
 *
 * @param req
 * @param res
 */
const getRolesAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(`${API_GET_ROLES_URL}`);
    return res.status(200).send({ data: data, message: 'Success' });
  } catch (error) {
    return res.status(500).send({ data: null, message: `Failed to get roles` });
  }
};
