const fs = require('fs');
const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`Database Have been Built Successfuly in ${process.env.NODE_ENV || 'DEVELOPMENT'} mode`);
  }
});
