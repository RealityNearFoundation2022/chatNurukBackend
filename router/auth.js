const { Router } = require('express');
const { check } = require('express-validator');


// controladores
const { crearUsuario, renewToken, login } = require( '../controllers/auth');
const { validateFields } = require( '../middlewares/validate-fields');

const router = Router();

// path: api/login

// endpoint para crear nuevos usuarios
router.post('/new',[
  check('name', 'Your name is required').not().isEmpty(),
  check('email', 'Your email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
] , crearUsuario);

// endpoint para login
router.post('/',[
  check('email', 'Your email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
] , login);

// Revalidar Token
router.get('/renew', renewToken)

module.exports = router;