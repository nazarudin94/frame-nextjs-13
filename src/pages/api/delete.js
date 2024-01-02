// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const id = req.body;
    const deleteRow = await db('user').where({ id }).del();
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Berhasil Hapus User',
      // data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: 'Terjadi kesalahan saat menghapus data',
    });
  }
}
