const { response } = require('express');
const bcrypt       = require('bcryptjs');

const User      = require('../models/user');
const { generateJWT } = require('../helpers/jwt')


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

const validateUser = async (req, res = response) => {
  try {
    const { email, id } = req.body;
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
    const res = await pool.query('SELECT * FROM public.user WHERE id = $1', [70]);
    console.log('user:', res.rows[0])
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
  try {
    const userDB = await User.findOne({ email});
    if ( !userDB) {
      return res.status(400).json({
        ok: false,
        msg: 'Email o password not found'
      });
    }

    // Validation password
    const validPassword = bcrypt.compareSync( password, userDB.password);
    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password o email is incorrect'
      });
    }

    // Generate JWT token
    const token = await generateJWT( userDB.id)

    res.json({
      ok: true,
      user: userDB,
      token
    });

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
  login,
  renewToken, 
  validateUser
}