// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/db';
const md5 = require('md5');
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { function: action } = req.query;

  switch (action) {
    case 'insert':
      try {
        const { username, password, firstname, lastname, status, roleOption } =
          req.body;
        await db.transaction(async (trx) => {
          // Lakukan operasi insert
          const saltRounds = 10; // Banyaknya putaran salt yang digunakan
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const [insertedId] = await trx('user').insert({
            username,
            firstname,
            lastname,
            password: hashedPassword,
            status,
            create: db.raw('NOW()'),
          });

          // Dapatkan ID yang di-generate dari operasi insert
          const userId = insertedId;

          console.log('Inserted user ID:', userId);
          // Lakukan operasi lain jika diperlukan dengan ID yang baru saja di-generate
          await trx('role_user').insert({
            idUser: userId,
            idRole: roleOption,
          });
        });
        res.status(200).json({
          status: 200,
          success: true,
          message: 'ok',
          data: data,
        });
      } catch (e) {
        console.log(e);
        res.status(200).json({
          status: 500,
          success: false,
          message: e,
        });
      }
      break;
    case 'edit':
      try {
        const { id } = req.body;
        const resp = await db.raw(
          `
    SELECT
	r.id ,
	r.nama as role,
	u.username ,
	u.id ,
	u.status ,
	u.lastname ,
	u.firstname,
	u.password
from
	user u
join role_user ru on
	u.id = ru.idUser
join role r on
	ru.idRole = r.id 
	where u.id = ?

        `,
          [id]
        );

        const data = resp[0];

        res.status(200).json({
          status: 200,
          success: true,
          message: 'ok',
          data: data,
        });
      } catch (e) {
        console.log(e);
        res.status(200).json({
          status: 500,
          success: false,
          message: e,
        });
      }
      break;
  }
}
