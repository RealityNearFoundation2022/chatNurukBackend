const { Router } = require('express');
const { getChat } = require( '../controllers/messages');
const { validateJwt } = require( '../middlewares/validate-jwt');

const router = Router();
// path: chat/messages

router.get('/:to', validateJwt,  getChat )

module.exports = router;