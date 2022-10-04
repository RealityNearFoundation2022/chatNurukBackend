const jwt = require('jsonwebtoken');

const validateJwt = ( req, res, next ) => {
 try {
  const token = req.header('token');
  if ( !token ) {
    return res.status(401).json({ 
      ok: false,
      msg: 'Invalid token'
    });
  }

  const { sub } = jwt.verify( token, process.env.SECRET_KEY);
  req.uid = sub;
  next();

 } catch ( e ) {
   return res.status(401).json({ 
      ok: false,
      msg: 'Token no es válido'
   });
 }

}

module.exports = {validateJwt}