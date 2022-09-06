const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) =>{
  return new Promise(( resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, ( err, token ) => {
      if ( err ) {
        console.log(err);
        reject('Not is possible to generate a JWT token');
      } else {
        resolve( token );
      }

    });
  });
}

const verifyJWT = (token = '') => {
 try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    return [ true, id]
 } catch (error) {
    return [ false, error.message]
 }
}
module.exports = { generateJWT, verifyJWT }