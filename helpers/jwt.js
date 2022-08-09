const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) =>{
  return new Promise(() => {
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

module.exports = { generateJWT }