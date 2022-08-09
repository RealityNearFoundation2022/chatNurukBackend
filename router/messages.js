const { Router } = require('express');
const { getChat } = require( '../controllers/messages');
const { validateJwt } = require( '../middlewares/validate-jwt');

const router = Router();
// path: api/messages

router.get('/:from', validateJwt, getChat )

module.exports = router;