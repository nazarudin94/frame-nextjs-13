// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const resp = await db.raw(
    `
       select id,nama from role
        `
  );
  const data = resp[0];
  res.status(200).json({
    status: 200,
    success: true,
    message: 'ok',
    data: data,
  });
}
