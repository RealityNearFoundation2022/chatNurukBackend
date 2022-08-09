const { response } = require('express');
const bcrypt       = require('bcryptjs');

const Usuario      = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt')


const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // verification if email already exist
    const userExist = await Usuario.findOne({ email});
    if (userExist){
      return res.status(400).json({ 
        ok: false,
        msg: 'Email already exists',
      })
    }
 

    //  Save user in DB
    const user = new Usuario(req.body);
    //   Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt)
    await user.save();
    // Generate JWT token
    const token = await generateJWT( user.id );


    res.json({
      user,
      token
    })

  } catch (error){
    console.log(error)
    res.status(500).json({ 
      ok: false,
      msg: 'Please contact your administrator'
    })
  }
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