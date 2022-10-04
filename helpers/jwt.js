const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

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
    const { sub } = jwt_decode(token);
    return [ true, sub ]
  } catch (error) {
    console.log("probando", error);
     return [ false, error.message]
  }
 }
module.exports = { generateJWT, verifyJWT }