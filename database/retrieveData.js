const { pool } = require(pg);

async function retrieveData() {
  try {
    const res = await pool.query("SELECT * FROM user");
    console.log(res.rows);
  } catch (error) {
    console.error(error);
  }
}

retrieveData()