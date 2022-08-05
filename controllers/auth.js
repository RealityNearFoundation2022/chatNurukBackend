const { response } = require('express');

const crearUsuario = (req, res = response) => {
  const body = req.body;
  res.json({
    ok: true,
    msg: 'new', 
    body
  });
}

const login = async (req, res = response) => {

  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  });
}

const renewToken =  async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  });
}

module.exports = {
  crearUsuario,
  login,
  renewToken
}