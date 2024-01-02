export const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: process.env.user_db,
    password: process.env.pass_db,
    database: process.env.name_db,
  },
});
