// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/db';
const md5 = require('md5');
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { function: action } = req.query;

  switch (action) {
    case 'auth':
      try {
        const { username, password } = req.body;

        const checkUser = await db.raw(
          ` select username, password  from user where username =? `,
          [username]
        );

        const data = checkUser[0];
        if (data == '')
          return res.status(401).json({ message: 'username salah' }).end();
        const hashedPassword = data[0].password;
        await bcrypt.compare(password, hashedPassword).then((match) => {
          if (match) {
            const token = jwt.sign(
              {
                username: data[0].username,
              },
              'ibukucantik',
              {
                expiresIn: '2d',
              }
            );
            res.status(200).json({
              status: 'success',
              info: true,
              message: 'login success',
              token,
              // data: data,
            });
          } else {
            res
              .status(401)
              .json({
                info: false,
                message: 'salah password',
                // data: data,
              })
              .end();
          }
        });
        // if (data == '') {
        //   res.status(500).json({
        //     status: 500,
        //     success: true,
        //     message: 'username salah',
        //     // data: data,
        //   });
        //   console.log('username salah');
        // } else {
        //   // console.log(data);

        // }
        //   res.status(200).json({
        //     status: 200,
        //     success: true,
        //     message: 'ok',
        //     data: data,
        //   });
        // } catch (e) {
        //   console.log(e);
        //   res.status(200).json({
        //     status: 500,
        //     success: false,
        //     message: e,
        //   });
        // }
      } catch (e) {
        console.log(e);
      }
      break;
  }
}
