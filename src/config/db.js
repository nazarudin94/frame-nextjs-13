export const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'dev',
    password: 'P4sWor$!',
    database: 'madrasah',
  },
});
