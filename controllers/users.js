const { response } = require('express');
const User      = require('../models/user');

const getUsers = async ( req, res = response ) => {
    const desde = Number( req.query.desde ) || 0;
    const usersConnected = await User
        .find({_iduser: { $ne: req.uid }})
        .sort('-online')
        .skip(desde)
        .limit(50)

    res.json({
        ok: true,
        usersConnected,
    })
}

module.exports = {
    getUsers
}