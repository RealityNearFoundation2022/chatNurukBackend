const { Router } = require('express');
const { getUsers } = require( '../controllers/users');
const { validateJwt } = require( '../middlewares/validate-jwt');

const router = Router();
// path: api/messages

router.get('/', validateJwt, getUsers )

module.exports = router;