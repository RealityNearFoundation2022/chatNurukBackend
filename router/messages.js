const { Router } = require('express');
const { getChat } = require( '../controllers/messages');
const { validateJwt } = require( '../middlewares/validate-jwt');

const router = Router();
// path: chat/messages

router.get('/:from', getChat )

module.exports = router;