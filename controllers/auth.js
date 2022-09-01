const { response } = require('express');
const bcrypt       = require('bcryptjs');
const User      = require('../models/user');
const { generateJWT } = require('../helpers/jwt')
const { fetchConToken } = require('../helpers/fetch')

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // verification if email already exist
    const userExist = await User.findOne({ email});
    if (userExist){
      return res.status(400).json({ 
        ok: false,
        msg: 'Email already exists',
      })
    }
    //  Save user in DB
    const user = new User(req.body);
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

const getCurrentUser = async (req, res = response) => {
  try {
    const getDataUser = await fetchConToken('user/me');
    // verification if email already exist
    const userExist = await User.findOne({ email });
    const userPostgres = await pool.query('SELECT * FROM public.user WHERE id = $1', [getDataUser.email]);

    if (userExist === userPostgres ){
      //  Save user in DB
      const user = new User(email, id);
      await user.save();
      // Generate JWT token
      const token = await generateJWT( user.id );
    }
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

const renewToken =  async (req, res = response) => {
  const uid = req.uid;
  // Generate new JWT token
  const token = await generateJWT( uid );
  // Get user for UID
  const user = await User.findById( uid);
  res.json({
    ok: true,
    user,
    token
  });
}

module.exports = {
  createUser,
  renewToken, 
  getCurrentUser
}