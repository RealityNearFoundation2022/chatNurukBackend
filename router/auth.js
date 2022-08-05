const { Router } = require('express');

const router = Router();

// endpoint para crear nuevos usuarios
router.post('/new', (req, res) => {
  res.json({
    ok: true,
    msg: 'new'
  });
})

// endpoint para login
router.post('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'login'
  });
})


// Revalidar Token
router.get('/renew', (req, res) => {
  res.json({
    ok: true,
    msg: 'probando'
  });
})

module.exports = router;