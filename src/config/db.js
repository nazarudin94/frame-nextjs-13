export const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'dev',
    password: process.env.pass_db,
    database: 'asesment',
  },
});
