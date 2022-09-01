const { Router } = require('express');
const { check } = require('express-validator');


// controladores
const { createUser, renewToken, getCurrentUser } = require( '../controllers/auth');
const { validateFields } = require( '../middlewares/validate-fields');
const { validateJwt } = require( '../middlewares/validate-jwt');

const router = Router();

// path: api/users

// endpoint para crear nuevos usuarios
router.post('/new',[
  check('email', 'Your email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
] , createUser);

// endpoint para login
router.post('/',[
  check('email', 'Your email is required').isEmail(),
  // check('id', 'Your id is required').not().isEmpty(),
  // check('password', 'Password is required').not().isEmpty(),
  validateFields
] , getCurrentUser);

// Revalidar Token
router.get('/renew', validateJwt, renewToken)

module.exports = router;