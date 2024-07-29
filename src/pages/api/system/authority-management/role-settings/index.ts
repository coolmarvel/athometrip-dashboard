/**
 * 백엔드에 통신하기 위한 권한 관리 API
 *
 * @author 김이안
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const url = 'http://localhost:4000/api/system/roles';

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
    const { data } = await axios.get(url);
    return res.status(200).send({ data: data, message: 'Success' });
  } catch (error) {
    return res.status(500).send({ data: null, message: `Failed to get roles` });
  }
};
