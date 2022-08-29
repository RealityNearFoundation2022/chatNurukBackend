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
    await pool.connect();
    // const res = await pool.query('SELECT * FROM public.user WHERE id = $1', [2]);
    console.log('DB Postgres connected succesfully!' );
    // console.log('user:', res.rows[0])
  } catch(error){
    console.log(error);
    // throw new Error('Couldn\'t connect to Postgres');
  }
}

module.exports = {
  dbPgConnection
}