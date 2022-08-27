const { Pool } = require('pg');

// conf. de api PosgreSQL

const dbPgConnection = async () => {
  try{
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_SERVER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_LISTEN_PORT,
      // ssl: {
      //   rejectUnauthorized : false,
      // }
    });
    const res = await pool.connect();
    // const res = await pool.query('SELECT * FROM users');
    console.log('DB Postgres connected succesfully!', res );

  } catch(error){
    console.log(error);
    // throw new Error('Couldn\'t connect to Postgres');
  }
}


// const db = async (texto, params) => {
//   // await pool.query("SET search_path TO 'chatSchema';");
//   return pool.query(texto, params) 
// }

module.exports = {
  dbPgConnection
}